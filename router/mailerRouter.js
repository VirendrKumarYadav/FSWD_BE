const express=require("express");
const mailController=require("../controler/MailerContoller")
const router=express.Router();

router.get("/",mailController.getAllSchedule)

router.post("/add-task",mailController.createNewTask);
router.patch("/edit",mailController.editTask);
router.patch("/remove",mailController.deleteTask);

module.exports=router;   