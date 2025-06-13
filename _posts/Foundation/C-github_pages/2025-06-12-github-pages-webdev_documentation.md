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

## Overview

In this tutorial, you will:
- Set up and deploy your personal site using GitHub Pages
- Create an **About Me** page with Markdown
- Link to your **Day 1 tools lessons** from a homepage
- Learn to test on `localhost`, commit with Git, and view on `github.io`

This becomes your **hub** for your development journey.

---

## Step 1: Edit `_config.yml`

Your `_config.yml` file is the settings file that powers your Jekyll site. You'll find it in the root of your GitHub Pages repository.

### Sample `_config.yml`

Here's a sample to start from:

```yaml
title: Nighthawk Pages 
description: "Class of 2025"
owner_name: John Mortensen
github_username: vibha1019
github_repo: "vibha_mandayam" 
baseurl: "/vibha_mandayam"  
future: true

remote_theme: jekyll/minima
minima:
  skin: dark
  social_links:
    - { platform: github, user_url: "https://github.com/nighthawkcoders"}
    - { platform: x, user_url: "https://x.com/NighthawkCoding/" }
    - { platform: youtube, user_url: "https://www.youtube.com/@nighthawkcodingsociety2868" }

plugins:
  - jekyll-remote-theme

minima:
  nav_pages:
    - navigation/blog.md
    - navigation/search.md
    - navigation/about.md
    - navigation/tools.md
    - README4YML.md

```

# What to Customize

**title**: Change to your own name or theme 
**description**: Describe your site.  
**owner_name**: Your full name.  
**github_username**: Your GitHub username.  
**github_repo**: The name of this GitHub repository.  
**baseurl**: Should match the repo name, prefixed with `/`.

---

# Step 2: Create about.md

Create a file at `navigation/about.md` with the following content:

```markdown
---
layout: page
title: "About Me"
permalink: /about/
---

#  Hello!

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

# Step 3: Add the Page to Navigation

In `_config.yml`, add this:

```yaml
minima:
  nav_pages:
    - navigation/about.md
```

---

# Step 4: Push Changes and Deploy

Save your changes.  
Before pushing, test your site locally by running:

```bash
make 
```

Visit `https://<your-username>.github.io/<your-repo>` to see it live!

---
Next: Learn how to use Markdown, link other pages, and add buttons to your homepage.

