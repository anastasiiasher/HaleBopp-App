import "./styles.css";
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
  temperatureElement.innerHTMLv = Math.round(response.data.main.temp);
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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemp = response.data.main.temp;
};
function search(city) {
  let apiKey = "e95edc3a45daa4834082ba5250327225";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}

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
let celsiusTemp = null;

let form = document.querySelector("#searching");
form.addEventListener("submit", handleSubmit);

let fahrenheitlink = document.querySelector("#fahren");
fahrenheitlink.addEventListener("click", displayFahrenheitTemp);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Prague");
