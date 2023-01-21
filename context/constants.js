// contract we move from artifacts is not the normal contract, it is the contractABi
//  contract application binary inerface, standard way to interact ethereum ecosystem
// both from blockchain and contract to contract interaction
import contract from './NFTMarket.json';

// get the market place address output as console.log in deploy.ts
export const MarketAddress = process.env.NEXT_PUBLIC_MARKET_ADDRESS;
export const MarketAddressABI = contract.abi;
