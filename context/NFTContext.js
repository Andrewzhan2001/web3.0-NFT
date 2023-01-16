import React, { useState, useEffect } from 'react';

// single Web3/Ethereum provider solution for all Wallets
// allow us collect to Metamask
import Web3Modle from 'web3modal';
// Ethereum wallet implementation of utilities
// packages allowuse to connect frontend to the ethereum blockchain
import { ethers } from 'ethers';
import axios from 'axios';

import { MarketAddress, MarketAddressABI } from './constants';

// alternative to redux when you don't have a lot of data moving around constantly
export const NFTContext = React.createContext();

// input will provide a props object with children variable
// everything side this tag will be its children(child tags + all information between it)
export const NFTProvider = ({ children }) => {
  const nftCurrency = 'MATIC';

  return (
    <NFTContext.Provider value={{ nftCurrency }}>
      {children}
    </NFTContext.Provider>
  );
};
