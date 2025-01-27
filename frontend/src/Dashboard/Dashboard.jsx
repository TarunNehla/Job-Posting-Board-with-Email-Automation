import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchJobs } from '../api';
import '../index.css';
import UserInfo from './userInfo';
import axios from 'axios'
import Pagination from '../pagination';


function Dashboard() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMyJobs, setShowMyJobs] = useState(false);
  const jobsPerPage = 5;

  
  useEffect(()=> {
    const data = localStorage.getItem('user-info');
    const userData = JSON.parse(data);
    setUserInfo(userData);
    
    fetchJobs().then(fetchedJobs => {
      setJobs(fetchedJobs);
    })

  }, [])

  const handleSendEmail = async (job) => {
    const token = userInfo.token;
    const emailData = {
      to: job.candidates.join(', '),
      subject: `Job Opportunity: ${job.title}`,
      text: `We are excited to inform you about a job opportunity for the position of ${job.title}. Description: ${job.description}.`,
      html: `<p>We are excited to inform you about a job opportunity for the position of <strong>${job.title}</strong>.</p><p>Description: ${job.description}</p>`
    };

    try {
      await axios.post('http://localhost:8080/mail/send-mail', emailData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Email sent successfully');
      alert('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error.response?.data || error.message);
    }
  };

  const handleDeleteJob = async (jobId) => {
    const token = userInfo.token;
    try {
      await axios.delete(`http://localhost:8080/api/job-delete/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setJobs(jobs.filter(job => job._id !== jobId));

    } catch (error) {
      console.error('Error deleting job:', error.response?.data || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/login');
  }

  const handleShowMyJobsChange = () => {
    setShowMyJobs(!showMyJobs);
  };

  const filteredJobs = showMyJobs ? jobs.filter(job => job.userId === userInfo._id) : jobs;

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const selectedJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div className='center-container'>
      <UserInfo userInfo={userInfo} onLogout={handleLogout} />

      <div>
        <h1>POST A JOB </h1>
        <button className='btton' onClick={() => {navigate('/post-job')}}>Post a Job</button>
      </div>

      <div>
        <h1>All Jobs</h1>
        <label>
          <input type="checkbox" checked={showMyJobs} onChange={handleShowMyJobsChange} />
          Show My Job Posts
        </label>
        {selectedJobs.map(job => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <h4>Expertise : {job.experienceLevel}</h4>
            <p>{job.description}</p>
            <p>Last Date: {new Date(job.endDate).toISOString().split('T')[0]}</p>
            {job.userId === userInfo._id && (
              <div>
                <button className='btton' onClick={() => handleDeleteJob(job._id)}>Delete</button>
                <button className='btton' onClick={() => handleSendEmail(job)}>Send Email</button>
              </div>
            )} 
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

    </div>
  )
}

export default Dashboard