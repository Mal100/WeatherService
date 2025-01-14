const weatherService = require("../services/weatherService");
const axios = require("axios");


/**
 * Fetches weather data for a specified city.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 * @throws {Error} Error fetching weather data for the specified city.
 */
const getWeatherData = async (req, res) => {
  console.log('getWeatherData');
  const city = req.query.city;

  console.log("getWeatherData", city);
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }
  try {
    const weatherData = await weatherService.fetchWeatherData(city);
     await weatherService.saveWeatherData(weatherData,'forecast');
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWeatherDataForPast30Days = async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }
  try {
    const weatherData = await weatherService.getWeatherDataForPast30Days(city);
    await weatherService.saveWeatherData(weatherData,'Past30Days');
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAverageDaytimeTemperatureForNextWeek = async (req, res) => {
  const cityName = req.query.city;

  if (!cityName) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const averageTemp =
      await weatherService.getAverageDaytimeTemperatureForNextWeek(cityName);
      await weatherService.saveWeatherData(averageTemp,'averageDaytimeTemp');
    res.status(200).json(averageTemp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getWeatherData,
  getWeatherDataForPast30Days,
  getAverageDaytimeTemperatureForNextWeek,
  // addWeatherData,
  // insertWeatherData
};

// Example usage
///whats
// getWeatherDataForPast30Days('Swiss').then(data => {
//   console.log('Historical weather data:', data);
// });
