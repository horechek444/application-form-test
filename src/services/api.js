class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getCities() {
    return fetch(`${this.baseUrl}/city`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return new Error(`Ошибка: ${res.status}`);
      });
  }

  sendForm(newArticle) {
    return fetch(`${this.baseUrl}/send-form`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        title: newArticle.title,
        text: newArticle.text,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return new Error(`Ошибка: ${res.status}`);
      });
  }
}

const api = new Api({
  baseUrl: 'https://60254fac36244d001797bfe8.mockapi.io/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
