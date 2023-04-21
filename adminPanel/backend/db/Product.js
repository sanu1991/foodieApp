const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userId: String,
    resName: String,
    resImg: String,
    location: String,
    state: String,
    PhNo: Number,
    cuisines: Array,
    costForTwo: Number,
    menu: Array
})

module.exports = mongoose.model("products",userSchema);