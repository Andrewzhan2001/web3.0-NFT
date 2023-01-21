import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { NFTContext } from '../context/NFTContext';
import { Loader, NFTCard, SearchBar } from '../components';
import images from '../assets';
import { shortenAddress } from '../utils/shortenAddress';

const mynfts = () => {
  const { fetchMyNFTSOrListedNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSelect, setActiveSelect] = useState('Recently Added');
  const onHandleSearch = (value) => {
    const filteredNfts = nfts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));
    setNfts(filteredNfts);
  };

  const onClearSearch = () => {
    setNfts(nftsCopy);
  };

  useEffect(() => {
    fetchMyNFTSOrListedNFTs('fetchMyNFTs')
      .then((items) => {
        setNfts(items);
        setNftsCopy(items);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // spread original nfts to sortedNfts like deep copy
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case 'Price (high to low)':
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case 'Recently Added':
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);

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
        <Image alt="crypto" className="object-cover w-full h-80 minlg:h-557" src={images.crypto} />
        <div className="z-0 flex-col -mt-20 flexCenter">
          <div className="w-40 h-40 p-2 rounded-full flexCenter sm:w-36 sm:h-36 nft-gradient">
            <Image src={images.creator1} alt="creator1" className="object-cover rounded-full" />
          </div>
          <p className="mt-6 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1">{shortenAddress(currentAccount)}</p>
        </div>
      </div>
      {(!loading && nfts.length === 0 && nftsCopy.length === 0) ? (
        <div className="p-16 flexCenter sm:p-4">
          <h1 className="text-3xl font-extrabold font-poppins dark:text-white text-nft-black-1">No NFTs owned</h1>
        </div>
      ) : (
        <div className="flex-col w-full p-12 sm:px-4 minmd:w-4/5 flexCenter">
          <div className="flex flex-row flex-1 w-full px-4 sm:flex-col xs:px-0 minlg:px-8">
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
              clearSearch={onClearSearch}
            />
          </div>
          <div className="flex flex-wrap w-full mt-3">
            {nfts.map((nft) => <NFTCard key={`nft-${nft.tokenId}`} nft={nft} onProfile />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default mynfts;
