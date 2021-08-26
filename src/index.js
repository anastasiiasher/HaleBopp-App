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
weatherhello.innerHTML = `${day}, <br />${month} ${date} ${year}`;
function formatDate (timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
      hours = `0${hours}`;
}
let minutes = date.getMinutes();
 if (minutes < 10) {
      minutes = `0${minutes}`;
 }
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`
}
function displayTemperature(response) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#weather-cel");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#windspeed");
  windElement.innerHTML =  Math.round(response.data.wind.speed); 
  let dateElement = document.querySelector("#time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#big-icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemp = response.data.main.temp;
};
function search(city) {
  let apiKey = "72a6f5c8d3593367d6b1bec5268294b4";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}
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
    }
    const axios = require("axios");
    axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}
let submitGeo = document.querySelector("#geo");
submitGeo.addEventListener("click", searchGeo);

function handleSubmit (event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#search");
  search(cityInputElement.value);
}

function displayFahrenheitTemp(event){
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemp*9)/5 + 32);
  let tempElement = document.querySelector("#weather-cel");
  tempElement.innerHTML = fahrenheitTemp;
  celsiusLink.classList.remove("active");
  fahrenheitlink.classList.add("active");
}

function displayCelsiusTemp(event){
  event.preventDefault();
  let tempEt = document.querySelector("#weather-cel");
  tempEt.innerHTML = Math.round(celsiusTemp);
  fahrenheitlink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let form = document.querySelector("#searching");
form.addEventListener("submit", handleSubmit);

let fahrenheitlink = document.querySelector("#fahren");
fahrenheitlink.addEventListener("click", displayFahrenheitTemp);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Prague");
