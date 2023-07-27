const request = require("request");

const geocode = (location, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiZS1tdXN0YWZhIiwiYSI6ImNsa2VuaDRveTFjbmEzbHRqMHZic252dDYifQ.pm8umeldARavF9wnc9K2fw`;

	request({ url, json: true }, (error, res) => {
		if (error) {
			callback("Unable to connect to geocode service", undefined);
		} else if (res.body.message) {
			callback(`Error from Geocoding API ${res.body.status}: ${res.body.message}`, undefined);
		} else if (res.body.features.length == 0) {
			callback("Unable to find this location", undefined);
		} else {
			const data = {
				latitude: res.body.features[0].geometry.coordinates[1],
				longitude: res.body.features[0].geometry.coordinates[0],
			};
			callback(undefined, data);
		}
	});
};


module.exports = geocode;