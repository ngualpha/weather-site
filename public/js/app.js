const WeatherForm = document.querySelector('form')
WeatherForm.addEventListener('submit', (e)=>{
const location = document.querySelector('input').value
const err =  document.querySelector('#err')
const res = document.querySelector('#res')
const res1 = document.querySelector('#res1')

e.preventDefault()
res.textContent = 'Loading...'
res1.textContent = 'Loading...'
fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            err.textContent=data.error
        }else{
         res.innerHTML= '<table><tr><td id="des">Temperature:</td><td class="dta"> '+data.Data.weather.temperature+' degrees celcius</td></tr>'
                        +'<tr><td id="des">Weather description: </td><td class="dta">'+data.Data.weather.weather_descriptions[0]+'</td></tr>'
                        + '<tr><td id="des">Precipitation:</td><td class="dta"> '+data.Data.weather.precip+' milimeters</td></tr>'
                        + '<tr><td id="des">Wind_Speed:</td><td class="dta"> '+data.Data.weather.wind_speed+' km/h</td></tr>'
                        + '<tr><td id="des">Cloud Cover:</td><td class="dta"> '+data.Data.weather.cloudcover+' percent</td></tr>'
                        + '<tr><td id="des">Humidity:</td><td class="dta"> '+data.Data.weather.humidity+' percent</td></tr>'
                        + '<tr><td id="des">Pressure:</td><td class="dta"> '+data.Data.weather.pressure+' millibars</td></tr>'
                        + '<tr><td id="des">Apparent Temperature:</td><td class="dta"> '+data.Data.weather.feelslike+' degrees celcius</td></tr>'
                        + '<tr><td id="des">Wind direction:</td><td class="dta"> '+data.Data.weather.wind_dir+'</td></tr>'//new row
                        + '<tr><td id="des">Wind degree:</td><td class="dta"> '+data.Data.weather.wind_degree+'</td></tr>'//new row
                        + '<tr><td id="des">Visibility:</td><td class="dta"> '+data.Data.weather.visibility+' km</td></tr>'//new row
                        + '<tr><td id="des">Local time:</td><td class="dta">'+data.Data.loctime+'</td></tr></table>'//new row
                        + '<img id="wico" src='+data.Data.weather.weather_icons[0]+' alt="weather_icon">'
         res1.innerHTML= data.location 

                           + '<br>' + 'latitude: '+data.Data.latitude
                           +',<br> Longitude: '+ data.Data.longitude
        }
    })
})
})