const mongoose = require("mongoose");

const scheduledSchema = new mongoose.Schema({
    id: {
        type: String,
        require: false,
        unique:true,
        default: ""

    },
    displayName: {
        type: String,
        require: false,
        default: ""
    },
    schedule: {
        type: String,
        require: false,
        default: ""
    },
    massage: {
        type: String,
        require: false,
        default: ""
    },
    lastSucess: {
        type: String,
        require: false,
        default: ""
    },
    status: {
        type: Boolean,
        require: false,
        default: ""
    },
    nextSchedule:{
        type: String,
        require: false,
        default: ""
    },

})

module.exports = mongoose.model("mail_schedule", scheduledSchema);
