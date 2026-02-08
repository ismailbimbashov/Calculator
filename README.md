# 🧮 Modular Calculator App

A clean, modular, and fully functional JavaScript calculator with persistent history. Built using vanilla JavaScript, HTML, and CSS, following best practices for modular architecture and maintainability.

---

## 🔹 Table of Contents
* [Demo](#-demo)
* [Features](#-features)
* [Folder Structure](#-folder-structure)
* [Technologies Used](#-technologies-used)
* [Installation](#-installation)
* [Usage](#-usage)
* [Project Architecture](#-project-architecture)
* [Future Enhancements](#-future-enhancements)
* [License](#-license)

---

## 🌟 Demo
Interactive calculator with real-time calculation, keyboard support, and persistent calculation history.

![Project Preview](CSS/PIC/11985283.png)

---

## ✅ Features
* **Arithmetic:** Basic operations (addition, subtraction, multiplication, division).
* **Keyboard Support:** Full mapping for numbers, operators, `Enter`, `Backspace`, and `Escape`.
* **Persistent History:** Data is saved in `localStorage`, so your history survives page refreshes.
* **History Management:** Edit, save, and delete specific history entries.
* **Totalizer:** Built-in "Total Spent" calculation from history items.
* **Modern JS:** Clean architecture using ES6 Modules.


## 🛠 Technologies Used
* **HTML5** – Structure & UI
* **CSS3** – Styling & Layout
* **JavaScript (ES6 Modules)** – Logic & modular architecture
* **LocalStorage** – Persistent storage for history

---
  
## ⚙️ Installation
**1. Clone this repository:**
   git clone [https://github.com/yourusername/modular-calculator.git](https://github.com/yourusername/modular-calculator.git)
   
**2. Open the project folder:**
cd modular-calculator
Start a local server (Recommended): Since this project uses ES Modules, a local server is required.

**3. Using VS Code Live Server extension, or using Python:**
python -m http.server

**4. Open your browser and navigate to: http://localhost:8000**

---
## 🚀 Usage
**1. Calculate:**
Click numbers and operators on the UI to perform calculations

**2. Result:**
Press **Enter** on your keyboard or the `=` button to calculate the result

**3. Correct:**
Press **Backspace** to delete the last character or **Escape** to clear the display

**4. Edit History:**
Click directly on any history item in the list to modify it and click Save

**5. Manage Records:**
Delete individual items or clear the entire history using the provided action buttons

---

## 🏗 Project Architecture
The project uses a modular approach with ES Modules to ensure a clear separation of concerns:

* **main.js**
App bootstrapper and shared state management

* **display.js**
Calculator display logic and result calculation

* **history.js**
History UI management (edit, save, delete)

* **storage.js**
Persistence logic with localStorage

* **keyboard.js**
Physical keyboard input handling

---

## 🔮 Future Enhancements
**1. Security**
Replace eval() with a safer, custom math parser

**2. Math Features**
Add advanced operations (Percentage, Exponent, Parentheses)

**3. Customization**
Implement Theming (Dark/Light mode)

**4. Portability**
Export history as CSV or JSON

---

## 📄 License
**MIT License**
This project is licensed under the MIT License – see the LICENSE file for details
