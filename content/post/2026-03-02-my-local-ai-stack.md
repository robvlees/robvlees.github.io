---
article_tag:
- local-ai
- llama-cpp
- qwen-3-5
- cline
- open-webui
- productivity
- developer-tools
- context-management
author: R. Vleeshouwers
categories:
- Tech Stack
date: '2026-03-02T11:00:00Z'
description: A deep dive into my personal local LLM infrastructure using llama.cpp, llama-swap, Open WebUI, and Cline. Learn how I leverage Qwen 3.5 with dynamic parameter tuning and context management strategies for large codebases.
image: /images/Flux2-Klein_00008_.png
og_image: '{{ site.url }}{{ site.baseurl }}{{ page.image }}'
og_type: article
og_url: '{{ page.url | absolute_url }}'
slug: local-ai-stack-qwen-3-5-setup
tags:
- local-ai
- llama-cpp
- qwen-3-5
- cline
- open-webui
- productivity
- developer-tools
- context-management
title: 'My Local AI Stack: Orchestrating Qwen 3.5 with llama.cpp, llama-swap, and Cline'
twitter_card: summary_large_image
twitter_image: '{{ site.url }}{{ site.baseurl }}{{ page.featured_image }}'
---

In the rapidly evolving world of Large Language Models (LLMs), privacy and latency are becoming just as important as raw intelligence. After experimenting with various cloud APIs, I've settled on a robust, entirely local setup that runs on my own hardware.

On 17 February 2026 The Qwen-3.5 model was released, Qwen is released as open source and freely available for everyone to use. [Unsloth Qwen 3.5](https://unsloth.ai/docs/models/qwen3.5) My current workflow relies on the **Qwen 3.5** family of models. While the base architecture is the same, the magic lies in how I orchestrate the infrastructure, tune the inference parameters for specific tasks, and manage context windows for large codebases.

Here is the complete breakdown of my stack and how I leverage it for daily coding and brainstorming.

## The Infrastructure Layer

To run local models efficiently without managing multiple Docker containers or complex scripts, I use a three-tiered approach:

### 1. The Engine: `llama.cpp`
At the heart of everything is [`llama.cpp`](https://github.com/ggerganov/llama.cpp). It is the industry standard for running LLMs on consumer hardware. It provides the raw inference capabilities, supporting GGUF quantization formats which allow models to run on CPUs, GPUs, or a hybrid of both.

### 2. The Manager: `llama-swap`
Running a server for every model I want to test is inefficient. I use [`llama-swap`](https://github.com/mudler/llama-swap) to manage this. It acts as a reverse proxy that:
- Automatically starts and stops `llama.cpp` servers based on demand.
- Handles model loading/unloading to save VRAM/RAM.
- Provides a single unified API endpoint (usually port 8080) that looks like a standard OpenAI-compatible API.

This means I can request any type of config I defined, and `llama-swap` handles the background switching seamlessly.

### 3. The Interface: `Open WebUI`
For general chat, brainstorming, and document analysis, I use [`Open WebUI`](https://github.com/open-webui/open-webui). It connects directly to the `llama-swap` endpoint. It offers a ChatGPT-like interface but with full control over system prompts, RAG (Retrieval-Augmented Generation), and file uploads.

### 4. The Coding Agent: `Cline`
For actual development, I rely on the [`Cline`](https://github.com/cline/cline) VS Code extension. Cline is an autonomous coding agent that can read your codebase, execute terminal commands, and edit files. It connects to my local `llama-swap` instance, allowing me to have a powerful, private coding assistant that never sends my proprietary code to the cloud.

---

## The Model Strategy: Qwen 3.5 Parameter Tuning

While I am using the **Qwen 3.5** family for everything, I do not use a "one-size-fits-all" configuration. The Qwen 3.5 series is incredibly versatile, but its behavior changes drastically based on inference parameters.

I maintain different "presets" in my `llama-swap` configuration to route requests differently depending on the task.

### 1. The "Coder" Preset (for Cline)
When Cline is generating code, refactoring, or debugging, accuracy and adherence to syntax are paramount. We don't want creativity here; we want determinism.

*   **Model:** `Qwen3-Coder-Next-Q4_K_M` (this model only comes in 80B so you need sufficient VRAM)
*   **Temperature:** `1.0` (as per the recommendation, normally higher values inscrease more randomness)
*   **Top P:** `0.95` (Nucleus sampling to keep the probability distribution tight).
*   **Top K:** `40`
*   **min-p** `0.01`
*   **repeat-penalty** `1.0` (Crucial for code to prevent infinite loops or repetitive function calls).

> **Why this matters:** These are the recommended values which are very closely related on how the model was trained, my experience is that if you deviate to much from it, results will not be optimal.

### 2. The "Chat & Brainstorm" Preset (for Open WebUI)
When I am using Open WebUI for creative writing, explaining complex concepts, or brainstorming ideas, I need the model to be more expansive and conversational.

*   **Model:** `Qwen3.5-35B-A3B-UD-Q4_K_XL`
*   **Temperature:** `0.7` (Higher temperature introduces more variety in the output).
*   **Top P:** `0.8`
*   **Top K:** `20`
*   **chat-template-kwargs:** `"{\"enable_thinking\":false}"` (To use non thinking for general Tasks)
*   **mmproj:** Define a mmproj  (multimodal projector) file is a specialized GGUF-formatted model component, that acts as a bridge between a vision encoder (like CLIP) and a language model (LLM). It enables visual understanding by translating image data into text-compatible embeddings, allowing local, quantized, multimodal AI to interpret images.

> **Why this matters:** As Qwen3.5 is hybrid reasoning, thinking and non-thinking it's important to pass the **chat-template-kwargs:** Parameter to enable thinking and non-thinking mode, when not set the default is thinking. For Chat and Brainstorm I prefer the non-thinking as the response is faster.

---

## Advanced Strategy: Managing Context Windows in Large Codebases

One of the biggest challenges when using local LLMs for coding is the **context window limit**. Even with Qwen 3.5's impressive 128k token support, a large codebase combined with a long conversation history can quickly exhaust the available memory, causing the model to "forget" earlier instructions or file contents.

Here is how I handle this in my Cline workflow to maintain context integrity:

### 1. Leverage Cline's Built-in Summarization
Cline doesn't just dump the whole conversation into the prompt; it uses a sliding window.
*   **Enable Auto-Summarization:** I ensure the setting to **summarize past conversation history** is active. When the window fills up, Cline compresses older turns into a concise summary (e.g., "User asked to refactor the auth module; I provided the new structure") rather than keeping the raw text.
*   **Buffer Management:** I configure Cline to use ~80% of the model's max context (e.g., 100k tokens for a 128k model). This leaves a safety buffer for the model to generate a response without hitting a hard cutoff.

### 2. The "File Selection" Discipline
The biggest context consumer is usually **file content**, not chat history.
*   **Selective Loading:** I avoid selecting the entire project folder unless absolutely necessary. Instead, I use Cline's `@Files` or `@Folder` selection to explicitly load only the files relevant to the current task.
*   **Context Hygiene:** In the Cline sidebar, I manually remove "Context Files" that are no longer relevant. This keeps the "active context" small and focused, ensuring the model pays attention to the files that actually matter for the current prompt.

### 3. The "Session Reset" Workflow
If you are working on a massive task that spans hours, the conversation history will eventually bloat.
*   **Checkpoint Method:** Every time I complete a major logical step (e.g., "The login function is now fixed"), I explicitly tell Cline:
    > "We have completed the login refactor. Please summarize the changes made so far, then I will start a new session for the next task."
*   **Fresh Sessions:** I do not try to keep one single chat session open for an entire week of development.
    *   **Session A:** Fix Bug X.
    *   **Session B:** Implement Feature Y.
    *   *Why?* This clears the "conversation history" tokens entirely, leaving 100% of your context window available for the **code files** needed for the current task.

### 4. Optimizing `llama.cpp` Configuration
Since I manage the server via `llama-swap`, I can tweak the context handling at the inference level.

*   **Explicit Context Sizing:** In my `config.yaml` for the Cline model, I explicitly set the context size to match the model file to prevent crashes:
    ```yaml
    cmd: |
      ./llama-server -m ${MODEL_PATH} \
      --port 8081 \
      --ctx-size 131072 \
      --temp 0.2 \
      --repeat-penalty 1.15
    ```

---

## How to Replicate This Setup

If you want to build this stack, here is the high-level workflow:

1.  **Install `llama.cpp`**: Compile it with GPU support (CUDA or Metal) for your specific hardware.
2.  **Configure `llama-swap`**: Create a `config.yaml` that defines your models and their specific port mappings.
    ```yaml
    # Example config snippet
    models:
      Qwen3.5-35B-A3B-UD-Q4_K_XL (General Tasks Non Thinking):
        cmd: C:\Programs\llama-latest\llama-server.exe --no-webui --port ${PORT} -m C:\llm_models\Qwen3.5-35B-A3B-UD-Q4_K_XL.gguf -a Qwen3.5-35B-A3B-UD-Q4_K_XL --mmproj C:\llm_models\mmproj-Qwen3.5-35B-F16.gguf -c 40960 --temp 0.7 --top_p 0.8 --min-p 0.00 --top_k 20 --chat-template-kwargs "{\"enable_thinking\":false}"
      Qwen3-Coder-Next-Q4_K_M:
        cmd: C:\Programs\llama-latest\llama-server.exe --no-webui --port ${PORT} -m C:\llm_models\Qwen3-Coder-Next-Q4_K_M.gguf -a Qwen3-Coder-Next-Q4_K_M -c 81920 --temp 1.0 --top_p 0.95 --min-p 0.01 --top_k 40 --repeat-penalty 1.0
    ```
3.  **Launch `llama-swap`**: It will listen on port 8080 and route requests to the correct backend based on the model name in the API call.
4.  **Connect Open WebUI**: Point the "Base URL" in Open WebUI settings to `http://localhost:8080/v1`.
5.  **Connect Cline**: In VS Code, go to Cline settings and set the API Provider to "Local" (or OpenAI Compatible) and point it to `http://localhost:8080/v1`.

## Conclusion

By separating the infrastructure from the model logic, and implementing strict context management strategies, I've created a system that is both powerful and private. The ability to switch between a deterministic "Coder" mode and a creative "Chat" mode using the same underlying Qwen 3.5 architecture, while intelligently managing context windows for large projects, has significantly improved my productivity.

Local AI is no longer just a hobby; it's a viable, high-performance alternative to cloud APIs for developers who value data sovereignty and low latency.

---
*If you found this guide helpful, I'd be very grateful if you'd help it spread by sharing it.*