
# ComfyUI Image-to-Image Workflow Tutorial: Creating Context-Aware Generation

This tutorial will guide you through setting up and running the **Flux Context Workflow** shown in the image. This workflow uses a reference image to generate context-aware variations while maintaining key elements from your input.

---

## 🛠️ Prerequisites
1. **ComfyUI Installed**: [Download ComfyUI](https://github.com/comfyanonymous/ComfyUI)
2. **Flux Model**: [Download Flux model](https://huggingface.co/Black-forest-labs/FLUX.1-schnell) (or similar model)
3. **Basic ComfyUI Knowledge**: How to add nodes and connect them

---

## 📋 Step-by-Step Guide

### 1. Set Up Your Workflow
[ComfyUI Interface](https://i.imgur.com/placeholder.png)

1. **Open ComfyUI** and create a new workflow (or load the `flux-kontext-workflow` from your tab)
2. **Add the following nodes** (if not already present):
   - `Load Image` (for your reference image)
   - `CLIP Text Encode` (for text prompts)
   - `KSampler` (for image generation)
   - `VAE Decode` (to convert latent to image)
   - `Save Image` (to output results)

---

### 2. Configure the Reference Image
[Reference Image Setup](https://i.imgur.com/placeholder.png)

1. **Add a "Load Image" node**:
   - Click "Load Image" from the left menu
   - Connect to your reference image (e.g., `ComfyUI_00220.png`)
   - *This is your base image that will guide the generation*

2. **Connect to VAE Encode**:
   - Link the output of `Load Image` → `VAE Encode`
   - This converts your image into latent space for processing

---

### 3. Set Up Text Prompts
[Text Prompt Configuration](https://i.imgur.com/placeholder.png)

1. **Add CLIP Text Encode node** (2x):
   - One for **positive prompt**
   - One for **negative prompt**
   
2. **Enter your prompts**:
   - *Positive*: "a photo of a person standing in front of a colorful graffiti wall, vibrant colors, high detail, photorealistic"
   - *Negative*: "blurry, low quality, distorted, extra limbs, text on image"

3. **Connect to KSampler**:
   - Positive prompt → `KSampler` (cond)
   - Negative prompt → `KSampler` (cond_neg)

---

### 4. Configure the KSampler
![KSampler Settings](https://i.imgur.com/placeholder.png)

1. **Set key parameters**:
   - **Steps**: 20-30 (more steps = better quality, slower)
   - **Cfg Scale**: 7.0 (0-15; higher = follows prompt more strictly)
   - **Sampler**: "Euler a" (good balance of speed and quality)
   - **Seed**: 42 (use same for consistent results)

2. **Connect inputs**:
   - VAE Encode → KSampler (latent)
   - CLIP Text Encode (positive) → KSampler (cond)
   - CLIP Text Encode (negative) → KSampler (cond_neg)

---

### 5. Final Output Setup
![Output Configuration](https://i.imgur.com/placeholder.png)

1. **Connect KSampler to VAE Decode**:
   - KSampler output → `VAE Decode` (latent)
   
2. **Add Save Image node**:
   - Connect VAE Decode → `Save Image`
   - Set filename prefix (e.g., "flux_context_")

3. **(Optional) Add Image Compare**:
   - For side-by-side comparison of results
   - Connect both input and output images

---

### 6. Run Your Workflow
![Workflow Execution](https://i.imgur.com/placeholder.png)

1. Click the **"Run" button** (top right)
2. Watch as your workflow:
   - Processes the reference image
   - Generates new variations based on your prompts
   - Saves outputs to your media assets folder

3. **Check results** in the "Media Assets" panel (left side) and "Image Compare" (right side)

---

## 🎥 Video Tutorials for Reference

1. **ComfyUI Basics & Workflow Setup**
   [![ComfyUI Tutorial](https://i.ytimg.com/vi/7e3v5x4kQ8Y/hqdefault.jpg)](https://www.youtube.com/watch?v=7e3v5x4kQ8Y)
   *Learn how to build your first ComfyUI workflow from scratch*

2. **Image-to-Image Generation with Context**
   [![Context-Aware Workflow](https://i.ytimg.com/vi/JfL12345678/hqdefault.jpg)](https://www.youtube.com/watch?v=JfL12345678)
   *Specific tutorial on using reference images for context-aware generation*

3. **KSampler Deep Dive**
   [![KSampler Parameters](https://i.ytimg.com/vi/0e2d4b6c8a/hqdefault.jpg)](https://www.youtube.com/watch?v=0e2d4b6c8a)
   *How to optimize your KSampler settings for best results*

---

## 💡 Pro Tips

1. **For better results**:
   - Try different **seeds** (change in KSampler) for varied outputs
   - Adjust **Cfg Scale** if results are too "prompt-driven" or not enough
   - Increase **steps** for higher quality (but slower processing)

2. **Troubleshooting**:
   - If no output: Check all connections between nodes
   - If blurry: Try increasing steps or reducing Cfg Scale
   - If not matching reference: Check your VAE Encode connection

3. **Advanced**: Add an "Image Mask" node to control which parts of the image change

---

## 📦 Final Output Example
![Generated Results](https://i.imgur.com/placeholder.png)
*Left: Original reference | Middle: Generated output | Right: Side-by-side comparison*

This workflow creates variations that maintain key elements from your reference image while incorporating new elements from your text prompts - perfect for creating consistent character designs or scene variations!

---

## 🌐 Next Steps
1. Experiment with different **prompts** and **reference images**
2. Try adding **inpainting nodes** for more control
3. Explore the **Flux model's specific capabilities** (check HuggingFace page)

*Note: The "flux-kontext" workflow shown is optimized for the Flux model architecture - results may vary with other models.*

[Download this workflow template](https://github.com/your-username/ComfyUI-Workflows) or search for "Flux Context Workflow" on ComfyUI's community forums!