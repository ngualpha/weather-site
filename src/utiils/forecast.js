const request = require('request')
const chalk = require('chalk')

const forecast =(latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=6fe86e0ea64610fd014164e20ef8a521&query='+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback(chalk.red.inverse('Unable to connect to weather services.',undefined))
        }else if(body.error){
            callback(chalk.red.inverse('Unable to find data for this location. Try another search',undefined))
        }else{
            const temp = body.current.temperature
       const feelsLike = body.current.feelslike
       const units = ' degress celcius'
      const data = {
           Name: body.location.name,
           country: body.location.country,
           Region: body.location.region,
           time: body.location.localtime,
           weather: body.current
        }
        
       callback(undefined,data)
        
        }
       
    })
}

module.exports = forecast