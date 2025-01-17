import React from 'react';
import { BrowserRouter, Routes, Route,Navigate, NavigationType } from 'react-router-dom';
import GoogleLogin from './GoogleLogin'; 
import Dashboard from './Dashboard';
import PageNotFound from './PageNotFound';
import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import RefrshHandler from './RefreshHandler';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='342210499684-hqept71ra54ln63i5e7ptsi29et7sgq1.apps.googleusercontent.com'>
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>
    )
  }
  const PrivateRoute = ({ element }) => {
		return isAuthenticated ? element : <Navigate to="/login" />
	}
  return (
    <BrowserRouter>
    <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper />} /> 
        <Route path="/" element={<Navigate to="/login"/>} /> 
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}/>
        <Route path="*" element={<PageNotFound />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;