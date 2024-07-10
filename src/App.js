import React, { useState, useEffect } from 'react';
import RegisterUser from './components/RegisterUser';
import Profile from './components/Profile';
import EndorseSkill from './components/EndorseSkill';
import SearchSkill from './components/SearchSkill'; // Import the new SearchSkill component
import { ethers } from 'ethers';
import { getNotifications } from './utils/contract';
import { contractAddress, contractABI } from './utils/contract'; // Import contractAddress and contractABI

const App = () => {
  const [notifications, setNotifications] = useState([]);

  const handleWalletChange = async () => {
    try {
      const newNotifications = await getNotifications();
      setNotifications(newNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    contract.on('RequestSent', (from, to) => {
      console.log('Request sent from', from, 'to', to);
      handleWalletChange();
    });

    contract.on('RequestResponded', (from, to, accepted) => {
      console.log('Request responded from', from, 'to', to, 'accepted:', accepted);
      handleWalletChange();
      if (accepted) {
        window.alert(`Your team-up request to ${to} has been accepted.`);
      } else {
        window.alert(`Your team-up request to ${to} has been rejected.`);
      }
    });

    window.ethereum.on('accountsChanged', handleWalletChange);

    return () => {
      contract.removeAllListeners('RequestSent');
      contract.removeAllListeners('RequestResponded');
      window.ethereum.removeListener('accountsChanged', handleWalletChange);
    };
  }, []);

  return (
    <div>
      <h1>Smart Contract Interaction</h1>
      <RegisterUser />
      <EndorseSkill />
      <SearchSkill /> {/* Include the new SearchSkill component */}
      <Profile />
      <div>
        <h2>Notifications</h2>
        {notifications.map((notification, index) => (
          <p key={index}>{notification}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
