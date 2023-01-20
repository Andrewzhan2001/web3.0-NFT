import React, { useState, useEffect, useContext } from 'react';
import { NFTContext } from '../context/NFTContext';
import { NFTCard, Loader } from '../components';

// route for localhost:3000/listed-nfts
const ListedNFTs = () => {
  const [NFTs, setNFTs] = useState([]);
  // initially we need to load listed nfts
  const [isLoading, setisLoading] = useState(true);
  const { fetchMyNFTSOrListedNFTs } = useContext(NFTContext);

  useEffect(() => {
    fetchMyNFTSOrListedNFTs('fetchListed').then((items) => {
      setNFTs(items);
      setisLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flexStart">
        <Loader />
      </div>
    );
  }
  if (!isLoading && NFTs.length === 0) {
    return (
      <div className="min-h-screen p-16 flexCenter sm:p-4">
        <h1 className="text-3xl font-extrabold font-poppins dark:text-white text-nft-black-1">No NFTs listed for sales, please add your NFTs.</h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center min-h-screen p-12 sm:px-4">
      <div className="w-full minmd:w-4/5">
        <div className="mt-4">
          <h2 className="mt-2 ml-4 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 sm:ml-2">NFTs Listed for Sale</h2>
          <div className="flex flex-wrap justify-start w-full mt-3 md:justify-center">
            {NFTs.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListedNFTs;
