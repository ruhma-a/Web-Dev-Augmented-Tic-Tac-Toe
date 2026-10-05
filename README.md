# ✨ Relax with Tic Tac Toe ✨

**🎮 Play the live game here: https://ruhma-a.github.io/Web-Dev-Augmented-Tic-Tac-Toe/**

Created for **Assignment 3** of my Web Development course, this is a cozy, cottagecore-inspired take on the classic React Tic-Tac-Toe tutorial. This project transforms a basic grid into a whimsical, digital scrapbook page complete with a dotted-grid background, floral imagery, typewriter fonts, and relaxing background sounds. 

## 🌿 Features & Augmentations

Beyond the standard Tic-Tac-Toe logic, this assignment includes several core React upgrades:
* **Dynamic Board:** The 3x3 grid is built using nested `for` loops rather than hardcoding all 9 squares.
* **Move Coordinates:** The history list tracks and displays the exact location of every move in a `(row, col)` format.
* **Smart History:** The current turn is displayed as plain text ("You are at move #...") instead of a clickable button.
* **Sorting Toggle:** A button that lets you flip the history list between ascending and descending order.
* **Win/Draw Detection:** If a player wins, the three winning squares are highlighted in a deeper purple. If the board fills up with no winner, the game accurately declares a "Draw!".
* **Immutability:** The code safely uses `.slice()` and the spread operator (`...`) to copy arrays, preserving the game's history without mutating existing data.

## 🍂 Aesthetics

This project deliberately steps away from the "sleek corporate tech" look. It features:
* A soft, earthy palette of muted lilacs, dusty purples, and parchment beige.
* Asymmetrical, "taped-on" photos in the sidebars to create a personal, DIY scrapbook feel.
* An embedded relaxing audio player.
* A mix of classic serif and typewriter fonts.

## 🛠️ How to Run & Deploy

This project was bootstrapped with Create React App and is set up to deploy directly to GitHub Pages.

**To view the project locally:**
1. Open your terminal.
2. Run `npm start` to launch the game in your browser.

**To push updates to the live site:**
1. Save your changes in `App.js` or `styles.css`.
2. Open your terminal.
3. Run `npm run deploy`. 
4. Wait a minute or two, then refresh your live GitHub Pages link to see the updates!
