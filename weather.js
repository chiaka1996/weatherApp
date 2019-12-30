let appId = '566058278a4b311c48117881ce9ec390';
let locationSearch;
let icon;
let kelvinTemp;
let celsiusDegree;
let fahrenheitDegree;
let celsius = true;
let windSpeed = document.querySelector('.wind-speed');
let weatherDescription = document.querySelector('.explanation');
let searchButton = document.querySelector('#searchButton');
let locationName = document.querySelector('.location');
let degree = document.querySelector('.degree');
let humidity = document.querySelector('.humidity');
let conversionButton = document.querySelector('#convert');
let weatherImage = document.querySelector('#weatherImage');
let error1 =  document.querySelector('#error1');
let error2 =  document.querySelector('#error2');
let country = document.querySelector('#country');

//api fetch function
function searchWeather(){
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationSearch}&APPID=${appId}`)
.then(result => {
        return result.json();
})
.then(data => {
    console.log(data);
    if(data.cod === '404'){
        error1.innerHTML = 'City not found';
    }
    else{
    conversionButton.innerHTML = '<button id="convertTemperature"><strong>convert to °F</strong></button>';
    icon = data.weather[0].icon;
    kelvinTemp = data.main.temp;
    celsiusDegree = Math.round(kelvinTemp - 273.15) + ' °C';
    degree.innerHTML = celsiusDegree;
    locationName.innerHTML = data.name;
    weatherDescription.innerHTML = 'Conditions: ' + data.weather[0].description;
    windSpeed.innerHTML = 'wind Speed: ' + Math.round(eval(data.wind.speed * 3.6)) + 'km/hr';
    humidity.innerHTML = 'Humidity: '+ data.main.humidity +'%';
    weatherImage.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" />`;
    country.innerHTML = data.sys.country;
    } 
})

}

//onclick search  buttobn
searchButton.addEventListener('click', () => {
    
    if(document.querySelector('#searchInput').value.length < 1){
        error2.innerHTML = 'please, insert your city name.';
    }

    else{
        error2.innerHTML = '';
        error1.innerHTML = '';
    locationSearch = document.querySelector('#searchInput').value;
    console.log(locationSearch);
    searchWeather();
    document.querySelector('#searchInput').value = '';
    }
})

//onclick convert temperature button

conversionButton.addEventListener('click', () => {

    if(celsius){
        celsius = false;
        fahrenheitDegree = Math.round((kelvinTemp - 273.15) * 1.8 + 32) + ' °F';
        degree.innerHTML = fahrenheitDegree; 
        conversionButton.innerHTML = '<button id="convertTemperature"><strong>convert to °C</strong></button> ';
    }
    else{

        celsius = true;
        degree.innerHTML = celsiusDegree;
        conversionButton.innerHTML = '<button id="convertTemperature"><strong>convert to °F</strong></button>';
    }
})
