/* SPDX-License-Identifier: UNLICENSED */
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// ERC-721 is free, open standard that describes how to build non-fungible or unique tokens on the ethereum blockchain

import "hardhat/console.sol";

// this contract inherit from ERC721URIStrorage
contract NFTMarketplace is ERC721URIStorage{
  // enable the counter utility
  //using fns of library A as type B
  //so that whatever variable I declare as type B can call any function of library A
  using Counters for Counters.Counter;

  // create token IDs, first token -> ID = 0
  // variable with name _tokenIds with type Counters.counter
  Counters.counter private _tokenIds;
  Counters.counter private _itemsSold;

  // like num type in js
  // every time a user post or list an NFT, owner of marketplace get 0.025 ether
  uint256 listingPrice = 0.025 ether;
  
  //owner earn a commission on every item sold
  address payable owner;
  
  //keep all the nfts that is created
  // pass item id and return a market itme
  mapping(uint256 => MarketItem) private idToMarketItem

  struct MarketItem {
    uint256 tokenId;
    address payable seller;
    address payable owner;
    unit256 price;
    bool sold;
  }

  /* special structure that is an event will triggered when we create market item */
  /* indexed for from 0 move upward */
  event MarketItemCreated (uint256 indexed tokenId, address seller, address owner, uint256 price, bool sold);

  // get called when we create this struct
  // the ower of contract is the one deploying it
  constructor() {
    owner = payable(msg.sender)
  }

  // parameter with type + variable name uint = integer
  // payable give access to the function to receive the ethereum
  // if we pass the requirement, send message and do following codes
  function updateListingPrice(uint _listingPrice) public payable {
    require(owner == msg.sender, "Only marketplace owner can update listing price.");
    listingPrice = _listingPrice;
  }

  // view: do not have any logic just return information, uint256 = return type
  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }
}