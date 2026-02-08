/**
 * display.js
 *
 * Calculator logic / display handling
 * -----------------------------------
 * - Handles updating the calculator display (numbers, operators)
 * - Deletes the last character / clears the display
 * - Evaluates expressions and adds results to history
 * - Integrates with history and persistence modules
 */

import {
  historyList,
  totalSpentElement,
  getTotalSpent,
  setTotalSpent,
} from "../main.js";
import { createHistoryItem } from "./history.js";
import { updateLocalStorage } from "./storage.js";

/** Only allow digits, one decimal point, and operators for safe evaluation */
const SAFE_EXPRESSION = /^[\d+\-*/.x\s()]+$/;

function safeEvaluate(expression) {
  const trimmed = expression.replace(/\s/g, "").replace(/x/g, "*");
  if (!trimmed || !SAFE_EXPRESSION.test(trimmed)) return NaN;
  try {
    return Function(`"use strict"; return (${trimmed})`)();
  } catch {
    return NaN;
  }
}

export function appendToDisplay(value) {
  const display = document.getElementById("display");
  const currentDisplay = display.value;

  if (value === "*") value = "x";

  if (
    isOperator(currentDisplay[currentDisplay.length - 1]) &&
    isOperator(value)
  ) {
    display.value = currentDisplay.slice(0, -1) + value;
  } else {
    display.value += value;
  }
}

export function isOperator(char) {
  return ["+", "-", "x", "/"].includes(char);
}

export function deleteLastCharacter() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

export function clearDisplay() {
  document.getElementById("display").value = "";
}

export function calculateResult() {
  const display = document.getElementById("display");
  const displayValue = display.value.trim();
  if (!displayValue) return;

  const result = safeEvaluate(displayValue);
  if (typeof result !== "number" || !Number.isFinite(result)) {
    display.value = "Error";
    return;
  }

  const rounded = parseFloat(result.toFixed(2));
  display.value = rounded;
  setTimeout(() => (display.value = ""), 1000);

  const listItem = createHistoryItem(
    displayValue.replace(/\*/g, "x"),
    rounded.toFixed(2),
    "",
  );
  historyList.appendChild(listItem);

  const newTotal = getTotalSpent() + rounded;
  setTotalSpent(newTotal);
  totalSpentElement.textContent = newTotal.toFixed(2);

  updateLocalStorage();
}
