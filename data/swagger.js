const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API for managing users',
      contact: {
        name: 'Your Name',
        url: 'http://example.com',
        email: 'your-email@example.com',
      },
    },
    servers: [
      {
        url: 'https://project3-addk.onrender.com/', // Change the URL based on where your API is hosted
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'The email of the user',
            },
            firstname: {
              type: 'string',
              description: 'The first name of the user',
            },
            lastname: {
              type: 'string',
              description: 'The last name of the user',
            },
            favoritecolor: {
              type: 'string',
              description: 'The favorite color of the user',
            },
            birthdate: {
              type: 'string',
              format: 'date',
              description: 'The birthdate of the user',
            },
          },
          required: ['email', 'firstname', 'lastname', 'favoritecolor', 'birthdate'],
        },
      },
    },
  },
  apis: ['./routes/userRoutes.js'], // Add the path to your routes file where you defined Swagger annotations
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerUiSetup = (app) => {
  // Serve Swagger API docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerUiSetup;
