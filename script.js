const apiKey = 'd832662f90b77c3edc02b17d8d0a212c'; 
const weatherDetails = document.querySelector('.weather-details');
const errorDisplay = document.querySelector('.error');
const cityname=document.querySelector('.cityname');
const currentLocationDisplay = document.getElementById('currentLocationDisplay');

document.getElementById('getWeatherButton').addEventListener('click', getWeather);

 const unitToggle = document.querySelector('.unit-toggle');


 unitToggle.addEventListener('change', updateTemperatureUnit);

locationInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});



function getWeather() {
    const location = document.getElementById('locationInput').value;
    const unit = document.querySelector('input[name="unit"]:checked').value;

 


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found or API error.');
            }
           
            return response.json()
        
        })
        .then(data => {
            console.log(data)
           
            displayWeather(data);
        })
        .catch(error => {
            displayError(error.message);
        });
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherDescription = data.weather[0].description;
    const weatherIconCode = data.weather[0].icon; 
    console.log(weatherIconCode)

    const unit = document.querySelector('input[name="unit"]:checked').value;
    const unitLabel = unit === 'metric' ? '°C' : '°F';


    const iconUrl = `http://openweathermap.org/img/w/${weatherIconCode}.png`;



    const weatherImages = {
        '01d': 'images/sun.png',            
        '02d': 'images/partly-cloudy.png',  
        '03d': 'images/cloudy.png',         
        '04d': 'images/cloudy.png',         
        '09d': 'images/rain.png',           
        '10d': 'images/rain.png',           
        '11d': 'images/thunderstorm.png',   
        '13d': 'images/snow.png',           
        '50d': 'images/mist.png',           
        '01n': 'images/moon.png',          
        '02n': 'images/partly-cloudy.png',  
        '03n': 'images/cloudy.png',         
        '04n': 'images/cloudy.png',         
        '09n': 'images/rain.png',           
        '10n': 'images/rain.png',           
        '11n': 'images/thunderstorm.png',   
        '13n': 'images/snow.png',           
        '50n': 'images/mist.png',           
    };
    

    const weatherImage = weatherImages[weatherIconCode] || 'images/default.png';


    const cityname = document.querySelector('.cityname'); 

    cityname.innerHTML = `<h1>Welcome in <span class="place">${data.name}<span></h1>`;



    const weatherHTML = `
    <div class="weather-info">
  
  
   
</div>





        <div  class="weather-info"  >
        
        <h2>${temperature}${unitLabel}</h2>
        <img src="${weatherImage}" alt="Weather Image"> 
        </div>
        
          <div class="attribute">

        <div>Humidity: ${humidity}%</div>
        <div>Wind Speed: ${windSpeed} m/s</div>
        <div>Description: ${weatherDescription}</div>

        <div>
       
    `;

    weatherDetails.innerHTML = weatherHTML;
    errorDisplay.innerHTML = '';
   
}


function displayError(errorMessage) {
    weatherDetails.innerHTML = '';
    errorDisplay.innerHTML = `<p>${errorMessage}</p>`;
}



function getWeatherByGeolocation() {
    const unit = document.querySelector('input[name="unit"]:checked').value;
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            try {
             
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Location not found or API error.');
                }
                const data = await response.json();

                displayWeather(data);

        
               
            } catch (error) {
                displayError(error.message);
            }
        }, (error) => {
   
            displayError('' + " ");
        });
    } else {
        displayError('Geolocation is not supported by your browser.');
    }
}


getWeatherByGeolocation();




function updateTemperatureUnit(event) {
    temperatureUnit = event.target.value;
    const location=document.getElementById('locationInput').value;
    console.log("Df" , location)
    if (location==="")
    {
          console.log("dsfdsfsdf")
        getWeatherByGeolocation();
    }

    else
   {

       getWeather();
   }
}




