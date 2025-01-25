

const weatherForm = document.querySelector(".weatherform");
const cityip = document.querySelector(".cityip");
const card = document.querySelector(".card");
const apikey = "528a1759ae10e17ffaf0ba4f0deb56c2";

weatherForm.addEventListener("submit", async event =>{
  event.preventDefault();

  const city = cityip.value;

  if(city){
    try{
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }
    catch(error){
      console.error(error);
      displayError(error);
    }
  }
  else{
    displayError("Please enter a city name 😊");
  }
});

async function getWeatherData(city){
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  const response = await fetch(apiurl);

  if(!response.ok){
    throw new Error("Could not fetch the weather data you are looking for 😥");
  }

  return await response.json();

}

function displayWeatherInfo(data){
  const {name: city,
        main: {temp, humidity},
        weather:[{description, id}]} = data;

  card.textContent = "";
  card.style.display = "flex";


  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const emoji = document.createElement("p");


  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`
  humidityDisplay.textContent = `Humidity : ${humidity}`;
  descDisplay.textContent = `"${description}"`;
  emoji.textContent = getWeatehrEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  emoji.classList.add("emoji");


  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(emoji);

}

function getWeatehrEmoji(weatherId){
  switch(true){
    case (weatherId >= 200 && weatherId < 300):
      return "⛈️";
  case (weatherId >= 300 && weatherId < 400):
    return "🌧️";
  case (weatherId >= 500 && weatherId < 600):
    return "🌧️";
  case (weatherId >= 600 && weatherId < 700):
    return "❄️";
  case (weatherId >= 700 && weatherId < 800):
    return "🌫️";
  case (weatherId === 800):
    return "☀️";
  case (weatherId >= 801 && weatherId < 810):
    return "☁️";
  default:
    return "(❁´◡`❁)";
  }
}

function displayError(message){

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
  
}