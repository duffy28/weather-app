function formatDate(date) {
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
  let hour = now.getHours();
  if (hour > 12) {
    hour -= 12;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let message = `${day} ${hour}:${minutes}`;
  return message;
}
function userCity(event) {
  event.preventDefault();
  let cityBox = document.querySelector(".search-bar");
  let city = cityBox.value;
  displayCity(city);
  cityTemp(city, "imperial");
}
function getPosition() {
  navigator.geolocation.getCurrentPosition(getCoord);
}
function coordToCity(response) {
  let name = response.data.name;
  displayCity(name);
}
function displayCity(name) {
  let city = document.querySelector("#location");
  city.innerHTML = name;
}
function cityTemp(city, unit) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(coordToCity);
  axios.get(apiUrl).then(changeTemp);
}
function coordTemp(lat, long, unit) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(coordToCity);
  axios.get(apiUrl).then(changeTemp);
}
function getCoord(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  coordTemp(lat, long, "imperial");
}
function changeTemp(response) {
  let highTemp = document.querySelector("#high");
  let lowTemp = document.querySelector("#low");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector(".current-icon");
  temp = response.data.main.temp_max;
  temp2 = response.data.main.temp_min;
  highTemp.innerHTML = Math.round(response.data.main.temp_max);
  lowTemp.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastHTML = `<div class = row>`;
  forecast.forEach(function (forecastDay, index) {
    day = formatDay(forecastDay.dt);
    icon = forecastDay.weather[0].icon;
    max = Math.round(forecastDay.temp.max);
    min = Math.round(forecastDay.temp.min);
    if (index < 6) {
      forecastHTML += `<div class="col-2">
        <div class="forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/${icon}@2x.png"
          alt="Cloudy"
        />
        <br />
        <span class="high forecast-temp">${max}</span>°<span class="unit">F</span>
        <br />
        <span class="low forecast-temp">${min}</span>°<span class="unit">F</span>
      </div>`;
    }
  });
  let forecastElelment = document.querySelector(".forecast");
  forecastHTML += `</div>`;
  forecastElelment.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

let apiKey = "84c62539d2ae6fa1489aa536b432ef2c";

let temp = null;
let temp2 = null;

getPosition();

let cityBox = document.querySelector(".search-form");
cityBox.addEventListener("submit", userCity);

let geoClicker = document.querySelector(".coord");
geoClicker.addEventListener("click", getPosition);

let currentTime = document.querySelector("#date-time");
let now = new Date();
currentTime.innerHTML = formatDate();
