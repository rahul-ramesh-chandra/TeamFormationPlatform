// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getProfile, getEndorsements } from '../utils/contract';

const Profile = () => {
  const [userAddress, setUserAddress] = useState('');
  const [skill, setSkill] = useState('');
  const [profile, setProfile] = useState(null);
  const [endorsements, setEndorsements] = useState(null);
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

  const fetchEndorsements = async () => {
    try {
      const endorsementsData = await getEndorsements(userAddress, skill);
      setEndorsements(endorsementsData.toString());
      setError(null);
    } catch (err) {
      console.error('Error fetching endorsements:', error);
      setError('Failed to fetch endorsements. Please try again.');
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
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
      <h2>Endorsements</h2>
      <input
        type="text"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        placeholder="Enter skill"
      />
      <button onClick={fetchEndorsements}>Get Endorsements</button>
      {endorsements !== null && <p>Endorsements: {endorsements}</p>}
    </div>
  );
};

export default Profile;
