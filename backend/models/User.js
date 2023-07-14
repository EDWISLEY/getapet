const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = mongoose.model(
    'User',
    new Schema(
        {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        userResetPassToken: {
            type: String,
            selected: false,
        },
        userResetPassExpires: {
            type: Date,
            selected: false,
        },
        image: {
            type: String,
        },
        
        },
        { timestamp: true}
    ),
)

module.exports = User