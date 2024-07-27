const BASE_URL="https://api.openweathermap.org/data/2.5";
const API_KEY="44f82aa0c13255ce067d39c31ce2cb64;"
const searchInput=document.querySelector("input")
const searchButton=document.querySelector("button")
const weatherContainer=document.getElementById("weather")
const locationIcon=document.getElementById("location")

const getCurrentWeatherByName= async(city)=>{
    const url=`${BASE_URL}/weather?q=${city}&appid=${API_KEY}units=metric`;
const response=await fetch(url)
const json=await response.json()
return json
};

const getCurrentWeatherByCoordinate= async(lat,lon)=>{
    const url=`${BASE_URL}/weather?lat=${lat}&lon=${lon}appid=${API_KEY}units=metric`;
const response=await fetch(url)
const json=await response.json()
return json
}
const renderCurrentWeather=(data)=>{
console.log(data)
const weatherJSX=`
<h1>${data.name},${data.sys.country}</h1>
<div>
<img alt="weather icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}"</div>
<span>${data.weather[0].main}</span>
<p>${Math.round(data.main.temp)}</p></div>
<div id="info">
<p>Humidity:<span>${data.main.humidity}%</span></p>
<p>Wind Speed:<span>${data.wind.speed}m/s</span></p>
</div>`
weatherContainer.innerHTML=weatherJSX;


}
const searchHandler=async()=>{
    const cityName=searchInput.value
    if(!cityName){
        alert("Please enter your city name!")
    }
     const currentData=await getCurrentWeatherByName(cityName)
     console.log(currentData)
}
const positionCallback=async (position)=>{
    const{latitude,longtute}=position.coords
    const currentData=await getCurrentWeatherByCoordinate(latitude,longtute)
    renderCurrentWeather(currentData)
}
const errorCallback=(error)=>{
    console.log(error.message)
}
const locationHandler=()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positionCallback,errorCallback)
    }else{
        alert("Your broweser does not suppory geolocation")
    }

}
searchButton.addEventListener("click",searchHandler)
locationIcon.addEventListener("click",locationHandler)