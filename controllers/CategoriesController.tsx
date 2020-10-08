
export async function fetchCategories(category){

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getAuthToken());
    let requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    return fetch("https://localhost:5001/categories", requestOptions)
      .then(response => response.json());
}

function getAuthToken(){
  let token = null;
  if (document.cookie.split(';').some((item) => item.trim().startsWith('token='))) {
    token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token"))
      .split("=")[1];
    }
  return token;
}
