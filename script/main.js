/**
 * main.js
 *
 * App bootstrapper / entry point
 * -------------------------------
 * - Initializes the app on page load
 * - Exposes shared state (historyList, totalSpentElement)
 * - Provides getter/setter for totalSpent
 * - Loads saved history from localStorage
 * - Activates keyboard controls
 */

import { loadHistory } from "./ui/storage.js";
import { initKeyboardControls } from "./ui/keyboard.js";
import {
  appendToDisplay,
  clearDisplay,
  calculateResult,
  deleteLastCharacter,
} from "./ui/display.js";
import { clearHistory } from "./ui/history.js";

// ===== DOM References =====
export const historyList = document.getElementById("history-list");
export const totalSpentElement = document.getElementById("total-spent");

// ===== App State =====
let totalSpent = 0;

// ===== State Helpers =====
export function getTotalSpent() {
  return totalSpent;
}

export function setTotalSpent(value) {
  totalSpent = value;
}

// ===== Button click handling (works for mouse + touch) =====
function setupButtonListeners() {
  const calculator = document.querySelector(".calculator");
  if (!calculator) return;

  calculator.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const action = button.getAttribute("data-action");
    if (!action) return;

    switch (action) {
      case "append": {
        const value = button.getAttribute("data-value");
        if (value != null) appendToDisplay(value);
        break;
      }
      case "clear":
        clearDisplay();
        break;
      case "equals":
        calculateResult();
        break;
      case "backspace":
        deleteLastCharacter();
        break;
      case "clear-history":
        clearHistory();
        break;
    }
  });
}

// ===== App Initialization =====
function initApp() {
  loadHistory();
  initKeyboardControls();
  setupButtonListeners();
}

initApp();
