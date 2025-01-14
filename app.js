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

///DB 

const { CosmosClient } = require("@azure/cosmos");
const { DefaultAzureCredential } = require("@azure/identity");
const endpoint = process.env.COSMOS_ENDPOINT;
const credential = new DefaultAzureCredential();

// const cosmosClient = new CosmosClient({ 
//     endpoint, 
//     aadCredentials: credential
// });

// const { CosmosClient } = require('@azure/cosmos');
// const { DefaultAzureCredential,ManagedIdentityCredential } = require("@azure/identity");
// // const credential = new DefaultAzureCredential();
// const credential = new ManagedIdentityCredential();


// const cosmosClient = new CosmosClient({ 
//     endpoint,
//     aadCredentials: credential
// });

// connectToCosmosDB();

// const databaseName = 'WeatherForecastDB';
// cosmosClient.databases.createIfNotExists({ id: databaseName });

// const {statusCode, database } =
// console.log(`Database created with status code: ${statusCode}`);
// console.log(`Database created with status code: ${database}`);

//  const client = new CosmosClient({ connectionString });
// const endpoint = process.env.COSMOS_ENDPOINT;
// console.log(endpoint);
// const key =process.env.COSMOS_KEY;
// console.log(key);
// const client = new CosmosClient({ endpoint, key });

// const connectionString = 'https://lud.documents.azure.com:443/;AccountKey=AT4MIbEhOVQON40wqlbO1vW1M0CvCr8PRrd1psF84AcipdFvYV72shtht5fYbKVhMaIUeFEgNe3VACDb6E6Xcg==';

// const client = new CosmosClient({ connectionString });
// async function createContainer() {
//     const database = client.database('WeatherForecastDB');
  
//     const containerName = 'WeatherForecast';

//     // Create the container if it doesn't exist
//     const { statusCode, container } = await database.containers.createIfNotExists({ id: containerName });
//     console.log(`Container created with status code: ${statusCode}`);
// }

// createContainer().catch(err => {
//     console.error(err);
// });

///DB end


// app.use('/api-docs-institution', swaggerUi.serveFiles(institutionSwagger), swaggerUi.setup(institutionSwagger));
//Add a route for the root URL
// app.get('/', (req, res) => {
//   res.send('Welcome to Weather API');
// });

//Serve the HTML file 
process.setMaxListeners(2000); // or any other number that makes sense for your app


app.use(express.static('public'));
 app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'))); 

// Add a route for the root URL 
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });


 
 
// swaggerAutogen(outputFile, endpointsFiles
   
// )


 

 
 
// swaggerAutogen(outputFile, endpointsFiles
   
// )

app.use('/api', weatherRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
