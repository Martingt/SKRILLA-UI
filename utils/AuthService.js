export default class AuthService {
    constructor(domain) {
      this.domain = domain || 'http://localhost:6001/connect'
      this.api = 'https://localhost:5001'
      this.fetch = this.fetch.bind(this)
      this.login = this.login.bind(this)
      this.getProfile = this.getProfile.bind(this)
    }

    login(email, password) {
      // Get a token
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("client_id", "skrilla");
      urlencoded.append("client_secret", "secret");
      urlencoded.append("grant_type", "password");
      urlencoded.append("scope", "skrilla");
      urlencoded.append("username", email);
      urlencoded.append("password", password);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      return this.fetch("http://localhost:6001/connect/token", requestOptions)
        /*.then(result => this.setToken(result.access_token))*/
        .then(result => {
          this.setToken(result['access_token']);
          return result['access_token'];
        })
        .catch(error => console.log('error', error));

    }

    loggedIn(){
      // Checks if there is a saved token and it's still valid
      const token = this.getToken()
      return !!token
    }

    setProfile(profile){
      // Saves profile data to localStorage
      localStorage.setItem('profile', JSON.stringify(profile))
    }

    getProfile(){
      return {}
    }

    setToken(idToken){
      var d = new Date();
      d.setTime(d.getTime() + (60*60*1000));
      var expires = "expires="+ d.toUTCString();

      document.cookie = "token=" + idToken  + ";" + expires ;
      console.log(document.cookie);

    }

    getToken(){
      let token = null;
      if (document.cookie.split(';').some((item) => item.trim().startsWith('token='))) {
        token = document.cookie
          .split("; ")
          .find(row => row.startsWith("token"))
          .split("=")[1];
        }
      return token;
    }

    logout(){
      document.cookie = "doSomethingOnlyOnce=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    _checkStatus(response) {
      // raises an error in case response status is not a success
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }

    fetch(url, options){
      // performs api calls sending the required authentication headers
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

      if (this.loggedIn()){
        headers['Authorization'] = 'Bearer ' + this.getToken()
      }

      return fetch(url, {
        headers,
        ...options
      })
      .then(this._checkStatus)
      .then(response => response.json())
    }
  }
