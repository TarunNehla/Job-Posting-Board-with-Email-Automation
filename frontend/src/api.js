import axios from 'axios'

const authApi = axios.create({
    baseURL: '/auth',
});
  
  // Google authentication
  export const googleAuth = (code) => authApi.get(`/google?code=${code}`);
  

const api = axios.create({
    baseURL: '',
});

export const fetchJobs = async () => {
    try {
        const response = await api.get('/api/all-jobs');
        return response.data;

    } catch (error) {
        console.error('Error fetching invoices:', error.response?.data || error.message);
        return { jobs: [] };
    }
}
