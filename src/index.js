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
function cToF() {
  let highs = document.querySelectorAll(".high");
  let lows = document.querySelectorAll(".low");
  let unit = document.querySelectorAll(".unit");
  for (let i = 0; i < highs.length; i++) {
    highs[i].innerHTML = Math.round(temp);
    lows[i].innerHTML = Math.round(temp2);
  }
  for (let j = 0; j < unit.length; j++) {
    unit[j].innerHTML = "F";
  }
}
function fToC() {
  let highs = document.querySelectorAll(".high");
  let lows = document.querySelectorAll(".low");
  let unit = document.querySelectorAll(".unit");
  let newTemp, newTemp2;
  for (let i = 0; i < highs.length; i++) {
    newTemp = (temp - 32) * (5.0 / 9);
    newTemp2 = (temp2 - 32) * (5.0 / 9);
    highs[i].innerHTML = Math.round(newTemp);
    lows[i].innerHTML = Math.round(newTemp2);
  }
  for (let j = 0; j < unit.length; j++) {
    unit[j].innerHTML = "C";
  }
}
function userCity(event) {
  event.preventDefault();
  let cityBox = document.querySelector(".search-bar");
  let city = cityBox.value;
  changeCity(city);
  cityTemp(city, "imperial");
}
function getPosition() {
  navigator.geolocation.getCurrentPosition(getCoord);
}
function coordToCity(response) {
  let name = response.data.name;
  changeCity(name);
}
function changeCity(name) {
  let city = document.querySelector("#location");
  city.innerHTML = name;
}
function cityTemp(city, unit) {
  let apiKey = "84c62539d2ae6fa1489aa536b432ef2c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(coordToCity);
  axios.get(apiUrl).then(changeTemp);
}
function coordTemp(lat, long, unit) {
  let apiKey = "84c62539d2ae6fa1489aa536b432ef2c";
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
}

let temp = null;
let temp2 = null;

let cityBox = document.querySelector(".search-form");
cityBox.addEventListener("submit", userCity);

let geoClicker = document.querySelector(".coord");
geoClicker.addEventListener("click", getPosition);

let currentTime = document.querySelector("#date-time");
let now = new Date();
currentTime.innerHTML = formatDate();

let celClicker = document.querySelector(".c");
let farClicker = document.querySelector(".f");
celClicker.addEventListener("click", fToC);
farClicker.addEventListener("click", cToF);
