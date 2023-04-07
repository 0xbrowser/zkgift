// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Gift {

    struct rank {
        address[] grantAddress;
        uint256[] grantTotal;
    }

    // the grant amount that the address have received
    mapping(address => uint256) public grantReceived;
    // corresponding to the position of the giver in the recipient's rank
    mapping(address => mapping(address => uint256)) public position;
    // the grant rank of the address
    mapping(address => rank) grantRank;

    event grantEvent(address from, address to, uint256 amount, uint256 time);
    event withdrawEvent(uint256 amount, uint256 time);

    function getGrantAddress(address addr) public view returns (address[] memory) {
        return grantRank[addr].grantAddress;
    }

    function getGrantTotal(address addr) public view returns (uint256[] memory) {
        return grantRank[addr].grantTotal;
    }

    function grant(address recipient) public payable {
        require(msg.value > 0, "Invalid funds");
        require(msg.sender != recipient, "Invalid recipient");
        
        emit grantEvent(msg.sender, recipient, msg.value, block.timestamp);
        
        grantReceived[recipient] += msg.value;
        if( position[recipient][msg.sender] == 0 ){
            grantRank[recipient].grantAddress.push(msg.sender);
            grantRank[recipient].grantTotal.push(msg.value);
            position[recipient][msg.sender] = grantRank[recipient].grantAddress.length;
        }
        else grantRank[recipient].grantTotal[position[recipient][msg.sender] - 1] += msg.value;
    }

    function withdraw(uint256 amount) public payable{
        require(grantReceived[msg.sender] > 0, "No grant yet");
        require(amount <= grantReceived[msg.sender], "Not enough grant");
        
        emit withdrawEvent(amount, block.timestamp);
        
        grantReceived[msg.sender] -= amount;
        payable(msg.sender).call{value:amount};
    }
}