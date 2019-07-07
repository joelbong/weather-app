const request = require('request');

function geocode(address, callback) {
    const url =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoiam9lbGJvbmciLCJhIjoiY2p4bmlnNjBxMDhnYTNjbGRoZ2gzb3o5MyJ9.guolhkw0PlInRUNZgK5iGQ&limit=1`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.features.length == 0) {
            callback('Unable to find area, try another location', undefined);
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            });
        };
    });
};

module.exports = geocode;