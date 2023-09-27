const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        joining: {
            type: Date,
            default: Date.now
        }
    }
)

const user = model('user', userSchema)
module.exports = user