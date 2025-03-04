// Подключаем dotenv и path ПРАВИЛЬНО
require('dotenv').config();
const path = require('path'); // Импортируем path здесь
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHardlingMiddleware');
const swaggerSetup = require('./swagger');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// Обслуживание статических файлов из папки "static"
app.use(express.static(path.resolve(__dirname, 'static')));

// Обслуживание статических файлов из папки "client/build"
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(fileUpload({}));
app.use('/api', router);

// Настройка Swagger
swaggerSetup(app);

// Обработка ошибок
app.use(errorHandler);

// Все запросы перенаправляем на index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();