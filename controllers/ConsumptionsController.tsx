import AuthService  from '../utils/AuthService.tsx';
var authService = new AuthService();

export async function fetchConsumptions(category){
  var myHeaders = new Headers();
  var fetchURL = "https://localhost:5001/consumptions";

  if(category != undefined && category != ""){
      fetchURL += "?category="+category;
  }
console.log("consumption moment: " + authService.getToken());
  myHeaders.append("Authorization", "Bearer " + authService.getToken());

  let requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(fetchURL, requestOptions).then(response => response.json());
}

export  async function postConsumption(data) {
    let token = authService.getToken();

    const response = await fetch("https://localhost:5001/consumptions", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
}
