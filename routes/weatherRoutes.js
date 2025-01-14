const express = require('express');
const router = express.Router();
exports.router = router;
const weatherController = require('../controllers/weatherController');
const getDataController = require('../controllers/getdataController');






/**
 * @swagger
{
  "swagger": "2.0",
  "info": {
    "title": "My API",
    "description": "Description",
    "version": "1.0.0"
  },
  "host": "localhost:3005",
  "basePath": "/",
  "schemes": [
    "http"
  ],
  "paths": {
    "/forecast": {
      "get": {
        "description": "",
        "parameters": [
          {
            "name": "city",
            "in": "query",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/past30forecast": {
      "get": {
        "description": "",
        "parameters": [
          {
            "name": "city",
            "in": "query",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/average-daytime-temperature": {
      "get": {
        "description": "",
        "parameters": [
          {
            "name": "city",
            "in": "query",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/data": {
      "get": {
        "description": "",
        "parameters": [
          {
            "name": "city",
            "in": "query",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/data/coldest_hottest": {
      "get": {
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/data/zero-precipitation": {
      "get": {
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    }
  }
}

 */

router.get('/forecast', weatherController.getWeatherData);
router.get('/past30forecast', weatherController.getWeatherDataForPast30Days);
router.get('/average-daytime-temperature', weatherController.getAverageDaytimeTemperatureForNextWeek);


router.get('/data', getDataController.fetchWeatherDataByCity);
// router.get('/api/places', getDataController\.fetchPlacesByStatusAndQty);
router.get('/data/coldest_hottest', getDataController.fetchColdestDaytimeTemp);
router.get('/data/zero-precipitation', getDataController.fetchPlacesWithZeroPrecipitation);

module.exports = router;

