// src/components/SearchSkill.js
import React, { useState } from 'react';
import { getProfile, searchBySkill, sendTeamUpRequest } from '../utils/contract';

const SearchSkill = () => {
  const [technology, setTechnology] = useState('');
  const [candidates, setCandidates] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await searchBySkill(technology);
      const profiles = await Promise.all(results.map(async (address) => {
        const profile = await getProfile(address);
        return { address, ...profile };
      }));
      setCandidates(profiles);
    } catch (error) {
      console.error('Error searching by skill:', error);
    }
  };

  const handleTeamUpRequest = async (address) => {
    try {
      await sendTeamUpRequest(address);
    } catch (error) {
      console.error('Error sending team-up request:', error);
    }
  };

  return (
    <div>
        <h2>Search for Skill</h2>
      <input
        type="text"
        value={technology}
        onChange={(e) => setTechnology(e.target.value)}
        placeholder="Search for a technology"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {candidates.map((candidate, index) => (
          <div key={index}>
            <p>{candidate.name}</p>
            <p>Skills: {candidate.skills.join(', ')}</p>
            <p>Endorsed Skills: {candidate.endorsements.join(', ')}</p>
            <button onClick={() => handleTeamUpRequest(candidate.address)}>TeamUp</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSkill;
