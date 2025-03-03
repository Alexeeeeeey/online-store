// Писать все в Routers считается не целесообразным, чтобы он не был "толстым"
const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {

    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }     

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

}

// На выходе будет новый объект созданный из этого класса

module.exports = new BrandController()       // Через точку можно обращаться к функциям и их вызывать