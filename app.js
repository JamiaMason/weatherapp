const timeE1 = document.getElementById("time");
const dateE1 = document.getElementById("date");
const currentWeatherItemsE1 = document.getElementById("current-weather-itmes");
const timezone = document.getElementById("time-Zone");
const countryE1 = document.getElementById("country");
const weatherForecastE1 = document.getElementById("weather-forecast");
const currentTempE1 = document.getElementById("current-temp");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const API_KEY = "5b36412b576638d8bef75e62167a68bb";
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay;
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour > 12 ? "PM" : "AM";

  timeE1.innerHTML =
    hoursIn12HrFormat +
    ":" +
    minutes +
    "   " +
    '<span id="am-pm">' +
    ampm +
    "</span>";

  dateE1.innerHTML = days[days + ", " + date + "  " + months[month]];
}, 1000);

function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        showWeatherData(data);
      });
  });
}

function showWeatherData(data) {
  let HumidityDiv = document.getElementById("Humidity");
  let HighDiv = document.getElementById("High");
  let LowDiv = document.getElementById("Low");

  data.daily.map((weather) => {
    let { humidity } = weather;
    let { max, min } = weather.temp;

    max = Math.round((9 / 5) * (max - 273.15) + 32);
    min = Math.round((9 / 5) * (min - 273.15) + 32);

    HumidityDiv.append(humidity + ", ");
    HighDiv.append(max + "°F, ");
    LowDiv.append(min + "°F, ");
  });
}

getWeatherData();
