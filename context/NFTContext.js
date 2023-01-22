import React, { useState, useEffect } from 'react';

// single Web3/Ethereum provider solution for all Wallets
// allow us collect to Metamask
import Web3Modal from 'web3modal';
// Ethereum wallet implementation of utilities
// packages allowuse to connect frontend to the ethereum blockchain
import { ethers } from 'ethers';
import axios from 'axios';
// this library allow us to use IPFS protocal to upload to IPFS
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { MarketAddress, MarketAddressABI } from './constants';

// alternative to redux when you don't have a lot of data moving around constantly
export const NFTContext = React.createContext();

// connect to infura: blockchain development suite, access to IPFS networks
const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECTID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECTSECRET;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;
const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
    'Access-Control-Allow-Origin': '*',
  },
});

const infuraProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_MARKETURL);

// get the contract we deployed, and contract need to know who is interacting with it.
const fetchContract = (signerOrProvider) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);
// input will provide a props object with children variable
// everything side this tag will be its children(child tags + all information between it)
export const NFTProvider = ({ children }) => {
  const nftCurrency = 'ETH';
  const [currentAccount, setcurrentAccount] = useState('');

  // check use whether user has metamask installed
  // make this async as we use await
  const checkConnected = async () => {
    // when you install the metamask, it will inject ethereum object to the window object, so you can get this object not null
    if (!window.ethereum) return alert('Please install MetaMask to your browser');
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length) {
      setcurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found');
    }
  };
  useEffect(() => {
    checkConnected();
  }, []);

  // we want to connect to the wallet for the first time
  const connectWallet = async () => {
    if (!window.ethereum) return alert('Place install MetaMask to your browser');
    // make request the connect ot specific account
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setcurrentAccount(accounts[0]);
    // reload the page
    window.location.reload();
  };

  // IPFS: file/image upload place but this place is completely decentralized/distributed
  // those input will come from create NFT page
  const uploadToIPFS = async (file) => {
    try {
      // add file to the IPFS
      const fileAdded = await client.add({ content: file[0] });
      const url = `https://tianyi.infura-ipfs.io/ipfs/${fileAdded.path}`; // path to newly created and uploaded NFT
      return url;
    } catch (error) {
      console.log(`ERROR on image uploading to IPFS${error.message}`);
    }
  };

  // push the NFT to the marketplace
  const createSale = async (fileURL, inputPrice, isReselling, id) => {
    // connect to actual smart contract provider ： metamask
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    // who is actually making the sale and create nft
    const signer = provider.getSigner();
    // we want ot change the human readable price(0.025) to wei
    // wei is a unit to calcualte the worth of ether and other currency, it is a blockchain readable amount
    const price = ethers.utils.parseUnits(inputPrice, 'ether');
    // it contains all the functions we create in solidity code in ./contracts
    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();
    // the value will be accessed by msg object in solidity
    const transaction = !isReselling
      ? await contract.createToken(fileURL, price, { value: listingPrice.toString() })
      : await contract.resellToken(id, price, { value: listingPrice.toString() });
    await transaction.wait();
  };
  // create this nft and pass it to the market place
  const createNFT = async (fromInput, fileURL, router) => {
    const { name, description, price } = fromInput;
    if (!name || !description || !price || !fileURL) return;
    // form a string by those objects
    const data = JSON.stringify({ name, description, image: fileURL });
    try {
      /* upload this entire data to the IPFS */
      const added = await client.add(data);
      console.log(added);
      const url = `https://tianyi.infura-ipfs.io/ipfs/${added.path}`; // path to newly created and uploaded NFT
      await createSale(url, price);
      // 直接传到主页面 /路径下面
      router.push('/');
    } catch (error) {
      console.log('ERROR on file uploading to IPFS');
      console.log(error);
    }
  };
  // we want to fetch all the nfts in the marketplace
  const fetchNFTs = async () => {
    const provider = infuraProvider;
    // fetch all the nfts in the marketplace
    const contract = fetchContract(provider);
    const data = await contract.fetchMarketItems();
    // 能在所有async的function跑完后再返回值as list
    // this price is human unreadable format in wei
    const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unhumanPrice }) => {
      const tokenURI = await contract.tokenURI(tokenId);
      // the otter brace is the metadata we get from axios contains all the data we put in createSales() function
      const { data: { image, name, description } } = await axios.get(tokenURI);
      const price = ethers.utils.formatUnits(unhumanPrice.toString(), 'ether');
      // items is the array of following object
      return {
        price,
        tokenId: tokenId.toNumber(),
        seller,
        owner,
        image,
        name,
        description,
        tokenURI,
      };
    }));
    return items;
  };

  // type will specify the type of NFT we want, my nft or listed nft
  const fetchMyNFTSOrListedNFTs = async (type) => {
    // connect to actual smart contract
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    // connect to the metamask
    const provider = new ethers.providers.Web3Provider(connection);
    // who is actually making the sale and create nft
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    const data = type === 'fetchListed'
      ? await contract.fetchItemsListed()
      : await contract.fetchMyNFTs();
    const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unhumanPrice }) => {
      const tokenURI = await contract.tokenURI(tokenId);
      // the otter brace is the metadata we get from axios contains all the data we put in createSales() function
      const { data: { image, name, description } } = await axios.get(tokenURI);
      const price = ethers.utils.formatUnits(unhumanPrice.toString(), 'ether');
      // items is the array of following object
      return {
        price,
        tokenId: tokenId.toNumber(),
        seller,
        owner,
        image,
        name,
        description,
        tokenURI,
      };
    }));
    return items;
  };

  const buyNft = async (nft) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(MarketAddress, MarketAddressABI, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(nft.tokenId, { value: price });

    await transaction.wait();
  };

  return (
    <NFTContext.Provider value={{ nftCurrency, createSale, connectWallet, currentAccount, uploadToIPFS, createNFT, fetchNFTs, fetchMyNFTSOrListedNFTs, buyNft }}>
      {children}
    </NFTContext.Provider>
  );
};
