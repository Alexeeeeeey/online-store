const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Online Store API',
      version: '1.0.0',
      description: 'API documentation for the Online Store project',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Укажите ваш сервер
      },
    ],
  },
  apis: ['./swagger/*.swagger.js'], // Подключаем все файлы из папки swagger
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};