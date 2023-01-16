import { ethers } from "hardhat";

async function main() {
  // this is a contract factory, allow us to deploy one instance of contract
  const Market = await ethers.getContractFactory("NFTMarket");
  // one instance of deploy contract
  const market = await Market.deploy();

  await market.deployed();

  console.log(`NFT marketplace deployed to ${market.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// we call the main function here
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
