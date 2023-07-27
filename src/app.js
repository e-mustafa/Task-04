const geocode = require("./data/geocode");
const forecast = require("./data/forecast");

const location = process.argv[2];

geocode(location, (error, data) => {
	console.error("Error: ", error);
	console.log("data: ", data);

	if (data) {
		forecast(data.latitude, data.longitude, (error, data) => {
			console.error("Error: ", error);
			console.log("Data: ", data);
		});
	} else {
		console.error("Unable to find data for Location");
	}
});


// geocode(location, (g_error, g_data) => {
// 	weatherData = { latitude: g_data.latitude, longitude: g_data.longitude, error: g_error };

// 	if (g_data) {
// 		forecast(g_data.latitude, g_data.longitude, (error, data) => {
// 			weatherData = { ...weatherData, inf: data, error: error };
// 		});
// 	} else {
// 		console.error("Unable to find data for Location");
// 	}
// });


////////////////////////////////////////////////////////

const express = require("express");
const path = require("path")

const app = express();

const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");
const viewsDirectory = path.join(__dirname, "../weather/views");
console.log(viewsDirectory);
app.set("views", viewsDirectory);

app.get("/", (req, res) => {
	res.render("index", { title: "Home Page", welcome: "Welcome in weather app home page " });
});

app.get("/check-weather", (req, res) => {
	res.render("checkWeather", {
		title: "Check Weather",
		latitude: 26.4941838299718,
		longitude: 29.871903452398,
		country:"Egypt",
		status:"clear",
		temp:"33"
	});
});



// -------------------------------------------

const hbs = require("hbs")
const partialsPath = path.join(__dirname, "../weather/partials")
hbs.registerPartials(partialsPath)
app.use(express.static(__dirname + "../public"));
console.log(__dirname );

app.listen(port,()=>{
	console.log(`Example app listen on port ${port}`);
})