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
weatherhello.innerHTML = `${month} ${date} ${year}`;
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
return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (0 < index < 6) {
      forecastHTML =
        forecastHTML +
        `
   <div class="col-2">
   <div id="weekday"> ${formatDay(forecastDay.dt)} </div>
   <img id="icons" src="http://openweathermap.org/img/wn/${
     forecastDay.weather[0].icon
   }@2x.png" alt="" width="42"
   />
   <div id="small-temps">
   <span class="tempMax">${Math.round(forecastDay.temp.max)}° </span>
   <span class="tempMin">${Math.round(forecastDay.temp.min)}°  </span>
   </div>
   </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "72a6f5c8d3593367d6b1bec5268294b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  let windElement = document.querySelector("#windspeed");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  let dateElement = document.querySelector("#time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#big-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemp = response.data.main.temp;
  console.log(celsiusTemp);
getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "72a6f5c8d3593367d6b1bec5268294b4";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}
function searchGeo(event) {
  event.preventDefault();
  function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    let apiKey = "72a6f5c8d3593367d6b1bec5268294b4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}
let submitGeo = document.querySelector("#geo");
submitGeo.addEventListener("click", searchGeo);

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search").value;
  search(cityInputElement);
}
function displayQuotes() {
  let quote = document.querySelector("#quote");
  let quotes = [
    `Wherever you go, no matter what the weather, always bring your own sunshine.

Anthony J. D'Angelo`,
    `Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating; there is really no such thing as bad weather, only different kinds of good weather.

John Ruskin`,
    `Everybody talks about the weather, but nobody does anything about it.

Charles Dudley Warner`,
    `“The Best Way To Get Started Is To Quit Talking And Begin Doing.” – Walt Disney`,
    `“The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.” – Winston Churchill`,
    `“Don’t Let Yesterday Take Up Too Much Of Today.” – Will Rogers`,
    `“If You Are Working On Something That You Really Care About, You Don’t Have To Be Pushed. The Vision Pulls You.” – Steve Jobs`,
    ` “People Who Are Crazy Enough To Think They Can Change The World, Are The Ones Who Do.” – Rob Siltanen`,
    `“Failure Will Never Overtake Me If My Determination To Succeed Is Strong Enough.” – Og Mandino`,
    `“Knowing Is Not Enough; We Must Apply. Wishing Is Not Enough; We Must Do.” – Johann Wolfgang Von Goethe

`,
    `“Imagine Your Life Is Perfect In Every Respect; What Would It Look Like?” – Brian Tracy`,
    `“The Man Who Has Confidence In Himself Gains The Confidence Of Others.” – Hasidic Proverb`,
    `“Creativity Is Intelligence Having Fun.” – Albert Einstein`,
    `“What You Lack In Talent Can Be Made Up With Desire, Hustle And Giving 110% All The Time.” – Don Zimmer`,
  ];
  let randomquote = Math.floor(Math.random() * quotes);
  quote.innerHTML = quotes[randomquote];
}
function displayFahrenheitTemp(event){
  event.preventDefault();
  let tempEt = document.querySelector("#weather-cel");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempEt.innerHTML = Math.round(fahrenheitTemp);
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

let celsiusTemp = null;

search("Prague");

let fahrenheitlink = document.querySelector("#fahren");
fahrenheitlink.addEventListener("click", displayFahrenheitTemp);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

displayQuotes();