const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    displayName: {
        type: String,
        unique: true
    },
    schedule: String,
    message: String,
    lastSuccess: String,
    status: { type: String, enum: ['running', 'stopped', 'failed', 'completed'], default: 'stopped' },
    nextSchedule: String
});

module.exports = mongoose.model('Job', jobSchema);