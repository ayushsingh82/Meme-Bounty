// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserForm {
    // Structure to store user details
    struct User {
        string name;
        string contact;
        string description;
        uint256 prize;
        address submitter; // Address of the user who submitted the form
    }

    // Array to store all submissions
    User[] public allSubmissions;

    // Mapping to store each user's submissions based on their Ethereum address
    mapping(address => User[]) public submittedForms;

    // Event to emit when a user submits their form
    event FormSubmitted(
        address indexed userAddress,
        string name,
        string contact,
        string description,
        uint256 prize
    );

    // Function to submit the form for any user
    function submitForm(string memory _name, string memory _contact, string memory _description, uint256 _prize) public {
        // Create a new User submission
        User memory newUser = User(_name, _contact, _description, _prize, msg.sender);

        // Add the form to the list of forms submitted by this user
        submittedForms[msg.sender].push(newUser);

        // Add the form to the global list of all submissions
        allSubmissions.push(newUser);

        // Emit the event
        emit FormSubmitted(msg.sender, _name, _contact, _description, _prize);
    }

    // Function to retrieve all submissions by different users
    function getAllSubmissions() public view returns (User[] memory) {
        return allSubmissions;
    }
}
