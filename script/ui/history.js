/**
 * history.js
 *
 * History UI management
 * --------------------
 * - Creates history items (DOM elements)
 * - Handles editing, saving, and deleting history entries
 * - Updates total spent when history changes
 * - Works with storage.js to persist changes
 */

import {
  historyList,
  totalSpentElement,
  getTotalSpent,
  setTotalSpent,
} from "../main.js";
import { updateLocalStorage } from "./storage.js";

function escapeHtml(str) {
  if (str == null) return "";
  const s = String(str);
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function createHistoryItem(expression, result, text) {
  const listItem = document.createElement("li");
  const e = escapeHtml(expression);
  const r = escapeHtml(result);
  const t = escapeHtml(text || "");
  listItem.innerHTML = `
    <input class="history-input" value="${e}" readonly>
     <input class="history-text" value="${t}" readonly>
    = <span class="history-result" data-result="${r}">${r}</span>
    <button type="button" class="edit-button" aria-label="Edit">✏️</button>
    <button type="button" class="save-button" style="display: none;" aria-label="Save">💾</button>
    <button type="button" class="delete-button" aria-label="Delete">🗑️</button>
  `;

  // Hook up events (no inline onclick in modules)
  listItem
    .querySelector(".edit-button")
    .addEventListener("click", () => editHistoryItem(listItem));

  listItem
    .querySelector(".save-button")
    .addEventListener("click", () => saveHistoryItem(listItem));

  listItem
    .querySelector(".delete-button")
    .addEventListener("click", () => deleteHistoryItem(listItem));

  return listItem;
}

function editHistoryItem(listItem) {
  const inputExpression = listItem.querySelector(".history-input");
  const inputText = listItem.querySelector(".history-text");
  const saveButton = listItem.querySelector(".save-button");
  const editButton = listItem.querySelector(".edit-button");

  saveButton.style.display = "block";
  editButton.style.display = "none";

  inputExpression.removeAttribute("readonly");
  inputText.removeAttribute("readonly");
  inputExpression.focus();
}

function saveHistoryItem(listItem) {
  const inputExpression = listItem.querySelector(".history-input");
  const inputText = listItem.querySelector(".history-text");
  const saveButton = listItem.querySelector(".save-button");
  const editButton = listItem.querySelector(".edit-button");
  const resultElement = listItem.querySelector(".history-result");

  const previousResult = parseFloat(resultElement.dataset.result);

  saveButton.style.display = "none";
  editButton.style.display = "block";

  inputExpression.setAttribute("readonly", "readonly");
  inputText.setAttribute("readonly", "readonly");

  const expression = inputExpression.value.replace(/x/g, "*").trim();
  const safeExpr = /^[\d+\-*/.x\s()]+$/;
  if (!safeExpr.test(expression)) {
    alert("Invalid expression");
    return;
  }
  try {
    const result = Function(`"use strict"; return (${expression})`)();
    const rounded = parseFloat(Number(result).toFixed(2));
    if (!Number.isFinite(rounded)) throw new Error("Invalid");

    resultElement.textContent = rounded;
    resultElement.dataset.result = rounded;

    const newTotal = getTotalSpent() - previousResult + rounded;
    setTotalSpent(newTotal);
    totalSpentElement.textContent = newTotal.toFixed(2);

    updateLocalStorage();
  } catch {
    alert("Invalid expression");
  }
}

function deleteHistoryItem(listItem) {
  const result = parseFloat(
    listItem.querySelector(".history-result").textContent,
  );

  historyList.removeChild(listItem);

  const newTotal = getTotalSpent() - result;
  setTotalSpent(newTotal);
  totalSpentElement.textContent = newTotal.toFixed(2);

  updateLocalStorage();
}

export function clearHistory() {
  historyList.innerHTML = "";
  setTotalSpent(0);
  totalSpentElement.textContent = "0.00";
  localStorage.removeItem("calculationHistory");
}
