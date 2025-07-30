---

toc: True
layout: post
data: tools
title: KASM Workspace Operating System and Tools Setup
description: Setup guide for using the Ubuntu-based KASM Workspace for development.
categories: ['DevOps']
author: Lily Wu
permalink: /tools/os/kasm
breadcrumb: True 
---

## Installation Hack

Welcome to your journey of setting up your Operating System and Tools! This setup process will guide you through working in a Linux terminal, managing folders, cloning a project, and adding packages.

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
````

## Shell Commands

* KASM (Linux): `ls`, `pwd`, `mkdir`, `cd`, `git`, `cat`

## Version Control Commands

* **git clone**: Make a working copy of a git repository from the cloud to your local machine.
* **git pull**: Update your local copy of the repository with changes from the cloud repository.
* **git commit**: Save changes to files in your local repository.
* **git push**: Send updates from your local repository to the remote repository.

## Package Manager Commands – Ubuntu (apt)

* **Update package list:** `sudo apt update`
* **Upgrade installed packages:** `sudo apt upgrade`
* **Install a package:** `sudo apt install <package_name>`
* **Remove a package:** `sudo apt remove <package_name>`
* **Search for a package:** `apt search <package_name>`
* **List installed packages:** `apt list --installed`

---

## 🚀 KASM Workspace Setup (Ubuntu Noble / Kali)

Thanks to improvements in the KASM image, getting started is fast and simple.

### ✅ First-time setup

```bash
mkdir open
cd open
git clone https://github.com/Open-Coding-Society/pages.git
cd pages/
pagesenv
bundle install
code .
make
```

## ✅ Activate Script

There is a setup script called `activate_github.sh` in your `pages/scripts` folder with:

```bash
# Git identity setup
git config --global user.name {USER_NAME}
git config --global user.email {EMAIL}

# Persist gem installation path
bundle config set --local path './.bundle'
```

Run this script to setup Git config and ensure Gem installation is persistent across sessions.


### 🔁 After restarting a session

Even after a destroy, your data persists. Just relaunch with:

```bash
cd open/pages
pagesenv
code .
make
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

## What is `make`?

Think of `make` as a smart **task helper** for developers.

* It **automates commands** you would normally type one by one.
* It reads a special file called a **Makefile**, which lists tasks and how to run them.

### Example:

Instead of running:

```bash
bundle exec jekyll serve
python3 my_script.py
```

Just run:

```bash
make
```

And it will do everything listed in the `Makefile`.

{% include slim_sidebar.html %}
