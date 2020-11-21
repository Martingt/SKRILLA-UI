import { defaultCategories } from "../utils/DefaultCategories";
import CategoryIcons from "../utils/CategoryIcons.js";

export async function postCategory(data) {
  let token = getAuthToken();

  const response = await fetch("https://localhost:5001/categories", {
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

export async function postDefaultCategories() {
  let token = getAuthToken();
  for (let index = 0; index < defaultCategories.length; ++index) {
    fetch("https://localhost:5001/categories", {
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
      body: JSON.stringify(defaultCategories[index]),
    });
  }
}

export async function fetchCategories() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getAuthToken());
  let requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    "https://localhost:5001/categories",
    requestOptions
  ).then((response) => response.json());
}

export async function updateCategory(id, data) {
  let token = getAuthToken();
  var fetchURL = "https://localhost:5001/categories/" + id;
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

export async function deleteCategory(id) {
  let token = getAuthToken();
  var fetchURL = "https://localhost:5001/categories/" + id;
  const response: any = await fetch(fetchURL, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).catch((error) => console.log("error", error));

  return response;
}

function getAuthToken() {
  let token = null;
  if (
    document.cookie.split(";").some((item) => item.trim().startsWith("token="))
  ) {
    token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token"))
      .split("=")[1];
  }
  return token;
}

export function getCategoryIcon(category) {
  for (const c in CategoryIcons) {
    if (CategoryIcons[c].name == category) {
      var path = "/images/categories/" + CategoryIcons[c].path;
      return (
        <img
          src={path}
          alt={CategoryIcons[c].name}
          className="categoryIconSmall"
        />
      );
    }
  }
}
