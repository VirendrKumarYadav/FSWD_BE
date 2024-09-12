const mailer = require("./mailer");
const uniqid = require('uniqid');

const jobSchema = require("../modal/mailModal");

const getAllSchedule = async (req, res) => {
    try {
        const data = await jobSchema.find();
        res.json({
            listOfScheduled: data,
            success: true,
            message: "Retrieved the list of scheduled jobs."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred while retrieving scheduled jobs."
        });
    }
};

const editTask = async (req, res) => {
    try {
        const { displayName, ...updateFields } = req.body;
        const jobData = await jobSchema.findOne({ displayName });

        if (!jobData) {
            return res.status(404).json({
                success: false,
                message: "Job not found."
            });
        }

        const updatedDetails = await jobData.updateOne(updateFields);
        res.json({
            status: updatedDetails,
            success: true,
            message: "Job updated successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred while updating the job."
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { displayName } = req.body;
        const jobData = await jobSchema.findOne({ displayName });

        if (!jobData) {
            return res.status(404).json({
                success: false,
                message: "Job not found."
            });
        }

        const deletedDetails = await jobData.deleteOne();
        res.json({
            status: deletedDetails,
            success: true,
            message: "Job deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred while deleting the job."
        });
    }
};

const createNewTask = async (req, res) => {
    try {
        const data = {
            id: uniqid(),
            displayName: req.body.displayName,
            schedule: req.body.schedule,
            message: req.body.message,
            lastSuccess: "",
            status: 'running', // Set initial status to running
            nextSchedule: ""
        };

        const jobDetails = new jobSchema(data);
        await jobDetails.save();
        mailer(data.displayName, data.schedule, req.body.to); // Start the job
        res.json({
            success: true,
            message: "Job scheduled. Let's complete your task!"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred while scheduling the job."
        });
    }
};

const stopSchedule = async (req, res) => {
    try {
        const { displayName } = req.body;
        const jobData = await jobSchema.findOne({ displayName });

        if (!jobData) {
            return res.status(404).json({
                success: false,
                message: "Job not found."
            });
        }

        mailer.stopCronJob(displayName);

        jobData.status = 'stopped';
        await jobData.save();

        res.json({
            success: true,
            message: "Scheduled job stopped successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred while stopping the job."
        });
    }
};

const restartSchedule = async (req, res) => {
    try {
        const { displayName } = req.body;
        const jobData = await jobSchema.findOne({ displayName });

        if (!jobData) {
            return res.status(404).json({
                success: false,
                message: "Job not found."
            });
        }

        mailer.restartCronJob(displayName, jobData.schedule, req.body.to);

        jobData.status = 'running';
        await jobData.save();

        res.json({
            success: true,
            message: "Scheduled job restarted successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred while restarting the job."
        });
    }
};

const mailController = {
    getAllSchedule,
    createNewTask,
    editTask,
    deleteTask,
    stopSchedule,
    restartSchedule
};

module.exports = mailController;