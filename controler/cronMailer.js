const cron = require('node-cron');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

let jobs = {}; 

const mailer = async (jobName, schedule, to) => {
    console.log(jobName);
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.your_email,
            pass: process.env.your_pass 
        }
    });


    jobs[jobName] = cron.schedule(schedule, () => {
        const mailOptions = {
            from: process.env.your_email,
            to: to,
            subject: 'Reminder',
            text: 'This is your reminder sent based on the schedule!'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error('Error sending email:', error);
            }
            console.log('Email sent: ' + info.response);
        });
        console.log("Task is running!");
    });
    
    console.log(`Cron job ${jobName} started with schedule ${schedule}.`);
};

const stopCronJob = (jobName) => {
    if (jobs[jobName]) {
        jobs[jobName].stop();
        console.log(`Cron job ${jobName} stopped.`);
    } else {
        console.log(`No cron job found with name ${jobName}.`);
    }
};

const restartCronJob = (jobName, schedule, to) => {
    stopCronJob(jobName);
    mailer(jobName, schedule, to);
};

module.exports = { mailer, stopCronJob, restartCronJob };