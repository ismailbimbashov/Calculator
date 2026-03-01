/**
 * storage.js
 *
 * Persistence / localStorage management
 * -------------------------------------
 * - Loads history from localStorage on app start
 * - Updates localStorage whenever history changes
 * - Keeps totalSpent in sync with stored data
 */

import { historyList, totalSpentElement, setTotalSpent } from "../main.js";
import { createHistoryItem } from "./history.js";

export function loadHistory() {
  const savedHistory =
    JSON.parse(localStorage.getItem("calculationHistory")) || [];
  let sum = 0;

  savedHistory.forEach((item) => {
    const [expression, result, text] = item.split(" = ");
    const listItem = createHistoryItem(expression, result, text);
    historyList.appendChild(listItem);
    sum += parseFloat(result);
  });

  setTotalSpent(sum);
  totalSpentElement.textContent = sum.toFixed(2);
}

export function updateLocalStorage() {
  const historyItems = [];
  const historyElements = historyList.querySelectorAll("li");

  historyElements.forEach((item) => {
    const expression = item.querySelector(".history-input").value;
    const result = item.querySelector(".history-result").textContent;
    const text = item.querySelector(".history-text").value;
    historyItems.push(`${expression} = ${result} ${text || ""}`);
  });

  localStorage.setItem("calculationHistory", JSON.stringify(historyItems));
}
