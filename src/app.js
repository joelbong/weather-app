// Built in modules
const path = require('path');
const hbs = require('hbs');

// Exported modules
const express = require('express');

// Own modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

// Global variables
const app = express();

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'André Bongima'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'André Bongima'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This site gives information about the weather',
        name: 'André Bongima'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        };

        forecast({longitude, latitude}, (error, {temperature, humidity} = {}) => {
            if (error) {
                return res.send({
                    error
                });
            };
            
            res.send({
                location,
                temperature,
                humidity
            });
        });
    });
})

app.get('help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorText: 'Help artile not found',
        name: 'André Bongima'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorText: 'Page not found',
        name: 'André Bongima'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})