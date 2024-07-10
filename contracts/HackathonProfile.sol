// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HackathonProfile {
    struct UserProfile {
        string name;
        string[] skills;
        mapping(string => uint256) endorsements;
        address[] requests;
        address[] notifications;
    }

    mapping(address => UserProfile) private profiles;
    address[] private userAddresses;

    event RequestSent(address indexed from, address indexed to);
    event RequestResponded(address indexed from, address indexed to, bool accepted);

    function registerUser(string memory name, string[] memory skills) public {
        UserProfile storage profile = profiles[msg.sender];
        profile.name = name;

        // Ensure no duplicate skills
        for (uint i = 0; i < skills.length; i++) {
            bool skillExists = false;
            for (uint j = 0; j < profile.skills.length; j++) {
                if (keccak256(abi.encodePacked(profile.skills[j])) == keccak256(abi.encodePacked(skills[i]))) {
                    skillExists = true;
                    break;
                }
            }
            if (!skillExists) {
                profile.skills.push(skills[i]);
            }
        }

        // Add user address to array if not already present
        bool userExists = false;
        for (uint i = 0; i < userAddresses.length; i++) {
            if (userAddresses[i] == msg.sender) {
                userExists = true;
                break;
            }
        }
        if (!userExists) {
            userAddresses.push(msg.sender);
        }
    }

    function getProfile(address user) public view returns (string memory name, string[] memory skills, uint256[] memory endorsements) {
        UserProfile storage profile = profiles[user];
        uint256[] memory endorsementCounts = new uint256[](profile.skills.length);
        for (uint i = 0; i < profile.skills.length; i++) {
            endorsementCounts[i] = profile.endorsements[profile.skills[i]];
        }
        return (profile.name, profile.skills, endorsementCounts);
    }

    function endorseSkill(address user, string memory skill) public {
        UserProfile storage profile = profiles[user];
        profile.endorsements[skill]++;
    }

    function getEndorsements(address user, string memory skill) public view returns (uint256) {
        return profiles[user].endorsements[skill];
    }

    function searchBySkill(string memory skill) public view returns (address[] memory) {
        address[] memory matchedProfiles = new address[](userAddresses.length);
        uint count = 0;
        for (uint i = 0; i < userAddresses.length; i++) {
            UserProfile storage profile = profiles[userAddresses[i]];
            for (uint j = 0; j < profile.skills.length; j++) {
                if (keccak256(abi.encodePacked(profile.skills[j])) == keccak256(abi.encodePacked(skill))) {
                    matchedProfiles[count] = userAddresses[i];
                    count++;
                    break;
                }
            }
        }

        // Resize the array to the actual number of matched profiles
        address[] memory result = new address[](count);
        for (uint i = 0; i < count; i++) {
            result[i] = matchedProfiles[i];
        }
        return result;
    }

    function sendTeamUpRequest(address to) public {
        UserProfile storage receiver = profiles[to];
        receiver.requests.push(msg.sender);
        emit RequestSent(msg.sender, to);
    }

    function respondToRequest(address from, bool accepted) public {
        UserProfile storage receiver = profiles[msg.sender];
        if (accepted) {
            receiver.notifications.push(from);
        } else {
            receiver.notifications.push(from);
        }
        emit RequestResponded(from, msg.sender, accepted);
    }

    function getRequests() public view returns (address[] memory) {
        return profiles[msg.sender].requests;
    }

    function getNotifications() public view returns (address[] memory) {
        return profiles[msg.sender].notifications;
    }
}
