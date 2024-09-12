const cron = require('node-cron');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

const mailer=async(timer,to)=>{
    console.log(timer,to);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.your_email,
            pass: process.env.your_pass 
        }
    });
    
    
    cron.schedule('*/1 * * * *', () => {
        const mailOptions = {
            from: process.env.your_email,
            to: to,
            subject: 'Reminder',
            text: 'This is your reminder sent every minute!'
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error('Error sending email:', error);
            }
            console.log('Email sent: ' + info.response);
        });
        console.log("Task is running!");
    });
    console.log("Cron job started. Waiting for scheduled tasks...");
}
const stopCronJob = () => {
    if (cronJob) {
        cronJob.stop();
        console.log("Cron job stopped.");
    } else {
        console.log("No cron job is currently running.");
    }
};

const restartCronJob = async (timer, to) => {
    stopCronJob();
    await mailer(timer, to); 
};

module.exports={mailer,stopCronJob,restartCronJob};
