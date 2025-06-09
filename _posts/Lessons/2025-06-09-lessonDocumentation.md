---
layout: lesson 
show_reading_time: true
permalink: /lessoncreation
title: How to Create a Lesson
video_url: "https://www.youtube.com/watch?v=4nE7MBTV7nQ"
flashcards: lesson_flashcard
categories: ['Lesson']
author: Mihir Bapat, Kiruthic Selvakumar, Shawn Ray
---

<div id="lesson-content">

  {% include video.html %}

  <p>This guide walks you through how to design, build, and deploy an interactive coding lesson using <code>lesson.html</code> and <code>cover.html</code>. These layout templates are part of a modular system that makes it easy for teachers to assemble consistent, polished, and engaging lessons. The system supports multimedia, code execution, student input, live feedback, and collaborative tools.</p>

  <br>

  <p>🔗 <strong>Sample Lesson:</strong> Want to see what a final lesson looks like? <a href="{{ site.baseurl }}/loopslesson" style="color: #4f9ef8; text-decoration: underline;">View a live example here</a>.</p>

  <hr>

  <h2>📁 Step 1: Understand the Purpose of Each File</h2>

  <h3>🧩 <code>lesson.html</code> (Base Layout)</h3>
  <p>This is the <strong>core layout</strong> used by all coding lessons. It defines the structure and style and includes embedded functionality such as localStorage, animations, and in-browser code execution. Think of this as the underlying skeleton.</p>

  <blockquote>✅ You <strong>do not</strong> need to modify this file. It automatically wraps your lesson content.</blockquote>

  <ul>
    <li>Stylish code formatting and dark theme styling</li>
    <li>Popcorn Hack support for both JavaScript and Python</li>
    <li>Feedback poll integration for student input</li>
    <li>Smooth section animations</li>
    <li>Automatic saving of responses via local storage</li>
  </ul>

  <h3>🧪 <code>function.html</code> (Lesson Template)</h3>
  <p>This file demonstrates how to use the <code>function.html</code> base layout and inject lesson-specific content. It contains the content area, lesson instructions, and references to interactive components. Put this file inside the <code>lessons</code> inside the navigation directory.</p>
  <p>At the top is a YAML frontmatter block that sets the lesson metadata:</p>

  <pre><code>layout: lesson
title: Introduction to Functions
video_url: https://youtube.com/yourvideo
hack_prompt: Write a function that adds two numbers.
permalink: /functions
flashcard: functions_flashcard
game: functions_game
category: ['Lesson']
</code></pre>

  <p>You’ll customize this file every time you create a new lesson.</p>

  <hr>

  <h2>🛠️ Step 2: Create a New Lesson File</h2>

  <ol>
    <li><strong>Duplicate <code>cover.html</code></strong><br>
      Rename it based on your lesson topic: <code>loops.html</code>, <code>arrays.html</code>, etc.
    </li>
    <li><strong>Edit the Frontmatter</strong><br>
      Update:
      <ul>
        <li><code>title</code>: Displayed at the top of the lesson</li>
        <li><code>video_url</code>: YouTube video to support the topic</li>
        <li><code>hack_prompt</code>: Coding challenge or discussion question</li>
        <li><code>permalink</code>: The URL path for the lesson</li>
      </ul>
    </li>
    <li><strong>Write Your Lesson Content</strong><br>
      Inside <code>&lt;div id="lesson-content"&gt;</code>, add your instructions, code snippets, visuals, and explanations.
    </li>
  </ol>

  <pre><code>&lt;div id="lesson-content"&gt;
  &lt;h2&gt;What is a Loop?&lt;/h2&gt;
  &lt;p&gt;Loops let you run the same block of code multiple times.&lt;/p&gt;
  &lt;pre&gt;&lt;code&gt;for (let i = 0; i &lt; 5; i++) {
    console.log(i);
  }&lt;/code&gt;&lt;/pre&gt;
&lt;/div&gt;
</code></pre>

  <hr>

  <img src="{{site.baseurl}}/images/featureflowchart.jpeg" alt="Feature Flowchart">

  <h2>🧩 Step 3: Add Interactive Components</h2>
  <p>Pick the features that fit your lesson. All components are modular and easy to include:</p>

  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>Include Syntax</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>📺 Video Player</td><td><code>include video.html</code></td><td>Shows a YouTube video defined in frontmatter</td></tr>
      <tr><td>✍️ Whiteboard Viewer</td><td><code>include whiteboard.html</code></td><td>Lets students see a live whiteboard via board code</td></tr>
      <tr><td>🤖 AI Quiz Tool</td><td><code>include ai_comprehension.html</code></td><td>Students can generate practice questions using AI</td></tr>
      <tr><td>💻 Code Prompt</td><td><code>include hack.html</code></td><td>Lets students type, run, and save code responses</td></tr>
      <tr><td>🃏 Flashcards</td><td><code>include flashcards.html</code></td><td>Pulls cards from YAML, allows flipping, review, tracking</td></tr>
      <tr><td>📝 Student Notes</td><td><code>include flashcard-notes.html</code></td><td>Students build and review their own flashcards</td></tr>
      <tr><td>🎮 Quiz Game</td><td><code>include game.html</code></td><td>Multiplayer quiz game with leaderboard and timers</td></tr>
      <tr><td>👍 Poll</td><td><code>include poll.html</code></td><td>Students rate the lesson and add comments</td></tr>
      <tr><td>🧠 Sidebar</td><td><code>include slim_sidebar.html</code></td><td>Tools: dictionary, notes, read-aloud, highlights</td></tr>
    </tbody>
  </table>

  <hr>

  <h2>🔍 Step 4: Check and Deploy</h2>

  <ol>
    <li>✅ <strong>Verify Includes Exist</strong><br>If you added <code>include game.html</code>, make sure that file exists in your project.</li>
    <li>🧪 <strong>Test the Page</strong><br>Open the file in a local preview environment. Interact with every component:
      <ul>
        <li>Click through flashcards</li>
        <li>Enter and run code</li>
        <li>Submit the poll</li>
        <li>Try the AI comprehension checker</li>
      </ul>
    </li>
    <li>🚀 <strong>Deploy It</strong><br>Once everything works, publish it to your lesson site or LMS.</li>
  </ol>

  <hr>

  <h2>👩‍🏫 Best Practices for Teachers</h2>
  <ul>
    <li><strong>Keep Each Lesson Focused:</strong> Target one concept per lesson (e.g., “while loops” or “if statements”).</li>
    <li><strong>Use Visuals Early:</strong> Embed videos or show a whiteboard before diving into code.</li>
    <li><strong>Prompt Reflection:</strong> Include polls, notes, or AI questions to get students thinking.</li>
    <li><strong>Encourage Review:</strong> Use flashcards at the end to reinforce terminology.</li>
    <li><strong>Save Time with Reusables:</strong> Once you build a tool like <code>whiteboard.html</code>, you can reuse it in all lessons.</li>
  </ul>

  <hr>

  <h2>✅ Summary Checklist</h2>
  <ul>
    <li>[ ] Duplicate <code>cover.html</code></li>
    <li>[ ] Fill in frontmatter (title, video, prompt, permalink)</li>
    <li>[ ] Add content inside <code>lesson-content</code></li>
    <li>[ ] Choose and insert interactive components</li>
    <li>[ ] Confirm <code>include</code> files exist</li>
    <li>[ ] Preview and test locally</li>
    <li>[ ] Deploy when everything is working</li>
  </ul>

  <p>With this layout system, you can build high-quality, interactive lessons that are modular, student-friendly, and easy to maintain. Whether you're teaching loops, functions, or arrays, these templates give you a powerful way to bring your content to life.</p>

  <hr>

  <h2>🔮 Future Vision</h2>
  <p>This layout system is already modular and easy to deploy, but it can evolve into a full-fledged interactive learning platform with deeper integration of backend and analytics.</p>

  <h3>Goals for Expansion</h3>

  <h4>1. User Accounts</h4>
  <ul>
    <li>Add student and teacher login via a Flask backend</li>
    <li>Use sessions or JWT for secure access control</li>
  </ul>

  <h4>2. Data Storage & Progress Tracking</h4>
  <ul>
    <li>Migrate all localStorage-based components (code input, flashcards, highlights, quiz answers) to a database (PostgreSQL or MongoDB)</li>
    <li>Track individual student progress, AI quiz performance, and code history</li>
  </ul>

  <h4>3. Gamification</h4>
  <ul>
    <li>Teachers can award tokens, badges, or achievements stored in a user profile</li>
    <li>Completion of tasks like flashcards or code prompts could unlock new content or feedback</li>
  </ul>

  <h4>4. Teacher Dashboard</h4>
  <ul>
    <li>View all student progress in one place</li>
    <li>Set deadlines, unlock features per student/class</li>
    <li>Review code submissions, flashcards created, and quiz attempts</li>
  </ul>

  <h4>5. Shared Libraries</h4>
  <ul>
    <li>Enable students to share flashcard decks</li>
    <li>Create a gallery of teacher-curated lessons with import options</li>
  </ul>

  <h3>Long-Term Vision</h3>
  <p>By layering backend support and real-time analytics on top of the existing modular system, this framework could become a lightweight LMS that is:</p>
  <ul>
    <li>Interactive and student-friendly</li>
    <li>Data-rich for teachers</li>
    <li>Easy to maintain and extend for developers</li>
  </ul>

  {% include flashcards.html %}
  <p>🃏 Use these flashcards to review each interactive component: what it does, where it goes, and when to use it in a lesson.</p>

  {% include flashcard-notes.html %}
  <p>📝 You can also add your own flashcards about additional features or customization ideas as you experiment with the layout system.</p>

  <h2>Extra Practice</h2>

  {% include ai_comprehension.html %}

</div>

