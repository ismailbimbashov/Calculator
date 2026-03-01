/**
 * keyboard.js
 *
 * Keyboard input handling
 * ----------------------
 * - Listens for keydown events
 * - Routes numeric, operator, and special keys to display functions
 * - Integrates with calculateResult, clearDisplay, deleteLastCharacter
 * - Enables keyboard control for the calculator
 */

import {
  appendToDisplay,
  calculateResult,
  deleteLastCharacter,
  clearDisplay,
} from "./display.js";

export function initKeyboardControls() {
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
      appendToDisplay(key);
    } else if (key === "Enter") {
      calculateResult();
    } else if (key === "Backspace") {
      deleteLastCharacter();
    } else if (key === "Escape") {
      clearDisplay();
    }
  });
}
