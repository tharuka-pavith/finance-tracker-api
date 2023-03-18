const express = require('express');
//Models
const UserModel = require('../models/userModel');
const BookModel = require('../models/bookModel');
const EntryModel = require('../models/entryModel');

const router = express.Router();

/**** Methods for User ****/
//Post User Method (use to create a user)
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

//Get User Method (use when user login)
router.get('/get/user/:name/:password', async (req, res) => {
    console.log(req.params);
    try{
        const data = await UserModel.find({name: req.params.name, password: req.params.password});
        if(data.length === 0){
            res.json({message: "Not found"});
        }else{
            res.json(data);
        }
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Update User by ID Method
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

//Delete User by ID Method
router.delete('/delete/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await UserModel.findByIdAndDelete(id)
        res.send(`Document with ${data.id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});


/**** Book Methods ****/

//Create new cash book
router.post('/post/book', async (req, res) => {
    console.log(req.body);
    const data = new BookModel({
        "name": req.body.name,
        "user_id": req.body.user_id
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//Get book Method
router.get('/get/book/:user_id', async (req, res) => {
    console.log(req.params);
    try{
        const data = await BookModel.find({user_id: req.params.user_id});
        if(data.length === 0){
            res.json({message: "Not found"});
        }else{
            res.json(data);
        }   
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});


/**** Entry Methods *****/

//Create new Entry
router.post('/post/entry', async (req, res) => {
    console.log(req.body);
    const data = new EntryModel({
        "book_id": req.body.book_id,
        "date": req.body.date ,
        "amount": req.body.amount,
        "remark":req.body.remark,
        "type": req.body.type //true for Cash In
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//Get all entries in a book
router.get('/get/entry/:book_id', async (req, res) => {
    console.log(req.params);
    try{
        const data = await EntryModel.find({book_id: req.params.book_id}).sort({date:-1});
        if(data.length === 0){
            res.json({message: "Not found"});
        }else{
            res.json(data);
        }
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Export router
module.exports = router;