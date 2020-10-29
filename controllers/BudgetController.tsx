import AuthService from "../utils/AuthService.tsx";
const authService = new AuthService();

export async function fetchBudget() {
  let token = authService.getToken();

  const response = await fetch("https://localhost:5001/budget", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

export async function fetchBudgetSummary() {
  let token = authService.getToken();

  const response = await fetch("https://localhost:5001/budget/summary", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

export async function postBudget(data) {
  let token = authService.getToken();

  const response = await fetch("https://localhost:5001/budget", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function putCategoryBudget(data) {
  let token = authService.getToken();
  var fetchURL = "https://localhost:5001/budget/category";
  const response = await fetch(fetchURL, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  }).catch((error) => console.log("error", error));

  return response.json();
}
