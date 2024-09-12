const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    id: String,
    displayName: String,
    schedule: String,
    message: String,
    lastSuccess: String,
    status: { type: String, enum: ['running', 'stopped', 'failed', 'completed'], default: 'stopped' },
    nextSchedule: String
});

module.exports = mongoose.model('Job', jobSchema);