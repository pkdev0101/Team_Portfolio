---
toc: True
layout: post
data: web-dev
title: Data Retrieval Foundations
description: Discover how full-stack applications deliver live data to users by connecting frontend interfaces with backend servers and databases. Learn to build dynamic web pages that fetch and display real information in real time.
categories: ['GitHub Pages']
permalink: /web-dev/data-retrieval
breadcrumb: True
---

## Overview

In this tutorial, you’ll learn how the **frontend** and **backend** of a website work together to retrieve, display, and interact with data. This is the foundation of **full-stack development**.

By the end, you will:
- Understand how frontends request data from a backend
- Build a basic API route to send and receive data
- Connect your JavaScript frontend to Flask or Spring backend
- Display live data on a webpage

---

## What Is Full Stack?

A **full stack** app includes:
- **Frontend**: What users see (HTML/CSS/JavaScript)
- **Backend**: Logic and data management (Flask or Spring)
- **Database**: Where the data lives (e.g., SQLite, PostgreSQL)

These parts communicate using **HTTP requests** (e.g., `GET`, `POST`) via **APIs**.

---

## Step 1: Create a Data Endpoint

Use your backend (Flask or Spring) to expose data through an API.

### Flask Example (`/api/data`):
```python
@app.route('/api/data')
def get_data():
    return jsonify({"name": "Alex", "score": 42})
```

### Spring Example:
```java
@RestController
public class DataController {
  @GetMapping("/api/data")
  public Map<String, Object> getData() {
    return Map.of("name", "Alex", "score", 42);
  }
}
```

## Step 2: Fetch Data with JavaScript
In your HTML file, add a `<script>` tag to retrieve and display the data:
```html
<script>
  fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      document.getElementById('output').textContent = 
        `Name: ${data.name}, Score: ${data.score}`;
    });
</script>

<div id="output"></div>
```

## Step 3: Run and View Locally

- Make sure your backend server is running
- Open your HTML page in the browser
- You should see live data populated from the backend

> This is full-stack in action: data retrieved by the backend is shown through the frontend.

## Step 4: Build On It

Now that you're retrieving data:
- Build a form that saves data to the backend
- Add a leaderboard or profile dashboard
- Use buttons or dropdowns to query and filter data
- Secure routes using authentication later on

## Step 5: Deployment Tips

When deploying:

- Host your frontend and backend together (or connect across domains)
- Make sure API URLs are correct (e.g., `/api/data`)
- Test both local and production behavior with tools like Postman

## Summary

Data retrieval is the bridge between user interfaces and databases.

You now know how to:

- Build backend API routes
- Connect your frontend using fetch()
- Display data dynamically on your site

> Next: use this foundation to build interactive dashboards, user profiles, or game scoreboards!