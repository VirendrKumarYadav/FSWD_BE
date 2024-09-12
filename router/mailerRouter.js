const express = require("express");
const mailController = require("../controler/MailerContoller");
const router = express.Router();

router.get("/", mailController.getAllSchedule);
router.post("/add-task", mailController.createNewTask);
router.patch("/edit", mailController.editTask);
router.delete("/remove", mailController.deleteTask); 
router.patch("/stop", mailController.stopSchedule);
router.patch("/restart", mailController.restartSchedule);

module.exports = router;