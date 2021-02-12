
const citySearch =  document.querySelector('form');
const submitButton = document.getElementById('submitButton')
const card = document.querySelector('.card');
const details =  document.querySelector('.details');
const time = document.querySelector('img.time');
const icon =  document.querySelector('.icon img')




// this codes updates the cityInfo to the DOM
const updateUI = (data) => {
    
  const {cityInfo, weatherInfo} = data
    
    // prints the result

    details.innerHTML = `<h5 class="my-3">${cityInfo.EnglishName}</h5>
    <div class="my-3">${weatherInfo.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weatherInfo.Temperature.Metric.Value}</span>
      <span>&deg;C</span>`

// update the weather icon
    const iconSrc = `img/icons/${weatherInfo.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc)
// update the night and day icon
let timeSrc = null;
if(weatherInfo.IsDayTime){
    timeSrc = 'img/day.svg'
}else{
    timeSrc = 'img/night.svg'
}
time.setAttribute('src', timeSrc)
      
}
// this code updates the city and weather info

const updateCity = async(city)=>{
    const cityInfo = await getCity(city);
    const weatherInfo = await getWeather(cityInfo.Key);

    return {cityInfo,weatherInfo};
}
// this code lsitens to the submit event

submitButton.addEventListener('click', e =>{
    e.preventDefault();

    const city =  citySearch.city.value.trim();
    citySearch.reset();

    updateCity(city).then(data =>{
        updateUI(data)
    }).catch(err =>{
        console.log(err)
    })
})