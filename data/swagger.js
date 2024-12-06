const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'A simple API for managing users and their contact information',
            contact: {
                name: 'Support Team',
                url: 'https://example.com/contact',
                email: 'support@example.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3001', // Replace with your production URL when deploying
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['email', 'firstname', 'lastname', 'favoritecolor', 'birthday'],
                    properties: {
                        email: {
                            type: 'string',
                            description: 'The user email address',
                        },
                        firstname: {
                            type: 'string',
                            description: 'The user firstname',
                        },
                        lastname: {
                            type: 'string',
                            description: 'The user last name',
                        },
                        favoritecolor: {
                            type: 'string',
                            description: 'The user fav color',
                        },
                        birthdate: {
                            type: 'string',
                            description: 'The user date of birth',
                        },
                    },
                    example: {
                        email: 'example@example.com',
                        firstname: 'john',
                        lastname: 'doe',
                        favoritecolor: 'red',
                        birthdate: '01/02/2000'
                    },
                },
                
            },
        },
    },
    apis: ['./routes/*.js'], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const swaggerUiSetup = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = swaggerUiSetup;



