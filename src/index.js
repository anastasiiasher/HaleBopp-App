import "./styles.css";
let now = new Date();
let weatherhello = document.querySelector("#today-is");
let date = now.getDate();
let year = now.getFullYear();
let months = [
  "Januart",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
weatherhello.innerHTML = `${day} ${month} ${date} ${year}`;
function s4Wapp(event) {
  event.preventDefault();
  let apiKey = "72a6f5c8d3593367d6b1bec5268294b4";
  let newCity = document.querySelector("#search");
  let city = `${newCity.value}`;
  let current = document.querySelector("#city");
  current.innerHTML = city;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  function showTemperature(response) {
    console.log(response);
    let newtemperature = Math.round(response.data.main.temp);
    console.log(newtemperature);
    let tempElement = document.querySelector("#weather-cel");
    tempElement.innerHTML = newtemperature;
  }
  const axios = require("axios");
  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
}
let searchForWeather = document.querySelector("#searching");
searchForWeather.addEventListener("submit", s4Wapp);
function searchGeo(event) {
  event.preventDefault();
  function showPosition(position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    let apiKey = "72a6f5c8d3593367d6b1bec5268294b4";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    function showTemperature(response) {
      let temperature = Math.round(response.data.main.temp);
      console.log(temperature);
      let tempElement = document.querySelector("#weather-cel");
      tempElement.innerHTML = `${temperature}`;
      let cityName = document.querySelector("#city");
      cityName.innerHTML = `${response.data.name}`;
      let descriptionElement = document.querySelector("#description");
      let humidityElement = document.querySelector("#humidity");
      let windElement = document.querySelector("#wind");
      let iconElement = document.querySelector("#big-icon");

      descriptionElement.innerHTML = response.data.weather[0].description;
      humidityElement.innerHTML = response.data.main.humidity;
      windElement.innerHTML = Math.round(response.data.wind.speed);
      iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      iconElement.setAttribute("alt", response.data.weather[0].description);

      getForecast(response.data.coord);
    }
    const axios = require("axios");
    axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}
let submitGeo = document.querySelector("#geo");
submitGeo.addEventListener("click", searchGeo);
function formatDate(timestamp) {
  let dateElement = document.querySelector("#time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  descriptionElement.innerHTML = response.data.weather[0].description;
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
const axios = require("axios");
axios.get(`${apiURL}&appid=${apiKey}`).then(formatDate);