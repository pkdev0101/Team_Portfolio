---
toc: false
layout: post
data: web-dev
title: VSCode & Collaboration
description: Collaborate in real time using VSCode Live Share, pair programming techniques, and effective version control to work like professional dev teams.
categories: ['Web Development', 'Collaboration']
permalink: /web-dev/collaboration
breadcrumb: true
---

# Collaboration & Teamwork in Web Development

In real-world software development, working together is just as important as writing code. This guide covers key collaboration tools and workflows, especially **VSCode Live Share**, **Git-based teamwork**, and **pair programming**.

---

## VSCode Live Share

VSCode Live Share lets you collaborate in real time. You and your teammates can edit, debug, and even use the terminal together — all from your own devices.

### How to Use Live Share

1. **Install the Live Share extension** in VSCode.
2. Click the **Live Share** button in the bottom bar to start a session.
3. Share the invite link with your partner(s).
4. Teammates can join and collaborate in your coding environment.
5. Use shared terminal, servers, and debugging tools together.

Live Share is perfect for:
- Pair programming
- Mentoring or tutoring
- Remote debugging
- Collaborative review sessions

---

## Pair Programming Strategies

Pair programming is when two developers work together at one workstation — one codes ("driver"), and the other reviews and guides ("navigator").

### How to Do It

- One person writes code, the other watches, gives ideas, and catches bugs.
- After 10–15 minutes, **switch roles**.
- Keep communication active and respectful.
- Use **Live Share** so you can work from separate computers.

### When to Pair Program vs Split Tasks

#### Split Work By Features (Best for Teams of 3+)

- Divide features logically: e.g., one person works on login, another on leaderboard, a third on game logic.
- Use branches to avoid merge conflicts.
- Later, **merge and integrate** your parts.

#### Pair Program When…

- Working on tricky features like auth or backend logic
- Debugging something complex
- Reviewing code before a big push


---

## Git Collaboration Basics

Version control is your safety net for team coding.

### Git Concepts to Know

- **Branching**: Work independently without breaking main  
  [Git Branching Basics](https://www.atlassian.com/git/tutorials/using-branches)  

- **Pull requests**: Share and review changes before merging  
  [About Pull Requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests)  

- **Commit messages**: Make them clear and specific (`feat: add navbar`, `fix: login redirect`)  
  [Writing Good Commit Messages](https://chris.beams.io/posts/git-commit/) *(third-party guide widely recommended)*  

- **Conflict resolution**: Use VSCode’s merge tools and communicate often  
  [Resolving a merge conflict using the command line](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts)  

### Tools to Use

- **GitHub**: Push/pull, open issues, and assign tasks  
  [GitHub Docs - About GitHub](https://docs.github.com/en/get-started/quickstart/github-flow)  

- **Kanban Boards**: for task tracking  
  [GitHub Projects (Kanban)](https://docs.github.com/en/issues/organizing-your-work-with-project-boards)  

- **Commits**: Use them to verify team contributions (use GitHub Insights or terminal logs)  
--- 

## Collaboration Hack: Hobbies Showcase

Now that you've learned how to use VSCode Live Share and personalize your `about.md` page, let’s make it more fun — together.

In this mini-hack, you'll work in **pairs** to design a creative section that showcases your hobbies or interests.

### What You’ll Build

A new section in your `about.md` page called **My Hobbies** that includes:

- 3 to 5 hobbies or interests
- A small image for each hobby
- A short caption or sentence describing why it matters to you
- Optional: Emojis, colors, layout tweaks (inline styles)

### How to Work Together

- Use **VSCode Live Share** to collaborate in real time
- One person can write the code while the other helps with design/layout
- Switch roles halfway through!

### Your Image Folder

Make sure your images are saved in the `images/` folder.


###  Sample Code Snippet

Add this to your `about.md` below your intro:

```markdown
## My Hobbies

### Swimming  
<img src="{{ site.baseurl }}/images/swimming.jpg" alt="Swimming" style="width:150px;">
I love to swim laps at my local pool — it's my go-to for stress relief.

### Reading  
<img src="{{ site.baseurl }}/images/reading.png" alt="Reading" style="width:150px;">
Reading novels helps me recharge and get inspired.

### Baking  
<img src="{{ site.baseurl }}/images/baking.svg" alt="Baking" style="width:150px;">
Baking lets me get creative in the kitchen and share treats with friends.
```

---

## Quick Intro to CSS Styling

CSS (Cascading Style Sheets) lets you control how your content looks — size, color, spacing, layout, and more!

In this project, you’ll use **inline CSS**, which means writing style rules directly inside your HTML elements.

### Syntax Example

```html
<img src="{{ site.baseurl }}/images/baking.png" alt="Baking" style="width:150px;">
```

`style="..."` goes inside your HTML tag.

`width:150px;` makes the image 150 pixels wide.

You can also add other styles like:

```html
style="border-radius: 10px; margin: 10px; box-shadow: 2px 2px 5px gray;"
```

### Try It!

Add styles like these to your `about.md` content:

- Change the size of an image  
- Add space around a heading  
- Make a heading a different color:

```html
<h2 style="color: teal;">My Hobbies</h2>
```