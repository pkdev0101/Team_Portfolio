---
toc: False
layout: post
title: Java + Spring Boot Setup Guide
description: Learn how to build a backend using Spring Boot with simple database integration.
categories: ['GitHub Pages']
permalink: /web-dev/data-storage/java-spring
type: ccc
breadcrumb: True
---

## 1. Clone the Starter Repository

🔗 [Spring Template Repository](https://github.com/Open-Coding-Society/spring)

```bash
git clone https://github.com/Open-Coding-Society/spring.git
cd spring
./mvnw spring-boot:run
```

## 2. Explore the Codebase

- `Application.java`: app entry point
- `models/`: Java classes for your data
- `controllers/`: handle HTTP routes
- `resources/application.properties`: DB configuration

### 3. Database Options

- Use H2 (in-memory DB) for quick setup
- Switch to PostgreSQL for production

Example H2 config:

```bash
spring.datasource.url=jdbc:h2:mem:testdb
spring.jpa.hibernate.ddl-auto=update
```

## 4. Test Locally

App runs at `http://localhost:8080`.
Test endpoints using Postman or a frontend.

## 5. Next Steps

- Add RESTful endpoints
- Connect to a cloud-hosted PostgreSQL DB
- Deploy to platforms like Heroku, Render, or AWS
- Add the .env (if needed)
  
---

## 🗂️ What Is a `.env` File?

A `.env` file (short for "environment") is a plain text file used to store **environment variables**—settings your app needs to run, like passwords, API keys, and config flags.

### ✅ It's used to

- Hide **private info** from your source code
- Customize **behavior** based on the environment (dev, test, prod)
- Make your codebase **easier to manage and share**

---

## 🔐 What Goes in a `.env` File?

Only things that are:

- **Configurable** (can change based on environment)
- **Sensitive** (should be kept secret)
- **Not part of your source code logic**

### Examples

```shell
# Database credentials
DB_USER=admin
DB_PASSWORD=mysecurepassword

# API keys
STRIPE_API_KEY=pk_live_123456

# Flags and settings
DEBUG=True
ENV=development
```

### 🚫 What Shouldn't Go in a .env File?

Avoid putting:

- Code or functions
- Static content (like text strings or styles)
- Information that’s already public or safe to expose

## 🚫 Why You Should Avoid Global Variables for Secrets

### 🤔 What Is a Global Variable?

A **global variable** is defined outside of any function or class and can be accessed anywhere in your code.

### ❌ Example of Bad Practice

```shell
# BAD PRACTICE: hardcoding secrets in global variables
API_KEY = "sk_live_123456"
```

| Problem                  | Why It’s Bad                                                           |
| ------------------------ | ---------------------------------------------------------------------- |
| 🔓 **Security Risk**     | Secrets are visible if your code is shared or uploaded (e.g., GitHub). |
| 📦 **Hard to Change**    | You have to manually change code to switch environments.               |
| 🧪 **Not Test-Friendly** | Testing requires changing code instead of settings.                    |
| 🔁 **Inflexible**        | Makes it hard to reuse or deploy across different platforms.           |

### ✅ Why Use a `.env` File Instead?

- 🗃️ **Keeps sensitive data outside your code**  
  Secrets like API keys, passwords, and tokens aren’t exposed in your source files.

- ⚙️ **Lets you easily change configs without rewriting your app**  
  You can switch between development, testing, and production settings just by editing the `.env` file.

- ☁️ **Works well with tools like Git, Heroku, Vercel, etc.**  
  Most deployment platforms support environment variables natively.

- 🧼 **Makes your app cleaner, safer, and more professional**  
  Your code stays organized, secure, and easier to maintain.
