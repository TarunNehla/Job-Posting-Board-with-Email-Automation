const express = require('express');
const router = express.Router();
const JobModel = require('../models/jobModel');
const { authenticate } = require('../Middleware/authMiddleware')

router.post('/job-post',authenticate, async (req, res) => {
    try {
        const { userId,title, description, experienceLevel, candidates, endDate } = req.body;
        console.log('value of req.body : ', title, description, experienceLevel, candidates, endDate);
        const newJob = new JobModel({ userId,title, description, experienceLevel, candidates, endDate });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ message: 'error while creating job', error });
    }
});

router.delete('/job-delete/:id', authenticate, async (req,res) => {
    try {
        const jobId = req.params.id;
        const deletedJob = await JobModel.findByIdAndDelete(jobId);
        if(!deletedJob){
            return res.status(404).json({message : 'job not found'});
        }
        res.status(200).json({message : 'job delete Succussfully'});
    } catch (error) {
        res.status(500).json({message:'error while deleting job', error});
    }
})

router.get('/all-jobs', async (req,res) => {
    try {
        const jobs = await JobModel.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({message : 'failed to fetch jobs'});
    }
})






module.exports = router;