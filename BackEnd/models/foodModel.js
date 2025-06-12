const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true, 
    },
    price : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    }
})

const FOOD_MODEL = mongoose.models.food || mongoose.model('food',foodSchema)

module.exports = FOOD_MODEL