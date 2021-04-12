const input = document.querySelector("#inputText");
const search = document.querySelector("#search");
const city = document.querySelector("#city");
const weather = document.querySelector("#weather");
const temp = document.querySelector("#temp");
const img = document.querySelector(".img");


function getData() {
  let API_URL_OpenWeatherMap = `http://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=b4b746e411eeec58338b0d2c07fdd645`;
  fetch(API_URL_OpenWeatherMap) //긴 시간을 기다려줘야 할 필요가 있습니다.(데이터를 요청하고 싶은 주소를 적고)
    .then(function (resp) {
      return resp.json() //JSON 형식의 텍스트를 자바스크립트 객체로 바꾸고
    })
    .then(function (json) { //하고 싶은 일을 한다.
      const weatherIcon = document.querySelector('#img');
      const weatherIconId = json.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${weatherIconId}.png`;
      weatherIcon.setAttribute('src', iconUrl);
      city.textContent = json.name;
      weather.textContent = json.weather[0].main;
      temp.textContent = (json.main.temp - 273.15).toFixed(1) + "°";
    });
}

search.onclick = getData;