import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import fs = require('fs');

const privateKey = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  solidity: "0.8.17",
};

export default config;
