// Писать все в Routers считается не целесообразным, чтобы он не был "толстым"
const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {

    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }   

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

}

// На выходе будет новый объект созданный из этого класса

module.exports = new TypeController()       // Через точку можно обращаться к функциям и их вызывать