// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BaseSignalBoard {
    mapping(address => uint8) public latestSignal;
    mapping(address => uint256) public userSignals;
    mapping(uint8 => uint256) public signalCounts;
    uint256 public totalSignals;

    event SignalSent(address indexed user, uint8 signal, uint256 userSignals, uint256 totalSignals);

    function sendSignal(uint8 signal) external {
        require(signal < 4, "Invalid signal");

        latestSignal[msg.sender] = signal;

        unchecked {
            userSignals[msg.sender] += 1;
            signalCounts[signal] += 1;
            totalSignals += 1;
        }

        emit SignalSent(msg.sender, signal, userSignals[msg.sender], totalSignals);
    }
}
