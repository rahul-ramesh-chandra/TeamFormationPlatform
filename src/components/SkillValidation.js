import React, { useState } from 'react';
import { getProfile } from '../utils/contract';

const SkillValidation = () => {
  const [userAddress, setUserAddress] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const profileData = await getProfile(userAddress);
      setProfile(profileData);
      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', error);
      setError('Failed to fetch profile. Please try again.');
    }
  };

  return (
    <div>
      <h2>Skill Validation</h2>
      <input
        type="text"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        placeholder="Enter user address"
      />
      <button onClick={fetchProfile}>Get Profile</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {profile && (
        <div>
          <p>Name: {profile.name}</p>
          <p>Skills: {profile.skills.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default SkillValidation;
