const mongoose = require("mongoose");
const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true},
    desc: { type: String},
    img: { type: String, required: true },
    steps: { type: Array ,required: true},
    ingredients: { type: Array,required: true },
    user_id: { type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.model("Recipe", RecipeSchema);