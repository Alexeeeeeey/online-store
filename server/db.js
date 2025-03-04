const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    String(process.env.DB_PASSWORD), // Пароль должен быть строкой
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialectOptions: {
            ssl: {
                require: true,  // Требуется SSL-соединение
                rejectUnauthorized: false,  // Отключаем проверку сертификатов, если необходимо
            },
        },
    }
);
