import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { NFTContext } from '../context/NFTContext';
import { Loader, NFTCard, Banner } from '../components';
import images from '../assets';
import { shortenAddress } from '../utils/shortenAddress';

const mynfts = () => {
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  

  if (loading) {
    return (
      <div className="min-h-screen flexStart">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen">
      <div className="flex-col w-full flexCenter">
        <Image className="object-cover w-full h-80 minlg:h-557" src={images.crypto} />
        <div className="z-0 flex-col -mt-20 flexCenter">
          <div className="w-40 h-40 p-2 rounded-full flexCenter sm:w-36 sm:h-36 nft-gradient">
            <Image src={images.creator1} className="object-cover rounded-full" />
          </div>
          <p className="mt-6 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1">{shortenAddress(currentAccount)}</p>
        </div>
      </div>
      {(!loading && nfts.length) ? (
        <div className="p-16 flexCenter sm:p-4">
          <h1 className="text-3xl font-extrabold font-poppins dark:text-white text-nft-black-1">No NFTs owned</h1>
        </div>
      ) : (
        <div className="flex-col w-full p-12 sm:px-4 minmd:w-4/5 flexCenter">
          <div className="flex flex-row flex-1 w-full px-4 sm:flex-col xs:px-0 minlg:px-8">
            SearchBar
          </div>
          <div className="flex flex-wrap w-full mt-3">
            {nfts.map((nft) => <NFTCard key={`nft-${nft.tokenId}`} nft={nft} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default mynfts;
