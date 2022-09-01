class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // ---------------------------------

  getAllMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method : 'GET',
      headers : this._headers
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

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
  headers: {'Content-Type': 'application/json'}
});
