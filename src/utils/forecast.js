const request = require('request');

function forecast({longitude, latitude}, callback) {
    const url = `https://api.darksky.net/forecast/3e5a9d5f40f786b294cf92bc315b23cf/${longitude}, ${latitude}?units=si`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (!body.currently) {
            callback('Unable to find temperature for this area', undefined);
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                humidity: body.currently.humidity,
                summary: body.currently.summary
            });
        };
    });
};

module.exports = forecast;