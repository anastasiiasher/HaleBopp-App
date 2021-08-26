import "./styles.css";

function getDate()  {
    let today = now.getDate();
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let year = now.getFullYear();
    let months = [
      "January",
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
    let weatherhello = document.querySelector("#today-is");
    weatherhello.innerHTML = `${day} ${month} ${today} ${year}`;
  }
  function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dateElement = document.querySelector("#time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  descriptionElement.innerHTML = response.data.weather[0].description;
   let timenow = document.querySelector("#time");
  timenow.innerHTML = `${hours}:${minutes}`;
  return `${hours}:${minutes}`;
  }
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
      humidityElement.innerHTML = `${response.data.main.humidity}`;
      windElement.innerHTML = `${Math.round(response.data.wind.speed)}`;
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
 const axios = require("axios");
  axios.get(`${apiURL}&appid=${apiKey}`)}