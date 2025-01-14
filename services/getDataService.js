const axios = require('axios'); 
const https = require('https');
const {connectToDatabase,client} = require('../DB.js');


const getLatestWeatherDataByCity = async (collectionName, city) => {
console.log('getLatestWeatherDataByCity', collectionName, city);
  try {
    const db = await connectToDatabase();
    // const collection = db.collection(collectionname);
    console.log('db', collectionName, city);
    const cursorfindcity = db.collection(collectionName).find({ city: city });
    if(cursorfindcity!=null){
    const cursor = db.collection(collectionName).find({ city: city }).sort({ _id: -1 }).limit(1);
    const results = await cursor.toArray();
    console.log('results', results.data, 'only results',results);
    if (results != null) {
      return results;
    }
  }
  } catch (error) {
    throw new Error(`Error fetching data for ${city}: ${error.message}`);
  }
};
  
 
  

  const getColdestDaytimeTemp = async (db, collectionName) => {
    const cursorMin = db.collection(collectionName).find().sort({ "AverageDaytimeTemperatureNextWeek": -1 }).limit(1);
    const coldest = await cursorMin.toArray();
    const cursorMax = db.collection(collectionName).find().sort({ "AverageDaytimeTemperatureNextWeek": 1 }).limit(1);
    const hottest = await cursorMax.toArray();
    return { coldest, hottest };
  };

  
  const getPlacesWithZeroPrecipitation = async (db, collectionName) => {
    const cursor = db.collection(collectionName).find({
      precipitation_sum: { $eq: 0 },
      date: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
    });
    const results = await cursor.toArray();
    return results;
  };
  
  module.exports = { getColdestDaytimeTemp, getPlacesWithZeroPrecipitation,  getLatestWeatherDataByCity };
  