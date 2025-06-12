const FOOD_MODEL = require("../models/foodModel");

const addFood = async (req, res) => {
    const image_file = req.file?.path; 
    const { name, description, price, category } = req.body;
    try {
        const food = await FOOD_MODEL.create({
            name,
            description,
            price,
            category,
            image: image_file,  
        });
        res.json({ success: true, message: "Food has been added" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error Adding Food" });
    }
};

const listFood = async (req, res) => {
    try {
        const food = await FOOD_MODEL.find({});
        res.json({ success: true, data: food });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error getting all items" });
    }
};

const removeFood = async (req, res) => {
    try {
        await FOOD_MODEL.findByIdAndDelete({ _id: req.body.id });
        res.json({ success: true, message: "Food Item has been Deleted" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error deleting food" });
    }
};

const updateFood = async (req, res) => {
    const image_file = req.file?.path;  
    const { name, description, price, category, _id } = req.body;

    try {
        const food = await FOOD_MODEL.findById(_id);

        food.name = name;
        food.description = description;
        food.price = price;
        food.category = category;

        if (image_file) {
            food.image = image_file;
        }

        await food.save();

        res.json({ success: true, message: "Food has been updated" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error updating food" });
    }
};

module.exports = {
    addFood,
    listFood,
    removeFood,
    updateFood,
};
