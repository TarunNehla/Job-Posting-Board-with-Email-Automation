import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserInfo from './Dashboard/userInfo';
import './index.css';

function PostJob () {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experienceLevel: '',
    candidates: '',
    endDate: ''
  });
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(()=> {
      const data = localStorage.getItem('user-info');
      const userData = JSON.parse(data);
      setUserInfo(userData);
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user-info');
        navigate('/login');
      }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!userInfo){
        console.log('User not logged in');
        return;
    }

    const jobData = {
        ...formData,
        userId : userInfo._id,
        candidates: formData.candidates.split(',').map(email => email.trim()), 
    };

    const token = userInfo.token;

    try {
        await axios.post('http://localhost:8080/api/job-post', jobData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        navigate('/dashboard');
      } catch (error) {
        console.error('Error posting job:', error.response?.data || error.message);
      }
  };

return (
    <div>
        <UserInfo userInfo={userInfo} onLogout={handleLogout} />
        <div className='form-container'>
            <h1>Post a Job</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} required>
                    <option value="" disabled>Select Experience Level</option>
                    <option value="BEGINNER">BEGINNER</option>
                    <option value="INTERMEDIATE">INTERMEDIATE</option>
                    <option value="EXPERT">EXPERT</option>
                </select>
                <textarea name="candidates" placeholder="Candidate Emails (separated by comma)" value={formData.candidates} onChange={handleChange} required />
                <input type="date" name="endDate" placeholder="End Date" value={formData.endDate} onChange={handleChange} required />
                <button type="submit">Post Job</button>
            </form>
        </div>
        
    </div>
);
};

export default PostJob;