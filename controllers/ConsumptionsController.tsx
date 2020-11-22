import AuthService from "../utils/AuthService";
var authService = new AuthService();

export async function fetchConsumptions(category) {
  var myHeaders = new Headers();
  var fetchURL = "https://skrilla-backend.herokuapp.com/consumptions";

  if (category != undefined && category != "") {
    fetchURL += "?category=" + category;
  }
  myHeaders.append("Authorization", "Bearer " + authService.getToken());

  let requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(fetchURL, requestOptions).then((response) => response.json());
}
export async function fetchConsumptionsPeriod(initial_date, end_date) {
  var myHeaders = new Headers();
  var fetchURL = "https://skrilla-backend.herokuapp.com/consumptions/date";

  if (
    initial_date != undefined &&
    initial_date != "" &&
    end_date != undefined &&
    end_date != ""
  ) {
    fetchURL += "?initial_date=" + initial_date + "&end_date=" + end_date;
  }
  myHeaders.append("Authorization", "Bearer " + authService.getToken());

  let requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(fetchURL, requestOptions).then((response) => response.json());
}

export async function postConsumption(data) {
  let token = authService.getToken();

  const response = await fetch(
    "https://skrilla-backend.herokuapp.com/consumptions",
    {
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
    }
  );
  return response.json();
}

export async function fetchConsumption(id) {
  var myHeaders = new Headers();
  var fetchURL = "https://skrilla-backend.herokuapp.com/consumptions/" + id;

  myHeaders.append("Authorization", "Bearer " + authService.getToken());

  let requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(fetchURL, requestOptions).then((response) => response.json());
}

export async function updateConsumption(id, data) {
  let token = authService.getToken();
  var fetchURL = "https://skrilla-backend.herokuapp.com/consumptions/" + id;
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

export async function deleteConsumption(id) {
  let token = authService.getToken();
  var fetchURL = "https://skrilla-backend.herokuapp.com/consumptions/" + id;
  const response = await fetch(fetchURL, {
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
export async function getConsumptionPerCategory(month, year) {
  var myHeaders = new Headers();
  var fetchURL = "https://skrilla-backend.herokuapp.com/conspercat";
  month += 1;
  if (month != "" && year != "") {
    fetchURL += "?month=" + month + "&year=" + year;
  }
  myHeaders.append("Authorization", "Bearer " + authService.getToken());

  let requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(fetchURL, requestOptions).then((response) => response.json());
}
export async function fetchTotalPerMonth() {
  var myHeaders = new Headers();
  var fetchURL =
    "https://skrilla-backend.herokuapp.com/consumptions/totalmonth";

  myHeaders.append("Authorization", "Bearer " + authService.getToken());

  let requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  return fetch(fetchURL, requestOptions).then((response) => response.json());
}
