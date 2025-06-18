---
toc: False
layout: post
infoGraph: datastore_infograph
title: Full Stack Introduction to Models + API 
description: In this guide, you'll learn a brief introduction to models + api and how they are involved in full stack development. 
categories: ['GitHub Pages']
permalink: /web-dev/data-storage
type: ccc
breadcrumb: True
---

# What Does Full Stack Mean?

Before we get into starting our planning, what does building a full stack application entail?

When we talk about **“full stack”** in web development, we’re referring to the **entire set of skills and technologies** needed to build a complete web application. Think of it like making a sandwich:

---

## 🥪 Front-End (The Top Slice of Bread)

* This is what users **see and interact with**.
* It includes the **buttons, forms, and visual elements**.
* Nighthawk coders use tools like **HTML**, **SASS**, and **JavaScript** to create this.

---

## 🥩 Back-End (The Filling)

* This is the **logic that happens behind the scenes**.
* It handles **data processing** and the **operations of each request and response**.
* The back-end communicates with the front-end and manages things like **storing user data** or **checking for errors**.
* Nighthawk coders use the **Python language** and **Flask framework** for this layer.

---

## 🍞 Database (The Bottom Slice of Bread)

* This is where all the information is **stored**, such as user accounts, messages, or product details.
* Databases help **organize and track data**.
* Nighthawk coders use **SQLAlchemy** and **SQLite** to build and manage the database.

---

## 📦 Deployment and DevOps (Putting the Sandwich in a Bag)

* Once your sandwich (web app) is ready, you need to **put it in a bag (deploy it)** so people can enjoy it.
* This involves **setting up servers**, ensuring the app runs smoothly, and **updating it as needed**.
* The **Deployment** tab in the navigation bar will help with back-end deployment.
* For front-end deployment, check out **Tools and Equipment** and **GitHub**.

---

 So, building a full stack application means creating all parts of the “sandwich” so that it’s tasty and functional from top to bottom. You design the **user interface**, handle the **logic and data storage**, and make sure everything **works together smoothly**.

**Login**
After signing up to create an account, you can login. When you log in, you’ll be connected to both the Java (Spring) and Python (Flask) parts of the site. 

**Diagram**

<img width="1223" alt="Image" src="https://github.com/user-attachments/assets/b580fc8b-9349-4ccf-b009-37bff2d54741" />

<img width="581" alt="Image" src="https://github.com/user-attachments/assets/f5656764-c427-48fc-9dde-6f53aff1f837" />


# 🌱 Spring (Java)

## ✅ Model

* Represents **data** and **business logic**
* Typically Java classes (entities) mapped to DB tables using annotations like `@Entity`
* Contains fields, getters/setters

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;

    // getters and setters
}
```

---

## ✅ API

* Defines HTTP endpoints using **controllers**
* Uses annotations like `@RestController`, `@RequestMapping`, `@GetMapping`, `@PostMapping`

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public List<User> getAllUsers() {
        // return list of users
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        // create and return user
    }
}
```

---

# 🐍 Flask (Python)

## ✅ Model

* Python class mapped to DB table (usually using SQLAlchemy)

```python
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
```

---

## ✅ API

* Defines HTTP endpoints using route decorators

```python
from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/api/users', methods=['GET'])
def get_all_users():
    return jsonify([])

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    return jsonify(data), 201
```

---

# 🔑 Comparison

| Concept       | Spring (Java)                             | Flask (Python)                   |
| ------------- | ----------------------------------------- | -------------------------------- |
| **Model**     | Java class + JPA annotations (`@Entity`)  | Python class + SQLAlchemy fields |
| **API**       | `@RestController`, `@RequestMapping` etc. | `@app.route` decorators          |
| **ORM**       | Hibernate / JPA                           | SQLAlchemy                       |
| **Structure** | Layered (controller, service, repo)       | Minimal, flexible                |

---


## ℹ️ For More Information

* Flask: [https://pages.opencodingsociety.com/flask-intro](https://pages.opencodingsociety.com/flask-intro)
* Spring: [https://nighthawkcoders.github.io/portfolio\_2025/fullstack/java/intro](https://nighthawkcoders.github.io/portfolio_2025/fullstack/java/intro)
