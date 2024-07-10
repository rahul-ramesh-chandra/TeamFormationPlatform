import React, { useState } from 'react';
import { endorseSkill } from '../utils/contract';

const EndorseSkill = () => {
  const [userAddress, setUserAddress] = useState('');
  const [skill, setSkill] = useState('');

  const handleEndorse = async () => {
    if (!userAddress || !skill) {
      alert('Please enter both user address and skill');
      return;
    }
    try {
      console.log('Endorsing skill:', userAddress, skill);
      await endorseSkill(userAddress, skill);
      alert('Skill endorsed successfully');
    } catch (error) {
      console.error('Error endorsing skill:', error);
      alert('Failed to endorse skill');
    }
  };

  return (
    <div>
      <h2>Endorse Skill</h2>
      <input
        type="text"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        placeholder="Enter user address"
      />
      <input
        type="text"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        placeholder="Enter skill"
      />
      <button onClick={handleEndorse}>Endorse Skill</button>
    </div>
  );
};

export default EndorseSkill;
