const apiKey = 'd832662f90b77c3edc02b17d8d0a212c'; 
const weatherDetails = document.querySelector('.weather-details');
const errorDisplay = document.querySelector('.error');
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
    const weatherIconCode = data.weather[0].icon; // Corrected access to weather icon code
    console.log(weatherIconCode)

    const unit = document.querySelector('input[name="unit"]:checked').value;
    const unitLabel = unit === 'metric' ? '°C' : '°F';

    // Construct the URL for the weather icon
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

    const weatherHTML = `
    <div class="weather-info">
    <h2>Weather in ${data.name}</h2>
  
    <img src="${weatherImage}" alt="Weather Image"> 
</div>
        <p>Temperature: ${temperature}${unitLabel}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Description: ${weatherDescription}</p>
    `;

    weatherDetails.innerHTML = weatherHTML;
    errorDisplay.innerHTML = '';
}


function displayError(errorMessage) {
    weatherDetails.innerHTML = '';
    errorDisplay.innerHTML = `<p>${errorMessage}</p>`;
}


// Function to get weather by geolocation
function getWeatherByGeolocation() {
    const unit = document.querySelector('input[name="unit"]:checked').value;
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            try {
                // Fetch weather data using the user's current location
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Location not found or API error.');
                }
                const data = await response.json();

                // Display weather for the current location
                displayWeather(data);

                // Display the user's current location
               
            } catch (error) {
                displayError(error.message);
            }
        }, (error) => {
            // Geolocation permission denied or an error occurred
            displayError('' + " ");
        });
    } else {
        displayError('Geolocation is not supported by your browser.');
    }
}

// Call the function to fetch weather data by geolocation when the page loads
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




