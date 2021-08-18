const WeatherForm = document.querySelector('form')
WeatherForm.addEventListener('submit', (e)=>{
const location = document.querySelector('input').value
const err =  document.querySelector('#err')
const res = document.querySelector('#res')
const res1 = document.querySelector('#res1')

e.preventDefault()
res.textContent = 'Loading...'
fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            err.textContent=data.error
        }else{
         res.innerHTML= '<table><tr><td id="des">Temperature:</td><td> '+data.Data.weather.temperature+' degrees celcius</td></tr>'
                        +'<tr><td id="des">Weather description: </td><td>'+data.Data.weather.weather_descriptions[0]+'</td></tr>'
                        + '<tr><td id="des">Percentage chance of rain:</td><td> '+data.Data.weather.precip+'</td></tr>'
                        + '<tr><td id="des">Wind_Speed:</td><td> '+data.Data.weather.wind_speed+'</td></tr>'
                        + '<tr><td id="des">Cloud Cover:</td><td> '+data.Data.weather.cloudcover+'</td></tr>'
                        + '<tr><td id="des">Apparent Temperature:</td><td> '+data.Data.weather.feelslike+' degrees celcius</td></tr>'
                        + '<tr><td id="des">Wind direction:</td><td> '+data.Data.weather.wind_dir+'</td></tr>'//new row
                        + '<tr><td id="des">Wind degree:</td><td> '+data.Data.weather.wind_degree+'</td></tr>'//new row
                        + '<tr><td id="des">Visibility:</td><td> '+data.Data.weather.visibility+'</td></tr>'//new row
                        + '<tr><td id="des">Local time:</td><td> '+data.Data.loctime+'</td></tr></table>'//new row
                        + '<img id="wico" src='+data.Data.weather.weather_icons[0]+' alt="weather_icon">'
         res1.innerHTML= data.location 

                           + '<br>' + 'latitude: '+data.Data.latitude
                           +',<br> Longitude: '+ data.Data.longitude
        }
    })
})
})