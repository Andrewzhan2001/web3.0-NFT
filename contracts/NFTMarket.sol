/* SPDX-License-Identifier: UNLICENSED */
pragma solidity ^0.8.17;
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
// ERC-721 is free, open standard that describes how to build non-fungible or unique tokens on the ethereum blockchain
import "../node_modules/hardhat/console.sol";

// this contract inherit from ERC721URIStrorage
contract NFTMarket is ERC721URIStorage{
  // enable the counter utility
  //using fns of library A for type B
  //so that whatever variable I declare as type B can call any function of library A
  using Counters for Counters.Counter;

  // create token IDs, first token -> ID = 0
  // variable with name _tokenIds with type Counters.counter
  Counters.Counter private _tokenIds;
  Counters.Counter private _itemsSold;
  // like num type in js
  // every time a user post or list an NFT, owner of marketplace get 0.025 ether
  uint256 listingPrice = 0.025 ether;
  
  //owner earn a commission on every item sold
  address payable owner;
  
  //keep all the nfts that is created
  // pass item id and return a market itme
  // like a dictionary
  mapping(uint256 => MarketItem) private idToMarketItem;

  struct MarketItem {
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }

  /* special structure that is an event will triggered when we create market item */
  /* indexed for from 0 move upward */
  event MarketItemCreated (uint256 indexed tokenId, address seller, address owner, uint256 price, bool sold);

  // get called when we create this struct
  // the ower of contract is the one deploying it
  constructor() ERC721("Andrew Tokens", "ANDT") {
    owner = payable(msg.sender);
  }

  // parameter with type + variable name uint = integer
  // payable give access to the function to handle transaction of ethereum
  // if we pass the requirement do following codes else send the message and exit function
  function updateListingPrice(uint _listingPrice) public payable {
    require(owner == msg.sender, "Only marketplace owner can update listing price.");
    listingPrice = _listingPrice;
  }

  // view: do not have any logic just return information, uint256 = return type
  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }
  // upload NFT and get tokenURI(unique resource identifier)
  function createToken(string memory tokenURI, uint256 price) public payable returns (uint) {
    _tokenIds.increment(); // create token, increment tokenId by 1
    uint256 newTokenId = _tokenIds.current();

    // mint or create the NFT token, person who listing the token(want to create)
    // mint to zero address->mint to specific marketplace not specific account
    // address(0) addresss is 0, do not belong to any specific wallet(new contract)
    // new token has ID with newTokenId
    _mint(msg.sender, newTokenId);
    // set the tokenURI to the new token
    _setTokenURI(newTokenId, tokenURI);
    createMarketItem(newTokenId, price);

    //later we can use this id to find marketitem
    return newTokenId;
  }

  function createMarketItem(uint256 tokenId, uint256 price) private {
    require(price > 0, "Price must be at least 1");
    // amount person send in to market item has to be equal to the listing Price
    /* address(this) is the address of marketplace*/
    require(msg.value == listingPrice, "Price must be equal to listing price");
    idToMarketItem[tokenId] = MarketItem(
      tokenId,
      payable(msg.sender), 
      payable(address(this)), // address of the instance of the contract where the call is being made
      price, 
      false
    );
    //transfer the ownership of the nft to the person who trying to create the item
    _transfer(msg.sender, address(this), tokenId);
    // emit the event and let everyone know this contract is emitted
    // this specify what event is emitting
    emit MarketItemCreated( tokenId, msg.sender, address(this), price, false);
  }

  // tokenId, token we are trying to sell
  function resellToken(uint256 tokenId, uint256 price) public payable {
    // people who currently trying to sell token must be the token owner
    require(idToMarketItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
    require(msg.value == listingPrice, "Price must be equal to listing price");
    idToMarketItem[tokenId].sold = false; // relist the token
    idToMarketItem[tokenId].price = price;
    idToMarketItem[tokenId].seller = payable(msg.sender); // set to who trying to sell it. 
    idToMarketItem[tokenId].owner = payable(address(this)); // owner belong to actual nftmarketplace not to specific person
    _itemsSold.decrement(); // we currently not sell this token, we want to relist it

    // transfer token to marketplace
    _transfer(msg.sender, address(this), tokenId);
    
  }
  // send from market place to the person who bought it
  function createMarketSale( uint256 tokenId ) public payable {
    uint price = idToMarketItem[tokenId].price;
    require(msg.value == price, "Please submit the asking price in order to complete the purchase");
    idToMarketItem[tokenId].owner = payable(msg.sender);
    idToMarketItem[tokenId].sold = true;
    // when we sell to marketplace we want to keep the seller, now when we sell to the person, we don't want to keep which market sell to him
    idToMarketItem[tokenId].seller = payable(address(0));
    _itemsSold.increment();
    _transfer(address(this), msg.sender, tokenId);
    // owner here is the owner of the market place
    // we want to send amount to the owner of marketplace about commission
    payable(owner).transfer(listingPrice);
    // transfer from buyer to the seller of token
    payable(idToMarketItem[tokenId].seller).transfer(msg.value);
  }

  // return all unsold items belong to marketplace
  function fetchMarketItems() public view returns (MarketItem[] memory) {
    uint itemCount = _tokenIds.current(); // get the value of counter
    uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
    uint currentIndex = 0;

    // an array with type of MarketItem
    MarketItem[] memory items = new MarketItem[](unsoldItemCount); // we need to provide the length of array
    for (uint i = 1; i <= itemCount; i++) {
      if (idToMarketItem[i].owner == address(this)) {
        // get the mapping to marketitem
        MarketItem storage currentItem = idToMarketItem[i];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
  function fetchMyNFTs() public view returns (MarketItem[] memory) {
    uint totalItemCount = _tokenIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;
    // get how many items that the caller own
    for (uint i = 1; i <= totalItemCount; i++) {
      if (idToMarketItem[i].owner == msg.sender) {
        itemCount += 1;
      }
    }
    // put each nft belong to that person to the array
    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 1; i <= totalItemCount; i++) {
      if (idToMarketItem[i].owner == msg.sender) {
        MarketItem storage currentItem = idToMarketItem[i];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  // fetch all nfts of a specific person who listed(are selling) in the marketplace
  function fetchItemsListed() public view returns (MarketItem[] memory) {
    uint totalItemCount = _tokenIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 1; i <= totalItemCount; i++) {
      if (idToMarketItem[i].seller == msg.sender) { // only change to fetchMyNFTs
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 1; i <= totalItemCount; i++) {
      if (idToMarketItem[i].seller == msg.sender) {
        MarketItem storage currentItem = idToMarketItem[i];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
}