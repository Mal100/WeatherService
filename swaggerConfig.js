const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather Service API',
      version: '1.0.0',
      description: 'A simple API to fetch weather data for a specified city',
    },
    servers: [
      {
        url: 'http://localhost:3000/api-docs',
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
