---
toc: True
layout: post
data: tools
title: VSCode Setup 
description: A key to learning in this class is understanding how to make a GitHub Pages project.  This guide will setup and run the project.  At the end, you will have a student Website that can be used for blogging classroom learnings and progress.
categories: ['DevOps']
author: Lily Wu
permalink: /tools/vscode
breadcrumb: /tools 
breadcrumbs: True 
---

## Starting a Project

The following commands are universal for all machine types, terminals, and projects. The previous installation steps ensured that all machine types have compatible tools. Follow these steps in order:

### Open a Linux-supported Terminal (Ubuntu, Kali, MacOS).

### Move to your home directory: `cd`

### Setup a directory for projects 

Change **open-coding-society/student.git** to match the name of your organization and repo.

   ```bash
   mkdir -p opencs
   cd opencs 
   git clone https://github.com/open-coding-society/student.git
   ```

### Prepare project prior to opening VS Code

   ```bash
   # Move to the project directory
   cd student
   # Create a virtual environment using the provided script
   ./scripts/venv.sh
   # Activate the virtual environment (observe the prompt change)
   source venv/bin/activate
   # Install Ruby gems, Jekyll required (GitHub Pages)
   bundle install
   # Open the project in VS Code
   code .
   ```

### Authenticate with GitHub

* At some point, you may be prompted to authenticate with GitHub. Follow the dialog and instructions.
* **KASM** A keyring may appear; ensure you authenticate. Using credentials similar to GitHub should work.

### For WSL Users Only

* Ensure that VS Code is opened in WSL. Check the bottom-left corner of the VS Code window to confirm. This is critical for success!
   ![wsl]({{ site.baseurl }}/images/notebooks/foundation/wsl.jpg)

---

## Software Development Life Cycle (SDLC)

The development cycle involves iterative steps of running the server, making changes, testing, committing, and syncing changes to GitHub. This process ensures that your website is updated and functioning correctly both locally and on GitHub Pages.

### SDLC Workflow

```text
+-------------------+       +-------------------+       +-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |       |                   |       |                   |
|    Run Server     | ----> |   Make Changes    | ----> |     Test          | ----> |    Commit         | ----> |     Sync          |
|                   |       |                   |       |                   |       |                   |       |                   |
+-------------------+       +-------------------+       +-------------------+       +-------------------+       +-------------------+
        |                           |                           |                           |                           |
        v                           v                           v                           v                           v
 Start Local Server           Edit Code Files            Verify Changes             Save Changes Locally        Push Changes to Remote
```

### Open Project and Make

All students are building a GitHub Pages website.  These steps get your website running on your desktop (local or cloud).

#### What is `make`?

Think of `make` as a smart **task helper** for developers.

* It **automates commands** you would normally type one by one.
* It reads a special file called a **Makefile**, which lists tasks and how to run them.  

Instead of running:

```bash
bundle exec jekyll serve
python my_script.py
```

Just run:

```bash
make
```

And it will do everything listed in the `Makefile`.

1. Open a terminal

2. Navigate to your project directory `cd ~/opencs/portfolio/student`

3. Activate virtual environment `source venv/bin/activate`

4. Open VSCode `code .`

5. Open a VSCode Terminal

6. Type `make` This runs a build to a local server. Repeat this command as often as you make changes.

7. Hover then Cmd or Ctl Click on the Server address **<http://127.0.0.1> ...** provided in the terminal output from the make command.

```bash
### Congratulations!!! An output similar to below means tool and equipment success ###
johnmortensen@Johns-MBP pages % make
Stopping server...
Stopping logging process...
Starting server...
Server PID: 48190
Terminal logging starting, watching server...
Server started in 3 seconds
Configuration file: /Users/johnmortensen/vscode/pages/_config.yml
To use retry middleware with Faraday v2.0+, install `faraday-retry` gem
            Source: /Users/johnmortensen/vscode/pages
       Destination: /Users/johnmortensen/vscode/pages/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
      Remote Theme: Using theme jekyll/minima
                    done in 2.493 seconds.
 Auto-regeneration: enabled for '/Users/johnmortensen/vscode/pages'
    Server address: http://127.0.0.1:4100/pages/
```

#### Make workflow (local build: make, make clean, make stop, make convert)

These commands are used to build and manage a localhost version of the website. The purpose of this is to verify and test code changes prior to pushing changes to GitHub Pages.

* `make`: Runs the local server.

* `make clean`: Stops the local server and cleans the files.

* `make stop`: Stops the local server. This means you will be unable to access your blog on <http://localhost> until you run `make` again.

* `make convert`: Converts Jupyter Notebook files. Run this if your `.ipynb` files are not updating on the server; it may assist in finding the error.

### VSCode Commit and Sync Workflow

All students will be writing and changing code.  These steps allow you to change the website, first locally and then on public location.

```text
+-------------------+       +-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |       |                   |
|   VS Code Editor  | ----> |   Local Git Repo  | ----> |   Remote GitHub   | ----> |   GitHub Pages    |
|                   |       |                   |       |                   |       |                   |
+-------------------+       +-------------------+       +-------------------+       +-------------------+
        |                           |                           |                           |
        |                           |                           |                           |
        v                           v                           v                           v
    Save Files                Commit Changes               Sync Changes                Public Website
   Local Website
```

#### Detailed Steps

1. Save Files in VS Code:

   * Edit your files.
   * Save the changes (Cmd + S on Mac or Ctrl + S on Windows/Linux).
   * Verify changes on the local webserver.

2. Commit Changes in VSCode:

   * Click on the "Source Control" icon in the left sidebar.
   * Stage your changes by clicking the plus sign next to the files.
   * Enter a commit message.
   * Click the "Commit" button.

3. Sync Changes to GitHub:

   * Click the "Sync Changes" button in the Source Control view.
   * This pushes your local commits to the remote GitHub repository.

4. Update GitHub Pages:

   * GitHub Pages automatically rebuilds your site with the latest changes.
   * Visit your public website at https://<yourGitHubID>.github.io/student to see the updates.
