const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utiils/geocode')
const forecast = require('./utiils/forecast')

// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialspath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index', {
        title:'Weather App',
        Name: 'Ngu Alpha',
        txt: 'Home'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title:'Weather App',
        Name: 'Ngu Alpha',
        txt:'Infos'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title:'Weather App',
        Name: 'Ngu Alpha',
        txt: 'Help'
    })
})


app.get('/Weather',(req,res)=>{
    if(!req.query.address){
        return res.send('An address is required in the search query!')
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
           return res.send({error})
        }
       
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return  res.send({error})
            }
            res.send({
                Data:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     Location: req.query.address,
    //     Weather: 'Partly Cloudy'
    // })
})
app.get('/help/*',(req,res)=>{
    res.render('nohelp',{
        title:'Help Error',
        txt: 'Help error'
    })
})

app.get('*',(req,res)=>{
    res.render('er404',{
        title:'Erroe 404',
        txt: '404'
    })
})
// Server is listening to port 3000, callback to print running message can be viewded in console
app.listen(3000,()=>{
    console.log('Server is up and running on port 3000')
})
