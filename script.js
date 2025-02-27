const KEY = "2X8A6Q3VEVSDZB9EJDBUCB9N9";
const cityHead = document.querySelector(".current-city");
const searchBar = document.querySelector("#search");
const searchButton = document.querySelector("#search-button");
const currentConditions = document.querySelector(".current-conditions");
const currentTemp = document.querySelector(".current-temp");
const currentLow = document.querySelector(".current-low");
const currentHigh = document.querySelector(".current-high");
const currentConditionsImg = document.querySelector(".current-condition-image");
const allWeather = document.querySelector(".all-container");
const fiveDay = document.querySelector(".five-day");
const measurement = document.querySelector(".measurement");

let searchTerm = "";
searchBar.addEventListener("input", (e) => {});
searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
    searchBar.blur();
  }
});
searchButton.addEventListener("click", () => {
  searchTerm = searchBar.value;
  fiveDay.replaceChildren();
  console.log(searchTerm);
  cityHeader(searchTerm);
  weatherFetch(searchTerm);
});

function cityHeader(city) {
  cityHead.textContent = city;
}

function current(conditions, temp, low, high) {
  let oneCondition = conditions.split(",")[0];
  console.log(oneCondition);
  weatherImg(currentConditionsImg, oneCondition.toLowerCase());
  currentConditions.textContent = oneCondition;
  currentTemp.textContent = temp;
  currentLow.textContent = low;
  currentHigh.textContent = high;
}

function weatherImg(container, condition) {
  if (condition.includes("rain")) {
    container.src = "./imgs/Rainy.png";
  } else if (condition.includes("partially cloudy")) {
    container.src = "./imgs/Partly Cloudy.png";
  } else if (condition.includes("sunny")) {
    container.src = "./imgs/Sunny.png";
  } else if (condition.includes("cloudy")) {
    container.src = "./imgs/Cloudy.png";
  } else if (condition.includes("snow")) {
    container.src = "./imgs/Snowy.png";
  } else if (condition.includes("storm")) {
    container.src = "./imgs/Storm.png";
  } else if (condition.includes("windy")) {
    container.src = "./imgs/Windy.png";
  } else {
    container.src = "./imgs/Sunny.png";
  }
}

function createFiveDay(weather) {
  for (let i = 0; i < 5; i++) {
    fiveDayItem(
      reformatDate(weather[i].datetime),
      weather[i].conditions,
      weather[i].temp,
      weather[i].tempmin,
      weather[i].tempmax
    );
  }
}

function fiveDayItem(dateTime, condition, temprature, low, high) {
  const item = document.createElement("div");
  item.className = "five-day-item";
  const date = document.createElement("h4");
  const conditionImg = document.createElement("img");
  conditionImg.className = "small-condition";
  const temp = document.createElement("h2");
  const highLow = document.createElement("h4");

  date.textContent = dateTime;
  weatherImg(conditionImg, condition);
  temp.textContent = Math.round(temprature) + "°F";
  highLow.textContent =
    "Low/High" + " " + Math.round(low) + "/" + Math.round(high);

  item.appendChild(date);
  item.appendChild(conditionImg);
  item.appendChild(temp);
  item.appendChild(highLow);
  fiveDay.appendChild(item);
}

function reformatDate(date) {
  const parts = date.split("-");
  return `${parts[1]}/${parts[2]}`;
}

async function weatherFetch(city) {
  const weather = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${KEY}`
  );
  const weatherJson = await weather.json();
  const currentDay = weatherJson.days[0];
  const weatherDays = weatherJson.days;
  console.log(weatherDays);
  current(
    currentDay.conditions,
    Math.round(currentDay.temp) + "°F",
    Math.round(currentDay.tempmin),
    Math.round(currentDay.tempmax)
  );
  createFiveDay(weatherDays);
  allWeather.style.display = "block";
  console.log(currentDay.datetime);
}
