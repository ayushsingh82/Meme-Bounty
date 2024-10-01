// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract UserForm {
    // Structure to store user details
    struct User {
        string name;
        string contact;
        string description;
        uint256 prize;
    }

    // Mapping to store each user's submission based on their Ethereum address
    mapping(address => User) public users;

    // Event to emit when a user submits their form
    event FormSubmitted(
        address indexed userAddress,
        string name,
        string contact,
        string description,
        uint256 prize
    );

    // Function to submit the form
    function submitForm(string memory _name, string memory _contact, string memory _description, uint256 _prize) public {
        // Store the user data in the mapping
        users[msg.sender] = User(_name, _contact, _description, _prize);

        // Emit the event
        emit FormSubmitted(msg.sender, _name, _contact, _description, _prize);
    }

    // Function to retrieve form details for a specific address
    function getForm(address _user) public view returns (string memory, string memory, string memory, uint256) {
        User memory user = users[_user];
        return (user.name, user.contact, user.description, user.prize);
    }
}