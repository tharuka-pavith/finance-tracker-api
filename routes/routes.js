const express = require('express');
//Models
const UserModel = require('../models/userModel');

const router = express.Router();

//Post Method (use to create a user)
router.post('/post/user', async (req, res) => {
    console.log(req.body);
    const data = new UserModel({
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//Get Method (use when user login)
router.get('/get/user', async (req, res) => {
    console.log(req.body);
    try{
        const data = await UserModel.find({name: req.body.name, password: req.body.password});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Update by ID Method
router.patch('/update/user/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await UserModel.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send(result);

    }catch(error){
        res.status(400).json({ message: error.message });
    }
});

//Delete by ID Method
router.delete('/delete/user/:id', (req, res) => {
    res.send('Delete by ID API');
});

module.exports = router;