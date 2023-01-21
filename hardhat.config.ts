import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: process.env.NEXT_PUBLIC_MARKETURL,
      accounts: [`0x${process.env.NEXT_PUBLIC_PRIVATE_KEY}`],
    }
  },
  solidity: {
    version: '0.8.17',
  },
};

export default config;
