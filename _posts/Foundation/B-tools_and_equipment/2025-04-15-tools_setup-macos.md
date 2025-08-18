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

```mermaid
flowchart TD
    A["💻 Open Terminal"] 
    B["> Linux Commands<br>mkdir, cd, ls"]
    C["📁 Clone Project<br>git clone https://<your-repo>"]
    D["🛠️ Activate Tools<br>Ruby, Python, Git"]
    E["🔄 SDLC<br>code->make->test->commit"]

    A --> B --> C --> D --> E
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

### Install Homebrew

Open a MacOS "terminal" and Keep in Dock

[Homebrew Install pages follow instructions](https://brew.sh/)

#### Install VS Code

[VSCode link, Select OS and follow instructions](https://code.visualstudio.com/download)

#### First-time Setup

Run these commands to set up your MacOS developer tools for the first time.

```bash
mkdir opencs
cd opencs
git clone https://github.com/Open-Coding-Society/student.git
cd student/
./scripts/activate_macos.sh
./scripts/activate.sh # prompts for Git UID and Personal Email
./scripts/venv.sh
```

#### Setup Checks (Optional)

Run these commands to verify your system setup and check installed tools.

Open a MacOS "terminal" by clicking Terminal Icon in Dock

```bash
ruby -v
bundle -v
python --version
jupyter --version
git config --global --list
jupyter kernelspec list
pip list
```

#### After restarting a terminal

Open a MacOS "terminal" by clicking Terminal Icon in Dock

Each time you open a new terminal session, run these commands to activate your environment and start working on the student project in VS Code.

```bash
cd opencs/student
source venv/bin/activate
code .
```

---

{% include slim_sidebar.html %}
