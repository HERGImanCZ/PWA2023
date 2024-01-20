const mongoose = require("mongoose")

//schéma konstrukce uživatele
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: true, 
            unique: true, 
            minlength: 3
        },
        password: {
            type: String, 
            required: true, 
            minlength: 5
        },
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;