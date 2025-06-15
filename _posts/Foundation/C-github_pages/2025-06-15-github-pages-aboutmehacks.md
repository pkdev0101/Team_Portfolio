---
toc: False
layout: post
data: web-dev
title: GitHub Pages About Me Hacks
description: Additional things you can add to your About Me page
categories: ['GitHub Pages']
permalink: /web-dev/aboutmehacks
breadcrumb: True
---

## GitHub Pages Coding Introduction

Building your personal GitHub Pages website introduces you to web development using **HTML**, **CSS**, **JavaScript**, and **Markdown**.

Here’s how each language contributes:

- **HTML** provides the structure and content
- **Markdown** is a shorthand way to write static content
- **CSS** styles your webpage to make it look polished
- **JavaScript** adds interactivity and dynamic features

GitHub Pages uses a static site generator called **Jekyll**, which works with the **Liquid** language to convert Markdown (`.md`) files into full HTML webpages. Most of your pages will start in Markdown, but you can include HTML, CSS, and JavaScript within them as needed.

> Markdown is beginner-friendly, and you can expand into HTML/CSS/JS as you grow.

---

## What Is Static Content?

Static content means the webpage shows the same content to all users until you manually change it. Unlike dynamic websites (like social media feeds), static sites load faster, are more secure, and are great for portfolios, blogs, and documentation.

You can still add some dynamic behavior using **JavaScript** and public **APIs**. Later, you'll see examples like JavaScript games or login systems.

---

## Markdown → HTML: Behind the Scenes

When you run `make` in your GitHub Pages repo, all your `.md` files are **converted into HTML** files in the `_site/` directory. This is what your browser actually displays.

Here’s a sample Markdown block from `index.md`:

```markdown
## Build your Home Page here 
# Investing in your Technical Future
> Explore the Computer Science Pathway at Del Norte High School and invest in your technical skills.

- Project-based learning
- Peer collaboration
- Creativity and critical thinking
- Homework: ~2–3 hours/week

![csse]({{site.baseurl}}/images/ccr.png)
```
And here’s what it might look like after conversion:

    ```html
    <h2>Build your Home Page here</h2>
    <h1>Investing in your Technical Future</h1>
    <blockquote>Explore the Computer Science Pathway at Del Norte High School...</blockquote>
    <ul>
    <li>Project-based learning</li>
    ...
    </ul>
    <img src="/images/ccr.png" alt="csse">

    ```

---

## Images

In GitHub Pages, you can **insert images** in HTML or Markdown.

There are many image examples using markdown in the index.md file, this are reading content from the images directory.

The Teacher finds the HTML \<img\> easier to work with for embedding links when it is necessary to control size.  This example shows Markdown syntax for embedding images, but students can also use HTML syntax with the <img> tag.

- See index.md for !\[\]\(\) syntax for images, or reference [Markdown images](https://www.markdownguide.org/basic-syntax/#images-1)

- Or use "img" tage referencing [HTML images](https://www.w3schools.com/html/html_images.asp)


### Living in the World

Let's say someone in CompSci wants to share places they have lived on their index.md page. Notice the size and orientation is a 1x4 grid through CSS.

#### Tag rules for GitHub Pages
As we code and use chat bots to assist, we need to know certain `Tag rules` for code in GitHub pages.  Remember these as otherwise you may run into `unpredictable issues`.

- **Not necessary tags.** GitHub Pages does not require a `<head>`, `<body>`, or `<html>` tags. All markdown files are generated and those tags are added on conversion from md to html.

- **Required tags.** Notice the usage of the `<style>` tag, later we will see usage and need of the `<script>` tag.

<style>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }
    .grid-item {
        text-align: center;
    }
    .grid-item img {
        width: 100%;
        height: auto;
    }
</style>

<div class="grid-container">
    <div class="grid-item">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg" alt="California Flag">
        <p>California - forever</p>
    </div>
    <div class="grid-item">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Oregon.svg" alt="Oregon Flag">
        <p>Oregon - 9 years</p>
    </div>
    <div class="grid-item">
        <img src="https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg" alt="England Flag">
        <p>England - 2 years</p>
    </div>
    <div class="grid-item">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Hawaii.svg" alt="Hawaii Flag">
        <p>Hawaii - 2 years</p>
    </div>
</div>


## Multiple Ways of Coding

The `script` tag in the running example above contains JavaScript. This JavaScript is written in a style that is similar to other languages like Java and Python, making it easier for developers familiar with those languages to understand. However, be aware that code can be written in many styles, some of which may not be as friendly to the syntax of other coding languages.

JavaScript is unique in its `style` and `html` usages that are shown in this example. The interaction of JavaScript with these tags and its operation within a web browser is its unique purpose. As JavaScript and other languages develop their niches, they start to vary in aspects like syntax.

A pure JavaScript programmer might write the `script` section differently. Therefore, when you watch a coding video or request code from a chatbot, the code might vary, but the different coding styles and syntax changes essentially achieve the same result.

1. **Connecting to the HTML Container**:
   - The `container` declaration connects to the HTML element with the ID `grid_container`.

2. **Defining Data**:
   - The `http_source` holds the base URL for the flag images.
   - The `living_in_the_world` array contains objects representing different locations, each with a flag URL, greeting, and description.

3. **Building Grid Items**:
   - The loop iterates over each location in the `living_in_the_world` array.
   - For each location, a new `div` element with the class `grid-item` is created.
   - An `img` element is created for the flag, with the `src` attribute set to data from the `living_in_the_world` array.
   - Two `p` elements are created for the description and greeting.
   - These elements are appended to the `gridItem` div, which is then appended to the `container` div.

The code and examples showcase the use of modern JavaScript features to create a dynamic grid of items based on an array of data.

### Modern JavaScript Features

This example demonstrates several modern JavaScript features that are prevalent in contemporary JavaScript codebases.

- **`const` for Variable Declarations**: The `const` keyword is used for variable declarations, indicating that the variable's value will not change throughout the script. This is useful for defining constants and ensuring immutability.
- **Arrow Functions**: Arrow functions are used in the `forEach` loop. They provide a concise syntax for writing functions and are popular in functional programming styles.
- **Template Literals**: Template literals are used for string concatenation. They allow for embedding expressions within strings using backticks (`` ` ``) and `${}` syntax. This can make the code more readable and easier to write by keeping the evaluation and the string in close proximity, reducing the cognitive load on the developer.

```javascript
<script>
    // 1. Make a connection to the HTML container defined in the HTML div
    const container = document.getElementById("grid_container"); // This container connects to the HTML div

    // 2. Define a JavaScript object for our http source and our data rows for the Living in the World grid
    const http_source = "https://upload.wikimedia.org/wikipedia/commons/";
    const living_in_the_world = [
        {flag: "0/01/Flag_of_California.svg", greeting: "Hey", description: "California - forever"},
        {flag: "b/b9/Flag_of_Oregon.svg", greeting: "Hi", description: "Oregon - 9 years"},
        {flag: "b/be/Flag_of_England.svg", greeting: "Alright mate", description: "England - 2 years"},
        {flag: "e/ef/Flag_of_Hawaii.svg", greeting: "Aloha", description: "Hawaii - 2 years"},
    ]; 
    
    // 3a. Consider how to update style count for size of container
    // The grid-template-columns has been defined as dynamic with auto-fill and minmax

    // 3b. Build grid items inside of our container for each row of data
    living_in_the_world.forEach(location => {
        // Create a "div" with "class grid-item" for each row
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";  // This class name connects the gridItem to the CSS style elements

        // Add "img" HTML tag for the flag
        const img = document.createElement("img");
        img.src = `${http_source}${location.flag}`; // concatenate the source and flag
        img.alt = `${location.flag} Flag`; // add alt text for accessibility

        // Add "p" HTML tag for the description
        const description = document.createElement("p");
        description.textContent = location.description; // extract the description

        // Add "p" HTML tag for the greeting
        const greeting = document.createElement("p");
        greeting.textContent = location.greeting;  // extract the greeting

        // Append img and p HTML tags to the grid item DIV
        gridItem.appendChild(img);
        gridItem.appendChild(description);
        gridItem.appendChild(greeting);

        // Append the grid item DIV to the container DIV
        container.appendChild(gridItem);
    });
</script>

```

### Classic for Loop Example

This example contains a classic for loop that is common to almost every programming language. It demonstrates a traditional approach to iterating over an array and building HTML elements dynamically.

- **Three-Part For Loop**: Uses the three-part for loop structure: initialization of the index (`i`), loop comparison, and index increment.
- **Variable Declaration with `let`**: Uses `let` to define `i`, a variable that changes as the code logic progresses.

```javascript
<script>
    // 1. Make a connection to the HTML container defined in the HTML div
    const container = document.getElementById("grid_container"); // This container connects to the HTML div

    // 2. Define a JavaScript object for our http source and our data rows for the Living in the World grid
    const http_source = "https://upload.wikimedia.org/wikipedia/commons/";
    const living_in_the_world = [
        {flag: "0/01/Flag_of_California.svg", greeting: "Hey", description: "California - forever"},
        {flag: "b/b9/Flag_of_Oregon.svg", greeting: "Hi", description: "Oregon - 9 years"},
        {flag: "b/be/Flag_of_England.svg", greeting: "Alright mate", description: "England - 2 years"},
        {flag: "e/ef/Flag_of_Hawaii.svg", greeting: "Aloha", description: "Hawaii - 2 years"},
    ]; 
    
    // 3a. Consider how to update style count for size of container
    // The grid-template-columns has been defined as dynamic with auto-fill and minmax

    // 3b. Build grid items inside of our container for each row of data
    for (let i = 0; i < living_in_the_world.length; i++) {
        const location = living_in_the_world[i];

        // Create a "div" with "class grid-item" for each row
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";  // This class name connects the gridItem to the CSS style elements

        // Add "img" HTML tag for the flag
        const img = document.createElement("img");
        img.src = `${http_source}${location.flag}`; // concatenate the source and flag
        img.alt = `${location.flag} Flag`; // add alt text for accessibility

        // Add "p" HTML tag for the description
        const description = document.createElement("p");
        description.textContent = location.description; // extract the description

        // Add "p" HTML tag for the greeting
        const greeting = document.createElement("p");
        greeting.textContent = location.greeting;  // extract the greeting

        // Append img and p HTML tags to the grid item DIV
        gridItem.appendChild(img);
        gridItem.appendChild(description);
        gridItem.appendChild(greeting);

        // Append the grid item DIV to the container DIV
        container.appendChild(gridItem);
    }
</script>
