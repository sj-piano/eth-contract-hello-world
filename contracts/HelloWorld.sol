// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.3;

import "hardhat/console.sol";

contract HelloWorld {

    event UpdatedMessages(string oldStr, string newStr);
    string public message;

    constructor(string memory initMessage) {
        message = initMessage;
    }

    function update(string memory newMessage) public {
        string memory oldMsg = message;
        message = newMessage;
        console.log("Updating message from '%s' to '%s'", oldMsg, newMessage);
        emit UpdatedMessages(oldMsg, newMessage);
    }

}
