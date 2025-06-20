const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
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
    role: {
        type: String,
        default: "user"
    },
    cart: {
        type: Object,
        default: {}
    },
    image: Buffer, 
    imageMimeType: String, 
    promoCodes: {
        type: [
            {
                name: String,
                discount: String,
                appliedUsers: [mongoose.Schema.Types.ObjectId],
            }
        ],
        default: undefined
    }
});

const USER = mongoose.model('user', userSchema);

module.exports = USER;