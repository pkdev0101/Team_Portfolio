---
toc: True
layout: post
data: tools
title: MacOS Operating System and Tools Setup
description: Setup guide for MacOS developer tools including Homebrew, Python, and more.
categories: ['DevOps']
author: Lily Wu
permalink: /tools/os/macos
breadcrumb: True 
---

## Installation Hack

Welcome to your journey of setting up your Operating System and Tools! This setup process will guide you through working in a Linux terminal, managing folders, cloning a project, and adding packages. This is a fundamental skill for any developer or cyber security expert.

## Visual Representation of the Workflow
```text
+-------------------+       +-------------------+       +-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |       |                   |       |                   |
|  Linux Terminal   | ----> |  Shell Commands   | ----> |   Clone Project   | ----> |  Package Manager  | ----> |       SDLC        |
|                   |       |                   |       |                   |       |                   |       |                   |
+-------------------+       +-------------------+       +-------------------+       +-------------------+       +-------------------+
        |                           |                           |                           |                            |
        v                           v                           v                           v                            v
  Open Terminal              Terminal/Folder Mgmt         Clone the project          Set up and configure       Establish a development
                             Files and Folders            repository from            the tools required              workflow 
                                Management                version control             (Ruby, Python)               (SDLC) phases
```

## Shell Commands

You’ll use standard Unix shell commands:
- MacOS: `ls`, `pwd`, `mkdir`, `cd`, `git`, `cat`

## Version Control Commands

- **git clone**: Make a working copy of a git repository from the cloud to your local machine.
- **git pull**: Update your local copy of the repository with changes from the cloud repository.
- **git commit**: Save changes to files in your local repository.
- **git push**: Send updates from your local repository to the remote repository.

## Package Manager Commands – MacOS (brew)

- **List installed packages:** `brew list`
- **Search for a package:** `brew search <package_name>`
- **Update Homebrew:** `brew update`
- **Upgrade installed packages:** `brew upgrade`
- **Uninstall a package:** `brew uninstall <package_name>`

---

## MacOS Setup

### Install VS Code and Homebrew

1. **Install VS Code**  
   [VS Code link and instructions]

2. **Run initialization scripts**
   
```bash
git clone https://github.com/open-coding-society/student.git
cd student
chmod +x ./scripts/initialize_macos.sh
./scripts/activate_macos.sh
```
---

## Version Checks
```bash
ruby -v
bundle -v
python --version
jupyter --version
```

---

{% include slim_sidebar.html %}
