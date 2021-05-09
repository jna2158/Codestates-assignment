class App {
  init() {
    document
      .querySelector('#to-upper-case')
      .addEventListener('click', this.toUpperCase.bind(this));
    document
      .querySelector('#to-lower-case')
      .addEventListener('click', this.toLowerCase.bind(this));
  }
  post(path, body) {
    window.fetch(`http://localhost:5000/${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      this.render(res);
    });
  }
  toLowerCase() {
    const text = document.querySelector('.input-text').value;
    this.post('lower', text);
  }
  toUpperCase() {
    const text = document.querySelector('.input-text').value;
    this.post('upper', text);
  }
  render(response) {
    const resultWrapper = document.querySelector('#response-wrapper');
    document.querySelector('.input-text').value = '';
    resultWrapper.innerHTML = response;
  }
}

const app = new App();
app.init();
