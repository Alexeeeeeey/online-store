const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

// Передаем вторым параметром передаем соответствующую функцию (передаем объектом, а не функцией "()" )

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check) // Проверка авторизации пользователя (по JWT токену)


module.exports = router