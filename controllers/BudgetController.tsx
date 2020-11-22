import AuthService from "../utils/AuthService";
const authService = new AuthService();

export async function fetchBudget() {
  let token = authService.getToken();

  const response = await fetch("https://skrilla-backend.herokuapp.com/budget", {
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

export async function fetchBudgetSummary(budgetId) {
  let token = authService.getToken();
  let url = "https://skrilla-backend.herokuapp.com/budget/summary";
  if (budgetId !== null && budgetId !== undefined && !isNaN(budgetId)) {
    url = url + "/" + budgetId;
  }
  const response = await fetch(url, {
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

export async function fetchBudgetList() {
  let token = authService.getToken();

  const response = await fetch(
    "https://skrilla-backend.herokuapp.com/budget/list",
    {
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
    }
  );
  return response.json();
}

export async function postBudget(data) {
  let token = authService.getToken();
  console.log(JSON.stringify(data));
  const response = await fetch("https://skrilla-backend.herokuapp.com/budget", {
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
  var fetchURL = "https://skrilla-backend.herokuapp.com/budget/category";
  const response: any = await fetch(fetchURL, {
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
