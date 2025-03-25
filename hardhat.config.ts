import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config'


const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    local: {
      url: 'http://127.0.0.1:8545',
    },
    bobo: {
      url: 'http://101.35.197.66:8545',
    },
    polygonAmoy: {
      url: 'https://rpc-amoy.polygon.technology/',
      accounts: [process.env.PRIVATE_KEY ?? ""]
    },
  }
};

export default config;
