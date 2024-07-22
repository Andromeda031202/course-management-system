require("dotenv").config();
const express = require('express');
const router = express.Router();
const { Student } = require("../models/student");

router.post("/", async(req, res) => {
    try{
        const student = await new Student({
            ...req.body
        }).save();
        return res.status(201).send({ success: true })
    }catch(error){
        return res.status(400).send({ error: error })
    }
}).post("/login", async(req, res) => {
    try{
        const student = await Student.findOne({userName: req.body.userName, password: req.body.password});
        if(!student)
        return res.status(200).send({ success: false })
        if(student.password===req.body.password)
        return res.status(200).send({ success: true, userType: "Student", id: student._id})
        
        return res.status(200).send({ success: false })
    }catch(err){
        return res.status(400).send({ error: err })
    }
})

module.exports = router
