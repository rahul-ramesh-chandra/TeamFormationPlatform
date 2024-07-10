import React, { useState } from 'react';
import { registerUser } from '../utils/contract';

const RegisterUser = () => {
  const [userName, setUserName] = useState('');
  const [skills, setSkills] = useState('');

  const handleRegister = async () => {
    if (!userName || !skills) {
      alert('Please enter both name and skills');
      return;
    }
    try {
      console.log('Registering user:', userName, skills.split(','));
      await registerUser(userName, skills.split(','));
      alert('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user');
    }
  };

  return (
    <div>
      <h2>Register User</h2>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter user name"
      />
      <input
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="Enter skills (comma separated)"
      />
      <button onClick={handleRegister}>Register User</button>
    </div>
  );
};

export default RegisterUser;
