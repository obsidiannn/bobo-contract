// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

contract BoboToken is ERC20 {
    constructor() ERC20("BoboToken", "BOBO") {}

    function mint() public {
        _mint(msg.sender, 10000 * (10 ** decimals()));
    }
}
