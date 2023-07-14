const mongoose = require('../db/conn')
const { Schema } = mongoose

const Pet = mongoose.model(
    'Pet',
    new Schema(
        {
            name: {
                type: String,
                required: true,
            },
            age: {
                type: Number,
                required: true,
            },
            weight: {
                type: Number,
                required: true,
            },
            breed: {
                type: String,
                required: true,
            },
            color: {
                type: String,
                required: true,
            },
            images: {
                type: Array,
                required: true,
            },
            available: {
                type: Boolean,
            },
            user: Object, //user => informações do usuário que está adotando
            adopter: Object //adopter => quem está adotando 
        },
        { timestamp: true},
    ),
)

module.exports = Pet