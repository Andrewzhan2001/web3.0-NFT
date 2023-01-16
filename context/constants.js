// contract we move from artifacts is not the normal contract, it is the contractABi
//  contract application binary inerface, standard way to interact ethereum ecosystem
// both from blockchain and contract to contract interaction
import contract from './NFTMarket.json';

// get the market place address output as console.log in deploy.ts
export const MarketAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
export const MarketAddressABI = contract.abi;
