---
toc: True
layout: post
data: web-dev
title: GitHub Pages About Me & Tools Hub
description: In this guide, you'll set up your personal About Me site using GitHub Pages and create a homepage to organize and link to your Week 1 tools lessons. By the end, you'll have a deployed website that documents your development setup and serves as a launchpad for future projects.
categories: ['GitHub Pages']
permalink: /web-dev/documentation
breadcrumb: True
---

## Overview

In this tutorial, you will:
- Set up and deploy your personal site using GitHub Pages
- Create an **About Me** page with Markdown
- Link to your **Day 1 tools lessons** from a homepage
- Learn to test on `localhost`, commit with Git, and view on `github.io`

This becomes your **hub** for your development journey.

---

## Step 1: Set Up Your GitHub Pages Repository

1. Create a new repository cloned from template (idk which repo).
2. Clone it locally and open it in VS Code.
3. Ensure you have the necessary files:
   - `_config.yml`
   - `index.md`
   - `_posts/` folder
4. Add your name, short intro, and an image in `index.md`.

---

## Step 2: Customize `index.md`

Use Markdown syntax:

```markdown
# About Me

Hi! I'm [Your Name], a developer at [School].

## My Goals
- Learn HTML, CSS, and JavaScript
- Build real-world web applications
- Collaborate using GitHub

![My Image](images/me.png)
```
---

## Step 3: Add Tools Links

Create a list of links or buttons to your tools setup pages (you can use Markdown or HTML).

### Example (Markdown):

```markdown
## Developer Toolkit

- [GitHub Setup](/tools/github)
- [Markdown Basics](/tools/markdown)
- [Visual Studio Code](/tools/vscode)
``` 

### Example (HTML Buttons):

```html
<h2>Developer Toolkit</h2>
<a href="/tools/github"><button>GitHub</button></a>
<a href="/tools/markdown"><button>Markdown</button></a>
<a href="/tools/vscode"><button>VS Code</button></a>
```
---
## Step 4: Deploy to GitHub Pages

### 1. Commit and Push Changes
First, commit your local changes and push them to GitHub:

```bash
git add .
git commit -m "Initial site setup"
git push origin main
```
### 2. Configure GitHub Pages

In your GitHub repository:

1. Navigate to **Settings** → **Pages**
2. Under "Build and deployment":
   - **Branch**: Select `main` from dropdown
   - **Folder**: Select `/(root)`
3. Click **Save**

### 3. Verify Deployment

- Wait 1-2 minutes for deployment to complete
- Refresh the page to see the active deployment status
- A green checkmark will appear when deployment succeeds

### 4. Access Your Site

Your site will be live at:

https://<username>.github.io/<repository>