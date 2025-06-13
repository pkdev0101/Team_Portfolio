---
toc: False
layout: post
data: web-dev
title: Projects- Snake Game & Cookie Clicker
description: Hands-on projects editing and enhancing classic games like Snake and Cookie Clicker to practice JavaScript, DOM manipulation, and game logic.
categories: ['Web Development', 'Projects']
permalink: /web-dev/projects
breadcrumb: True
---

For the Snake game project, look in the `hacks` directory and find the file named `snake.md`.

In that file, you'll find detailed instructions and explanations on how to edit and customize the Snake game. Here are some specific things you can try editing, with examples to get you started:

- **Change the color of the snake:**  
  Look for the CSS or JavaScript code that sets the snake’s color and modify it to your favorite color.

- **Adjust the snake’s speed:**  
  Find where the game loop uses `setInterval` or similar timing functions and change the interval duration to speed up or slow down the snake.

- **Modify the game board size:**  
  Change the number of grid cells or the pixel size of the board to make the playing area larger or smaller.

- **Change how the snake grows:**  
  Edit the logic that increases the snake’s length when it eats food to experiment with different growth rates.

- **Add a score display:**  
  Implement a simple counter on the page that updates every time the snake eats food.

- **Add pause and resume functionality:**  
  Use keyboard events to pause and resume the game loop.

Feel free to explore the code, try these examples, and add your own creative twists to the game!

# Editing the Snake Game

The Snake game code lives in this file, including the HTML, CSS styles, and JavaScript all together.

## Customization Options

### 1. Change the color of the snake and food
```js
let activeDot = function(x, y){
    ctx.fillStyle = "#FFFFFF";  // <-- Change this color (both snake and food)
    ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
```
Change #FFFFFF to any other color (e.g., "red", "#00FF00", "orange").

### 2. Change the background color
```js
ctx.fillStyle = "royalblue";  // <-- Game area background
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

### 3. Change border colors for wall setting
```js
let setWall = function(wall_value){
    wall = wall_value;
    if(wall === 0){screen_snake.style.borderColor = "#606060";}  // Wall off
    if(wall === 1){screen_snake.style.borderColor = "#FFFFFF";}  // Wall on
}
```

### 4. Adjust snake speed

```js
let setSnakeSpeed = function(speed_value){
    snake_speed = speed_value;  // Values: 120, 75, 35 (ms delay)
}
```
### 5. Customize game board size
```js
<canvas id="snake" width="320" height="320"></canvas>
```

### 6. Change snake block size
``` js
const BLOCK = 10;  // Size of each snake segment
```

