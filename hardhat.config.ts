import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    local: {
      url: 'http://127.0.0.1:7545',
    },
    bobo: {
      url: 'http://101.35.197.66:8545',
    }
  }
};

export default config;
