const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        enum: ['BEGINNER', 'INTERMEDIATE', 'EXPERT'],
        required: true
    },
    candidates: [{
        type: String,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    }],
    endDate: {
        type: Date,
        required: true
    }
});

JobSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject.__v
    }
})

const JobModel = mongoose.model('Job', JobSchema);
module.exports = JobModel;