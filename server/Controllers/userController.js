const userModel = require("../Models/userModel")
const bcrypt = require("bcryptjs");
const { request } = require("express");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtkey);
};

const loginUser = async(req, res) => {
    const  {name,password} = req.body;

    try{
        let user = await userModel.findOne({name});

        //kontrol uživatele
        if(!user) return res.status(400).json("Uživatel s tímto jménem neexistuje.");

        //kontrola hesla
        if(!await bcrypt.compare(password, user.password)) 
            return res.status(400).json("Zadané heslo je nesprávné.");

        const token = createToken(user._id);

        res.status(200).json({_id: user._id, name, token});

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const registerUser = async(req, res) => {

    try{
        const {name, password} = req.body;

        let user = await userModel.findOne({name}); //zkousíme, jestli user už neexistuje

        //výpis chyb při registraci
        if(user) return res.status(400).json("Uživatel s tímto jménem již existuje.");
        if(!name || !password) return res.status(400).json("Je potřeba zadat uživatelské jméno a heslo.");
        if(name.length < 3) return res.status(400).json("Jméno uživatele musí obsahovat alespoň 3 znaky.");
        if(password.length < 5) return res.status(400).json("Heslo se musí skládat alespoň z 5 znaků.");

        user = new userModel({name, password});

        //hashování hesla
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = createToken(user._id);

        res.status(200).json({_id: user._id, name, token});
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const findUser = async(req, res) => {
    const userId = req.params.userId;
    try{
        const user = await userModel.findById(userId);

        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const getUsers = async(req, res) => {
    try{
        const users = await userModel.find();

        res.status(200).json(users);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {loginUser, registerUser, findUser, getUsers};