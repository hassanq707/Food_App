const FOOD_MODEL = require("../models/foodModel");
const { cloudinary } = require("../config/cloudinary");

const addFood = async (req, res) => {
    const { name, description, price, category } = req.body;
    try {
        const food = await FOOD_MODEL.create({
            name,
            description,
            price,
            category,
            image: {
                url: req.file.path,          
                public_id: req.file.filename 
            },
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
    const { id, public_id } = req.body;
    try {
        await FOOD_MODEL.findByIdAndDelete(id);
        if (public_id) {
            await cloudinary.uploader.destroy(public_id);
        }
        res.json({ success: true, message: "Food Item has been Deleted" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error deleting food" });
    }
};

const updateFood = async (req, res) => {
    const { name, description, price, category, _id, oldimage } = req.body;
    try {
        const food = await FOOD_MODEL.findById(_id);
        food.name = name;
        food.description = description;
        food.price = price;
        food.category = category;

        if (req.file) {
            if (oldimage) {
                await cloudinary.uploader.destroy(oldimage);
            }
            food.image = {
                url: req.file.path,
                public_id: req.file.filename
            };
        }
        await food.save();
     res.json({ success: true, message: "Food has been updated", updatedItem: food });
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
