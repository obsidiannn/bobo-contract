// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

contract BoboToken is ERC20 {
    // 记录上次领取时间的映射
    mapping(address => uint256) public lastClaimTime;

    // 常量定义
    uint256 public constant CLAIM_AMOUNT = 10 ** 18; // 1个token（考虑18位小数）
    uint256 public constant CLAIM_COOLDOWN = 72 hours; // 72小时冷却时间

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function claimTokens() public {
        require(
            block.timestamp >= lastClaimTime[msg.sender] + CLAIM_COOLDOWN || lastClaimTime[msg.sender] == 0,
            "Please wait for the cooldown period to end"
        );

        lastClaimTime[msg.sender] = block.timestamp;
        _mint(msg.sender, CLAIM_AMOUNT);
    }
}
