class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // ---------------------------------

  setToken(token) { this._headers['token'] = token; }
  deleteToken() { delete this._headers['token']; }

  // ---------------------------------

  getMyMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method : 'GET',
      credentials: 'include',
      headers : this._headers
    })
      .then(this._checkResponse)
  }
  addMyMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method : 'POST',
      credentials: 'include',
      headers : this._headers,
      body : JSON.stringify(movie)
    })
      .then(this._checkResponse)
  }
  removeMyMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method : 'DELETE',
      credentials: 'include',
      headers : this._headers
    })
      .then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method : 'GET',
      credentials: 'include',
      headers : this._headers
    })
      .then(this._checkResponse)
  }
  setUserInfo(userInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method : 'PATCH',
      credentials: 'include',
      headers : this._headers,
      body : JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
      })
    })
      .then(this._checkResponse)
  }

  // ---------------------------------

  _checkResponse(res){
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

// ---------------------------------

export const mainApi = new MainApi({
  baseUrl: 'https://api.diplomahowcan.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json'
  }
});
