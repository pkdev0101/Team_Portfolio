---
toc: False
layout: tailwindPost
infoGraph: datastore_infograph
title: Data Storage Foundations
description: In this guide, you'll learn about why data storage is used and what you can do to store data in your own projects!
categories: ['GitHub Pages']
permalink: /web-dev/data-storage
type: ccc
---

# Data Storage Foundations

## Overview

In this session, you will:
- Understand why **data storage** is essential in web applications
- Explore common database types
- Use Flask and Spring to connect and interact with a database
- Learn the basics of data persistence and retrieval
- Deploy simple backend apps that store and retrieve information

At the conclusion of this session, you will have the foundations to begin:
- Python API Development using Flask
- Java API Development using Spring

---

## Why Data Storage?

Web apps need to **remember things** — user input, scores, blog posts, etc.  
This memory is managed using databases.

### Data Storage Is Needed For:
- Saving form data or login info
- Storing game progress or scores
- Building blogs, dashboards, or user profiles
- Creating APIs that serve real-time data

### Common Storage Applications:
- **Relational Databases** like SQLite and PostgreSQL
- **NoSQL Databases** like MongoDB
- **Flat Files** for small, static data

Flask and Spring are **backend frameworks** that help your app interact with these storage systems — they’re not databases themselves.

{%- include tailwind/infograph.html -%}

Click a card above to dive deeper into each setup and complete your storage foundation.

---

## Step 3: Deployment Considerations

Deployment is typically undertaken once your database schema and frontend pages are synced effectively (after extensive testing). Deployment helps anyone on the internet access your project, since your local code is only present on your device. 

When deploying, keep in mind:
- **Local files/databases may not persist** on cloud platforms
- Secure your database credentials with environment variables
- Test your endpoints using tools like Postman or the browser

---

## What’s Next?

Once you've completed your storage setup:
- Start building a website and use a backend to store data (like users, comments, or posts for a social media site)
- Begin developing your own APIs in Python or Java
- Connect your frontend to live data using `fetch`

> These storage foundations will help you effectively manage data in your future projects!
