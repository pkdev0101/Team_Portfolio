---

toc: True
layout: post
data: tools
title: Windows (WSL) Operating System and Tools Setup
description: Setup guide for using Windows Subsystem for Linux with Ubuntu for development.
categories: ['DevOps']
author: Lily Wu
permalink: /tools/os/windows
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
```

## Shell Commands

- Windows: `wsl`, then standard Linux commands inside Ubuntu

## Version Control Commands

- **git clone**: Make a working copy of a git repository from the cloud to your local machine.
- **git pull**: Update your local copy of the repository with changes from the cloud repository.
- **git commit**: Save changes to files in your local repository.
- **git push**: Send updates from your local repository to the remote repository.

## Package Manager Commands – Ubuntu (apt)

- **Update package list:** `sudo apt update`
- **Upgrade installed packages:** `sudo apt upgrade`
- **Install a package:** `sudo apt install <package_name>`
- **Remove a package:** `sudo apt remove <package_name>`
- **Search for a package:** `apt search <package_name>`
- **List installed packages:** `apt list --installed`

---

## Windows Setup

### Install WSL and Ubuntu

1. In PowerShell (Admin):  
   ```bash
   wsl --install -d Ubuntu-24.04
   ```

2. Setup a username and password when prompted.

3. To start Linux:  
   ```bash
   wsl
   ```

4. Set as default:  
   ```bash
   wsl --set-default Ubuntu-24.04
   ```

### WSL Reference Commands

- `wsl -l -o`, `wsl -l -v`, `wsl --shutdown`, etc.

---

## Install Developer Tools

```bash
cd
mkdir opencs 
cd opencs 
git clone https://github.com/open-coding-society/pages.git
cd opencs/pages/scripts
./activate_ubuntu.sh
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