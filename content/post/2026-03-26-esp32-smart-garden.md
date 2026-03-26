---
author: R. Vleeshouwers
avatar: /images/me.jpg
date: '2026-03-26T10:50:07Z'
description: My Smart Garden ESPHome Hardware, Node-RED Logic, and Beautiful Dashboards
hero_image: /images/static-site-generator.jpg
image: /images/static-site-generator.jpg
keywords: Jekyll vs Hugo, static site generator, Jekyll, Hugo, website performance, build speed, static site
og_description: My Smart Garden ESPHome Hardware, Node-RED Logic, and Beautiful Dashboards
og_title: 'Jekyll vs Hugo: Which Static Site Generator is Right for You?'
tags:
- Jekyll
- Hugo
- static site generator
- website performance
- build speed
- web development
title: 'Jekyll vs Hugo: A Comparison of Static Site Generators'
---


# 🌿 My Smart Garden: ESPHome Hardware, Node-RED Logic, and Beautiful Dashboards

**Title:** *Building a "Zero-Cloud" Smart Garden: A Complete Guide to ESPHome, Node-RED (K8s or HA), and Home Assistant*

**Meta Description:** Learn how to build a custom, reliable garden watering system using an ESP32, ESPHome, and Node-RED. This guide covers hardware setup, MQTT/HA integration, and creating a stunning dashboard, with options for both advanced K8s clusters and simple Home Assistant Add-ons.

---

## Introduction

Building a smart home often involves a trade-off: **simplicity** vs. **flexibility**. Commercial systems are easy but locked into the cloud. DIY systems using raw code are flexible but fragile.

The "Goldilocks" solution lies in a **modular architecture**.

For my latest project—a **Smart Garden Watering System**—I built a setup that separates concerns perfectly:
1.  **Hardware Layer:** An **ESP32** running **ESPHome** handles the physical sensors and relays. It's fast, local, and reliable.
2.  **Logic Layer:** **Node-RED** handles the complex "If/Then" rules (e.g., "Water if dry AND not raining AND before 8 PM").
    *   *Option A:* Run Node-RED in a **Kubernetes cluster** for maximum scalability and isolation (my current setup).
    *   *Option B:* Run Node-RED as a **Home Assistant Add-on** for ultimate simplicity.
3.  **Visualization Layer:** **Home Assistant** provides the beautiful dashboard and the central entity database.

The result? A system that works even if the internet goes down, is easy to modify without re-flashing hardware, and looks stunning on my phone.

In this deep-dive guide, I'll walk you through every step of this architecture, including how to choose the right Node-RED deployment for your needs.

---

## 🛠️ Part 1: The Hardware & ESPHome Configuration

### The Components
*   **Microcontroller:** ESP32 DevKit V1 (Wi-Fi + Bluetooth).
*   **Sensor:** Capacitive Soil Moisture Sensor (V1.2) – *Crucial: Avoid resistive sensors to prevent corrosion.*
*   **Actuator:** 12V DC Water Pump + Relay Module (or MOSFET).
*   **Power:** 5V USB for ESP32, separate 12V supply for the pump.

### Step 1: The ESPHome Builder
Instead of writing C++ code or editing YAML files manually on your hard drive, we use the **ESPHome Builder** add-on inside Home Assistant. This provides a visual interface to build the firmware.

1.  Go to **Settings > Devices & Services > ESPHome**.
2.  Click **Add Device** and name it `garden_watering`.
3.  Select the **ESP32 Board** (`esp32dev`).
4.  **Add Components** via the visual menu:
    *   **Sensor**: Select **ADC** (Analog to Digital Converter).
        *   **Pin:** `34` (GPIO 34 is an analog input on ESP32).
        *   **Name:** `Garden Soil Moisture`.
        *   **Unit of Measurement:** `%`.
        *   **Device Class:** `moisture`.
    *   **Switch**: Select **GPIO**.
        *   **Pin:** `2` (This will control the relay).
        *   **Name:** `Garden Pump`.
        *   **Restore Mode:** `RESTORE_DEFAULT_OFF` (This is critical: it ensures the pump stays **OFF** if power is lost or the ESP32 reboots).

### Step 2: The Under-the-Hood YAML
Even with the visual builder, understanding the generated code helps with debugging. The Builder creates a configuration that enables **MQTT Discovery**.

```yaml
esphome:
  name: garden_watering
  friendly_name: Garden Watering System

esp32:
  board: esp32dev

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

# Enable MQTT to talk to the Mosquitto Broker
mqtt:
  broker: !secret mqtt_broker
  username: !secret mqtt_user
  password: !secret mqtt_pass

# --- SENSORS ---
sensor:
  - platform: adc
    pin: 34
    name: "Garden Soil Moisture"
    unit_of_measurement: "%"
    device_class: "moisture"
    accuracy_decimals: 0
    # Calibration: Adjust this multiplier later based on your sensor's dry/wet readings
    filters:
      - multiply: 0.0244 

# --- SWITCHES ---
switch:
  - platform: gpio
    pin: 2
    name: "Garden Pump"
    id: pump_switch
    restore_mode: RESTORE_DEFAULT_OFF
```

### Step 3: Flash and Discover
1.  Click **Build & Flash** in the ESPHome interface.
2.  Wait for the process to complete.
3.  **Result:** Home Assistant automatically discovers the new entities via the **Mosquitto Broker**.
    *   `sensor.garden_soil_moisture`
    *   `switch.garden_pump`

*No manual YAML entity definitions in Home Assistant were required!*

---

## 🧩 Part 2: The Logic Layer (Node-RED Deployment Options)

This is where you have a choice based on your technical comfort level.

### Option A: The "Pro" Setup (Kubernetes Pod)
*As used in my personal lab.*
*   **Pros:** Runs in a separate cluster, isolated from HA crashes, highly scalable, uses the `node-red-contrib-home-assistant-websocket` node for direct API access.
*   **Cons:** Requires Kubernetes knowledge and network configuration.

### Option B: The "Simple" Setup (Home Assistant Add-on)
*Recommended for beginners or those who want a "set it and forget it" solution.*
*   **Pros:**
    *   **Zero Network Config:** The Node-RED Add-on is already on the same internal network as Home Assistant. No IP addresses or firewalls to worry about.
    *   **Native Integration:** The "Home Assistant" nodes inside the Add-on are pre-configured to connect automatically. You don't need to enter usernames/passwords or worry about WebSocket URLs.
    *   **Easy Updates:** Updates happen right inside the Home Assistant interface.
*   **Cons:** If the Add-on crashes, it might restart your HA instance (rare, but possible).

**The Logic is Identical:**
Regardless of which option you choose, the **Node-RED flow logic remains exactly the same**. You simply import the JSON flow (provided below) and the connection node will either auto-connect (Add-on) or require a manual URL (K8s).

> **Recommendation:** If you are just starting out, **choose Option B**. It saves hours of networking configuration and lets you focus on the garden logic immediately.

### The Node-RED Flow (Visual Logic)
*You can import the JSON flow provided in the previous section. Here is the breakdown of the logic:*

#### 1. The Trigger
*   **Node:** Home Assistant (Trigger).
*   **Entity:** `sensor.garden_soil_moisture`.
*   **Condition:** State changes.
*   *Why?* We don't want to check every second; we only want to react when the data actually changes.

#### 2. The Logic Check (Function Node)
This is where the "brain" lives. It checks three conditions:
1.  **Is the soil dry?** (e.g., `< 30%`).
2.  **Is it daytime?** (e.g., between 6:00 AM and 8:00 PM).
3.  **Is the pump currently OFF?** (To prevent re-triggering).

```javascript
var moisture = parseFloat(msg.payload.state);
var now = new Date();
var hour = now.getHours();

// Configuration
var dryThreshold = 30; 
var startHour = 6;     
var endHour = 20;      

// Logic
if (moisture < dryThreshold && hour >= startHour && hour < endHour) {
    msg.shouldWater = true;
    msg.log = "Watering needed: " + moisture + "%";
} else {
    msg.shouldWater = false;
    msg.log = "Condition not met. Moisture: " + moisture + "% | Hour: " + hour;
}
return msg;
```

#### 3. The Action (Switch & Service Calls)
*   **Switch Node:** Routes the flow to "Water" or "Log" based on `shouldWater`.
*   **Action (Water):**
    *   **Node:** Home Assistant (Service Call).
    *   **Service:** `switch.turn_on`.
    *   **Entity:** `switch.garden_pump`.
*   **Delay:** Wait 5 minutes.
*   **Action (Off):**
    *   **Node:** Home Assistant (Service Call).
    *   **Service:** `switch.turn_off`.
    *   **Entity:** `switch.garden_pump`.

> **Note on Configuration:**
> *   **If using the HA Add-on:** The "Home Assistant" node will automatically detect the connection. Just ensure the Add-on is installed and running.
> *   **If using K8s:** You must configure the "Home Assistant" node with your server IP (`homeassistant.local` or IP), port (`8123`), username, and password.

---

## 🎨 Part 3: The Home Assistant Dashboard

Now that the hardware and logic are working, let's build a dashboard that makes the system feel premium.

**Go to:** `Settings > Dashboards > Create Dashboard` > Name it **"Garden Control"**.

### 1. The Soil Moisture Gauge
Visual feedback is essential.
*   **Card Type:** **Gauge**.
*   **Entity:** `sensor.garden_soil_moisture`.
*   **Configuration:**
    *   **Min/Max:** 0 to 100.
    *   **Colors:**
        *   **Red:** 0–30% (Critical).
        *   **Yellow:** 30–60% (Warning).
        *   **Green:** 60–100% (Happy).
    *   **Icon:** A leaf or water drop.

### 2. The Manual Override Button
Sometimes you want to water immediately, regardless of the logic.
*   **Card Type:** **Button** (or **Toggle**).
*   **Entity:** `switch.garden_pump`.
*   **Label:** "Water Now".
*   **Visuals:** Use a **Button Card** (from the UI) to add a blue animation when the pump is active.

### 3. The Status Summary
A quick glance card for the main entities.
*   **Card Type:** **Entities**.
*   **Entities:** `sensor.garden_soil_moisture`, `switch.garden_pump`.
*   **Title:** "Current Status".

### 4. The History Graph
To see trends over time.
*   **Card Type:** **History Graph**.
*   **Entity:** `sensor.garden_soil_moisture`.
*   **Time Range:** Last 7 Days.
*   **View:** Watch the natural moisture drop during the day and the spikes when the pump runs.

---

## 🌟 Why This Architecture Wins

| Feature | Traditional DIY | Commercial Cloud | **My ESPHome + Node-RED Setup** |
| :--- | :--- | :--- | :--- |
| **Reliability** | Low (Code bugs) | Medium (Server outages) | **High** (Local, no internet needed) |
| **Flexibility** | High (Hard to edit) | Low (Fixed features) | **Very High** (Visual Node-RED logic) |
| **Privacy** | High | Low (Data in cloud) | **High** (All local) |
| **Setup** | Hard (C++/Python) | Easy | **Medium** (But very powerful) |

### Key Benefits
1.  **Hardware Stability:** The ESP32 firmware is simple. It just reads and writes. It doesn't care about complex weather APIs.
2.  **Logic Flexibility:** If I want to add a "Rain Delay" or "Wind Speed" check, I just add a node in Node-RED. No need to re-flash the ESP32.
3.  **Scalability:** Adding a second zone is as easy as adding another ESP32 and a new flow in Node-RED.
4.  **Visual Control:** The Home Assistant dashboard gives me a single point of truth for everything.

---

## 🚀 Next Steps & Calibration

### 1. Calibrate Your Sensor
The `multiply` factor in the ESPHome YAML is critical.
*   **Dry Soil:** Read the value (e.g., 3000).
*   **Wet Soil:** Read the value (e.g., 1000).
*   **Calculation:** Adjust the `multiply` filter in the YAML to map these values to 0% and 100%.
    *   *Example:* If 4095 is 100%, `multiply` = 0.0244.

### 2. Add Safety Features
*   **Max Duration:** In Node-RED, add a check to ensure the pump never runs longer than, say, 10 minutes, even if the sensor fails.
*   **Rain Sensor:** Add a second sensor to the ESP32 to skip watering when it rains.

### 3. Expand Your Dashboard
*   Add a **Weather Card** to show current temperature and precipitation.
*   Add a **Log Card** to show the last time the pump ran.

---

## Conclusion

By combining **ESPHome** for the hardware, **Node-RED** (whether in K8s or as an Add-on) for the logic, and **Home Assistant** for the visualization, I've created a garden watering system that is robust, local, and incredibly easy to manage.

Whether you prefer the scalability of a Kubernetes cluster or the simplicity of the Home Assistant Add-on, this architecture gives you the power to build a truly custom smart home experience.

**Have you built a custom ESPHome project? Share your dashboard screenshots in the comments below!**

---

### 📸 Visuals to Include
To make this post a hit, ensure you include:
1.  **The ESPHome Builder UI:** A screenshot showing the Sensor and Switch components being added visually.
2.  **The Node-RED Flow:** A screenshot of the logic flow (Trigger -> Function -> Switch -> Action) with the green "Connected" status.
3.  **The Dashboard:** A high-quality screenshot of your "Garden Control" dashboard with the Gauge, Button, and History Graph.
4.  **The Wiring:** A clear photo of the ESP32, sensor, and relay setup.

### 💡 Key Takeaways
*   **ESPHome Builder = Speed:** No manual YAML editing required.
*   **Node-RED = Power:** Complex logic without touching the hardware.
*   **Dashboards = Value:** Turn raw data into a beautiful user experience.
*   **Flexibility:** Choose the Node-RED deployment (Add-on vs. K8s) that fits your skill level.
```