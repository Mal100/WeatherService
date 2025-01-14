const express = require('express');
const app = express();
const weatherRoutes = require('./routes/weatherRoutes');
const swaggerUi = require('swagger-ui-express'); 
const swaggerSpec = require('./swaggerConfig');
const path = require('path');
require('dotenv').config();
     

const outputFile = './swagger_output_institution.json';
const endpointsFiles = ['./routes/weatherRoutes.js'];
const swaggerAutogen = require('swagger-autogen')();


//Serve the HTML file 
process.setMaxListeners(2000); // or any other number that makes sense for your app


app.use(express.static('public'));
 app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'))); 

// Add a route for the root URL 
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

 
app.use('/api', weatherRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
