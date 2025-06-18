---
toc: False
layout: post
title: Python + Flask Setup Guide
description: This guide will walk you through setting up a Flask project with local database integration.
categories: ['GitHub Pages']
permalink: /web-dev/data-storage/python-flask
type: ccc
breadcrumb: True
---

## 1. Clone the Starter Repository

Use the template below:

🔗 [Flask Template Repository](https://github.com/Open-Coding-Society/flask)

```bash
git clone https://github.com/Open-Coding-Society/flask.git
cd flask
pip install -r requirements.txt
python app.py
```

## 2. Explore the Code

- `app.py`: main Flask app
- `templates/`: HTML templates using Jinja
- `static/`: CSS and assets
- `db/`: SQLite database (or configure another)

## 3. Customize Your Project

- Add fields and forms to the HTML templates
- Use `request.form` to capture user input
- Store data in SQLite with raw SQL or SQLAlchemy

## 4. Test Locally

- Visit `http://localhost:<portnumber>` in your browser.
- Use tools like Postman to test routes (e.g., POST/GET).

## 5. Next Steps

- Add more routes (e.g., /messages, /profile)
- Create a frontend dashboard
- Prepare for deployment with cloud DBs