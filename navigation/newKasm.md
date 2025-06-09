---
layout: lesson
title: KASM Documentation using Updated Lesson
description: Exploring how Nighthawk Coding Society deployed cloud-based development environments using KASM, Terraform, Ansible, and Flask.
categories: [Kasm]
permalink: /kasm/overview
author: Mihir Bapat, Kiruthic Selvakumar, Shawn Ray
video_url: "https://www.youtube.com/watch?v=hXkZVqqAg7c"
flashcards: kasm_flashcard
---

{% include video.html %}

> KASM gives every student a virtual desktop in the browser — from setup to scalability, here's how we made it work.

---

## ☁️ Why KASM?

Many students don’t have access to powerful development machines. KASM fixes that with cloud-based, on-demand desktops. We designed a multi-server system that launches containers in the browser — instantly.

---

## 🖥️ System Architecture

Our infrastructure includes:

- A **Frontend** (GitHub Pages) for student registration
- A **Flask backend** for logic and KASM API communication
- An **RDS database** to store user metadata
- **KASM MultiServer** to stream Linux desktops on demand

<img src="{{ site.baseurl }}/kasm_design/kasm_diagram.png" alt="System Diagram" style="max-width:100%; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />

---

## 🧰 DevOps Tools We Used

To automate deployment and configuration:

- 🏗️ `Terraform` — sets up AWS servers
- 🧪 `Ansible` — configures servers into KASM workers
- 🐚 `Shell scripts` — glue tools together and trigger deployments

These tools gave us repeatable, scalable infrastructure in minutes.

---

## 💻 What Students See

KASM presents a full Linux desktop, right in the browser. It includes:

- VS Code
- Python, Java, JavaScript
- Git and CLI tools

Admins manage user access and resource limits through the KASM UI.

<img src="{{ site.baseurl }}/kasm_design/kasm_desktop.png" alt="Student View of KASM Desktop" style="max-width:100%; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />

---

## 💰 Cost Comparison: PCs vs. Cloud

| Solution      | Yearly Cost | 5-Year Cost | Flexibility |
|---------------|-------------|-------------|-------------|
| KASM + AWS    | ~$8,100     | ~$40,500    | ✅ Spin up in seconds |
| Traditional PCs | ~$16,000  | ~$80,000    | ❌ Locked to hardware |

KASM cuts costs to 50% and makes access available from **anywhere**, **anytime**.

---

## 📊 Real Usage Data

Our logs show:

- 40+ students using KASM daily
- Homework done after hours from home
- No more idle computer labs

<img src="{{ site.baseurl }}/kasm_design/kasm_usage.png" alt="KASM Usage Graph" style="max-width:100%; border-radius: 10px;" />

---

## 🃏 KASM Flashcards

Use these to test your understanding of cloud deployment concepts and tools.

{% include flashcards.html %}

---

## 📝 Your Notes

Take personal notes on what you’ve learned or build your own study cards.

{% include flashcard-notes.html %}

---

## 🔗 Resources

- [Live Registry](https://open-coding-society.github.io/kasm_registry/1.0/)
- [DockerHub Image](https://hub.docker.com/repository/docker/open-coding-society/pusd-student-ubuntu/general)
- [GitHub Template](https://github.com/open-coding-society/Kasm-Ubuntu22.04-Image-Template)
