const {getLatestWeatherDataByCity,getColdestDaytimeTemp, getPlacesWithZeroPrecipitation } = require('../services/getDataService.js');
const connectToDatabase = require("../DB.js");
/**
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 * @throws {Error} Error fetching weather data for the specified city.
 */
const fetchWeatherDataByCity = async (req, res) => {
  try {
    const city = req.query.city;
    console.log("getdataController", city);
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    // Fetch the data from the MongoDB collection
    const weatherData = await getLatestWeatherDataByCity('forecast', city);
     res.status(200).json(weatherData);
    } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send({ error: 'Failed to fetch data' });
  }
};






const fetchColdestDaytimeTemp = async (req, res) => {
  try {
    const { coldest, hottest } = await getColdestDaytimeTemp(db, 'AverageDaytimeTemperatureNextWeekweather');

    res.status(200).send({ coldest, hottest });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send({ error: 'Failed to fetch data' });
  }
};

const fetchPlacesWithZeroPrecipitation = async (req, res) => {
  try {
    const places = await getPlacesWithZeroPrecipitation(db, 'Past30Days');

    res.status(200).send(places);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send({ error: 'Failed to fetch data' });
  }
};

module.exports = { fetchColdestDaytimeTemp, fetchPlacesWithZeroPrecipitation,fetchWeatherDataByCity  };

