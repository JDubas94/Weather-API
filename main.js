const button = document.querySelector(".button");
const cityInput = document.querySelector(".input");
const temp = document.querySelector(".temp");
const icon = document.querySelector(".icon");
const description = document.querySelector('.description');
const windSpeed = document.querySelector('.wind');
const cityName = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const apiKey = "6382f04e4c45fba665f5b1a2f2c07d86";

button.addEventListener("click", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`
  )
    .then((response) => response.json())
    .then((result) => {
      temp.innerHTML = `${Math.round(result.main.temp)}<span>°C</span>`;

      const iconCode = result.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      icon.innerHTML = `<img src="${iconUrl}" alt="Weather icon">`;

        description.textContent = toUpperCaseChar(result.weather[0].description);
        windSpeed.innerHTML = `${result.wind.speed} <span>meter/sec</span>`;
        cityName.textContent = result.name;
        humidity.innerHTML = `${result.main.humidity} <span>%</span>`;
    })
    .catch(err => {
        console.error('Помилка при отриманні погоди:', err);
    });
};
getWeather('Kyiv');


function toUpperCaseChar(item) {
  return item.charAt(0).toUpperCase() + item.slice(1);
}

function updateTimeDate(){
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    time.textContent =`${hours}:${minutes}`;

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    date.textContent = `${day}/${month}/${year}`;
}
updateTimeDate();
setInterval(updateTimeDate, 60000);