const mailer = require("./mailer")
const mailSchema = require("../modal/mailModal");
var uniqid = require('uniqid');

const createNewTask = async (req, res) => {

    try {
        const data = {
            id: uniqid(),
            displayName:req.body.displayName,
            schedule: req.body.schedule,
            massage:req.body.massage,
            lastSucess: "",
            status: false,
            nextSchedule: ""
        }

        const mailDetails = new mailSchema(data);
        await mailDetails.save();
        mailer("5", req.body.to)
        res.json({
            success: true,
            massage: "Mail timmer scheduled, Let's complete your task!"
        });

    } catch (error) {
        res.json({
            success: false,
            massage: error.massage
        });
    }
}


const getAllSchedule = async (req, res) => {

    try {
        const data = await mailSchema.find();

        res.json({
            listOfScheduled: data,
            success: true,
            massage: "Get List of mail schedule!",
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            massage: error.massage
        })
    }
}

const editTask = async (req, res) => {
    try {
        const mailData = await mailSchema.findOne(req.body);
        const updatedDetails=await mailData.updateOne({displayName:req.body.displayName});
        res.json({
            status:updatedDetails,
            success: true,
            massage: "Get List of mail schedule!",
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            massage: error.massage
        })
    }
}

const deleteTask = async (req, res) => {

       try {
           const mailData = await mailSchema.findOne(req.body);
           const updatedDetails=await mailData.deleteOne();
           res.json({
               status:updatedDetails ,
               success: true,
               massage: "Get List of mail schedule!",
           })
   
       } catch (error) {
           res.status(404).json({
               success: false,
               massage: error.massage
           })
       }
   }

   const stopSchedule = async (req, res) => {

    try {
        const mailData = await mailSchema.findOne(req.body);
        const updatedDetails=await mailData.deleteOne();
        res.json({
            status:updatedDetails ,
            success: true,
            massage: "Get List of mail schedule!",
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            massage: error.massage
        })
    }
}


const restartSchedule = async (req, res) => {

    try {
        const mailData = await mailSchema.findOne(req.body);
        const updatedDetails=await mailData.deleteOne();
        res.json({
            status:updatedDetails ,
            success: true,
            massage: "Get List of mail schedule!",
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            massage: error.massage
        })
    }
}

const mailController = {
    getAllSchedule,
    createNewTask,
    editTask,
    deleteTask,
    stopSchedule,
    restartSchedule
}

module.exports = mailController;



















