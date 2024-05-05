const API_KEY = "5ce8659e0b6874b674061c1ab88b368b";

async function getWeatherFromCity(city) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const weatherData = response.data.main;
    const windData = response.data.wind;
    const weatherDetails = response.data.weather[0];


    const humidity = weatherData.humidity;
    const temp = weatherData.temp;
    const wind = windData.speed;
    const cityName = response.data.name;

    const image = getImageForWeather(weatherDetails)

    //Step 2: Put all data in UI using DOM
    bindData(cityName,temp,humidity,wind,image)

  } catch (error) {
    console.log(error);
    alert('Please try searching another location')
  }
}


function getImageForWeather(weatherData) {
  const weatherImages = {
      "Clouds": './resources/images/clouds.png',
      "Clear": './resources/images/clear.png',
      "Drizzle": './resources/images/drizzle.png',
      "Mist": './resources/images/mist.png',
      "Rain": './resources/images/rain.png',
      "Snow": './resources/images/snow.png'
  };

  const image = weatherImages[weatherData.main] || '';

  return image;
}



function bindData(cityName,temp,humidity,wind,image){
    const weatherIcon = document.getElementsByClassName('weather-icon')[0]
    weatherIcon.src = image;

    const tempDoc = document.getElementsByClassName("temp")[0];
    tempDoc.innerHTML = `${temp} &#176;C`

    const cityDoc = document.getElementsByClassName("city")[0];
    cityDoc.innerHTML = cityName;

    const humidityDoc = document.getElementsByClassName("humidity")[0];
    humidityDoc.innerHTML = `${humidity} %`
    
    const windDoc = document.getElementsByClassName("wind")[0];
    windDoc.innerHTML = `${wind} m/s`

    console.log(image)
}

const searchPlace = document.getElementsByClassName("search-place")[0];
const searchBtn = document.getElementsByClassName("search-btn")[0];

searchBtn.addEventListener("click", () => {
  getWeatherFromCity(searchPlace.value);
});

getWeatherFromCity('roorkee')