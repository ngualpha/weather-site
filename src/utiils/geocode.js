const request = require('request')


const geocode = (address,callback)=>{
    const geocodeUrl = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoibmd1YWxwaGEiLCJhIjoiY2tyNmpxeXNxM2diaDMxbzZ2OWcyMGVmdiJ9.hVp4fyfp4PKdZpwV4qWZgA&limit=1'
    request({url:geocodeUrl,json:true},(error,{body})=>{
       if(error){
            callback('Unable to connect to locations services',undefined)
       }else if(body.features.length ===0){
             callback('Unable to find data for this location. Try another search',undefined)
       }else{
           const placeNm = body.features[0].place_name
           const latitude = body.features[0].center[1]
           const longitude = body.features[0].center[0]
           callback(undefined,{
               location: placeNm,
               latitude,
               longitude
           })
       }
    })
    
   }

   module.exports = geocode
   