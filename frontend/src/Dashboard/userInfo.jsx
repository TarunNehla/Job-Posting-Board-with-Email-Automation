import React from 'react';
import '../index.css';

function UserInfo({ userInfo, onLogout }) {
  return (
    <div className='userInfo'>
      <h1>Welcome {userInfo?.name}</h1>
      {/* <h2>Email: {userInfo?.email}</h2> */}
      <img src={userInfo?.image} alt="User Avatar" />
      <button className='btton' onClick={onLogout}>Logout</button>
    </div>
  );
}

export default UserInfo;
