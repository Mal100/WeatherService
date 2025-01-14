
const axios = require('axios'); 
const https = require('https');
const {connectToDatabase,client} = require('../DB.js');
const getCityCoordinates = async (city) => {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false, });
  try {
    const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search`, {
      params: {
        name: city,
        count: 1,
        format: 'json'
      }
    , httpsAgent, });
    const data = response.data;
    if (data.results && data.results.length > 0) {
      const { latitude, longitude } = data.results[0];
      return { latitude, longitude };
    } else {
      throw new Error(`No coordinates found for ${city}`);
    }
  } catch (error) {
    throw new Error(`Error fetching coordinates for ${city}: ${error.message}`);
  }
};

const fetchWeatherData = async (city) => {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false, });
  const { latitude, longitude } = await getCityCoordinates(city);
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
      params: {
        latitude,
        longitude,
        current_weather: true,
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum'
      }
    
    , httpsAgent, });
    response.data.city=response.data.city = city;
    console.log(response.data.city = city);
    return response.data;
    
  } catch (error) {
    throw new Error(`Error fetching weather data for ${city}: ${error.message}`);
  }
};

const saveWeatherData = async (weatherData, collectionname) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(collectionname);
    const result = await collection.insertOne(weatherData);
    console.log('Weather data stored:', result.insertedId);
  } catch (error) {
    console.error('Error storing weather data:', error);
  } finally {
    // await client.close();
  }
};


const getWeatherDataForPast30Days = async (city) => {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false, });
  try {
    if (city) {

      const { latitude, longitude } = await getCityCoordinates(city);
      const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude,
          longitude,
          daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
          past_days: 31,
          forecast_days: 0,
        },
       httpsAgent,});
       const weatherData = weatherResponse.data.city = city;
      console.log(weatherData.data);
      return weatherResponse.data;
    } else {
      throw new Error(`No coordinates found for ${city}`);
    }
  } catch (error) {
    throw new Error(`Error fetching historical weather data for ${city}: ${error.message}`);
  }
};

/**
 * Fetches the weather forecast for the next 7 days for a specified city and calculates the average daytime temperature.
 * @param {string} city - The name of the city.
 * @returns {Promise<object>} A promise that resolves with an object containing the average daytime temperature.
 * @throws {Error} Error fetching weather forecast data for the specified city.
 */
const getAverageDaytimeTemperatureForNextWeek = async (city) => {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false, });
 try{
  const { latitude, longitude } = await getCityCoordinates(city);
        const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
        params: {
          latitude,
          longitude,
          daily: 'temperature_2m_max',
          forecast_days: 7
        }
        , httpsAgent, });
      
      const weatherData = weatherResponse.data.daily;
      const temperatures = weatherData.temperature_2m_max;
      weatherData.city = city;
      weatherData.currentDatetime = weatherData.requestTime = new Date().toISOString;
      const AverageDaytimeTemperatureForNextWeek = (temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length).toFixed(2);
      weatherData.AverageDaytimeTemperatureNextWeek = AverageDaytimeTemperatureForNextWeek;
      return { weatherData: weatherData };
    
  } catch (error) {
    throw new Error(`Error fetching weather forecast data for ${city}: ${error.message}`);
  }
};
// const insertWeatherData = async (db, collectionName, weatherData) => {
//   const result = await db.collection(collectionName).insertOne(weatherData);
//   return result.insertedId;
// };




module.exports = {
  fetchWeatherData,
  getWeatherDataForPast30Days,
  getAverageDaytimeTemperatureForNextWeek,
  saveWeatherData,
  // saveAvaragedDaytimeTemperature
};


// //Example usage
// getWeatherDataForPast30Days('Swiss').then(data => {
//   console.log('Historical weather data:', data);
// });


// fetchWeatherData('Jerusalem').then(data => {
//   console.log('fetchWeatherData:', data);
// });


// getAverageDaytimeTemperatureForNextWeek('Jerusalem').then(data => {
//   console.log('getAverageDaytimeTemperatureForNextWeek:', data);
// });

