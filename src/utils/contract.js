import { ethers } from 'ethers';

// Replace with your contract ABI and address
const contractABI = "YOUR ABI";
const contractAddress = 'YOUR  DEPLOYMENT ADDRESS';

async function getContract() {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
}

async function registerUser(name, skills) {
  const contract = await getContract();
  const tx = await contract.registerUser(name, skills);
  await tx.wait();
  console.log('User registered:', name, skills);
}


async function getProfile(userAddress) {
  console.log("getProfile called with address:", userAddress); // Log the address
  if (!ethers.utils.isAddress(userAddress)) {
    console.error("Invalid address:", userAddress); // Log the invalid address
    throw new Error('Invalid address');
  }
  try {
    const contract = await getContract();
    const profile = await contract.getProfile(userAddress);
    return profile;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function endorseSkill(userAddress, skill) {
  console.log("endorseSkill called with address:", userAddress); // Log the address
  if (!ethers.utils.isAddress(userAddress)) {
    console.error("Invalid address:", userAddress); // Log the invalid address
    throw new Error('Invalid address');
  }
  try {
    const contract = await getContract();
    const tx = await contract.endorseSkill(userAddress, skill);
    await tx.wait();
    console.log('Skill endorsed');
  } catch (error) {
    console.error("Error endorsing skill:", error);
    throw error;
  }
}

async function getEndorsements(userAddress, skill) {
  console.log("getEndorsements called with address:", userAddress); // Log the address
  if (!ethers.utils.isAddress(userAddress)) {
    console.error("Invalid address:", userAddress); // Log the invalid address
    throw new Error('Invalid address');
  }
  try {
    const contract = await getContract();
    const endorsements = await contract.getEndorsements(userAddress, skill);
    return endorsements;
  } catch (error) {
    console.error("Error getting endorsements:", error);
    throw error;
  }
}

async function searchBySkill(skill) {
  const contract = await getContract();
  return await contract.searchBySkill(skill);
}

async function sendTeamUpRequest(to) {
  const contract = await getContract();
  const tx = await contract.sendTeamUpRequest(to);
  await tx.wait();
  console.log('Team-up request sent');
}

async function respondToRequest(from, accepted) {
  const contract = await getContract();
  const tx = await contract.respondToRequest(from, accepted);
  await tx.wait();
  console.log('Response to request sent');
}

async function getNotifications() {
  const contract = await getContract();
  const notifications = await contract.getNotifications();
  return notifications;
}


export { contractAddress, contractABI, getContract, registerUser, getProfile, endorseSkill, searchBySkill, sendTeamUpRequest, respondToRequest, getNotifications, getEndorsements };