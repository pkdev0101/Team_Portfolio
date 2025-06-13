---
toc: False
layout: post
data: web-dev
title: GitHub Pages About Me & Tools Hub
description: In this guide, you'll set up your personal About Me site using GitHub Pages and create a homepage to organize and link to your Day 1 tools lessons. By the end, you'll have a deployed website that documents your development setup and serves as a launchpad for future projects.
categories: ['GitHub Pages']
permalink: /web-dev/documentation
breadcrumb: True
---

##  Overview

In this tutorial, you will:
- Set up and deploy your personal site using GitHub Pages
- Create an **About Me** page with Markdown
- Add a **Tools Hub** page that links to your Day 1 lessons
- Learn to test on `localhost`, commit with Git, and view on `github.io`

This becomes your **hub** for your development journey.

---

##  Step 1: Edit `_config.yml`

Your `_config.yml` file is the settings file that powers your Jekyll site.

### Sample `_config.yml`

```yaml
title: Nighthawk Pages 
description: "Class of 2025"
owner_name: John Mortensen
github_username: vibha1019
github_repo: "vibha_mandayam" 
baseurl: "/vibha_mandayam"  
future: true

remote_theme: jekyll/minima
plugins:
  - jekyll-remote-theme

minima:
  skin: dark
  social_links:
    - { platform: github, user_url: "https://github.com/nighthawkcoders"}
    - { platform: x, user_url: "https://x.com/NighthawkCoding/" }
    - { platform: youtube, user_url: "https://www.youtube.com/@nighthawkcodingsociety2868" }

  nav_pages:
    - navigation/blog.md
    - navigation/search.md
    - navigation/about.md
    - navigation/tools.md
```

### Customize These Fields

- **title**: Change to your name or site theme  
- **description**: Write a brief tagline or site purpose  
- **owner_name**: Your full name  
- **github_username** and **github_repo**: Match your GitHub  
- **baseurl**: Should be `"/your_repo_name"` (include the slash)

---

## Step 2: Create `about.md`

In the `navigation/` folder, create `about.md` with this content:

```markdown
---
layout: page
title: "About Me"
permalink: /about/
---

# Hello!

I'm Vibha, a student passionate about CS, design, and making cool things with tech. This site documents my projects and learning journey.

## Interests
- AI/ML
- Full-stack web development

## Courses
- AP Computer Science Principles
- AP Calc

## Links
- [My GitHub](https://github.com/vibha1019)
- [My Resume](#)
```

---

## Step 3: Create `tools.md` for Your Hub

Also inside `navigation/`, create `tools.md` to link your lessons:

```markdown
---
layout: page
title: Tools Hub
permalink: /tools/
---

# Tools Hub

Welcome to my tools hub! Here are links to my key setup guides and lessons:

- [VS Code Setup](/posts/vscode-setup)
- [GitHub Pages Guide](/web-dev/documentation)
- [Git Commands](/posts/git-commands)
```

You can update these links to point to your actual posts or tools lessons.

---
## Step 4: Push & Deploy

Once everything’s in place:

```bash
make     
```


Visit:  
```
https://<your-username>.github.io/<your-repo>/
```

---


