export const BASE_URL = 'https://api.diplomahowcan.nomoredomains.sbs';

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})
  })
  .then(checkResponse)
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
}

function checkResponse(res){
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка ${res.status}`);
}
