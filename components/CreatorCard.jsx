import React, { useContext } from 'react';
import Image from 'next/image';
import images from '../assets';
import { NFTContext } from '../context/NFTContext';

const CreatorCard = ({ rank, creatorImage, creatorName, creatorEths }) => {
  const { nftCurrency } = useContext(NFTContext);
  return (
    <div className="flex flex-col p-4 m-4 border bg-slate-100 min-w-190 minlg:min-w-215 minlg:max-h-256 dark:bg-nft-black-3 dark:border-nft-black-3 border-nft-gray-1 rounded-3xl">
      <div className="w-8 h-8 rounded-full minlg:w-10 minlg:h-10 bg-nft-red-violet flexCenter">
        <p className="font-semibold text-white font-poppins tet-base minlg:text-lg">{rank}</p>
      </div>
      <div className="flex justify-center my-2">
        <div className="relative w-20 h-20 minlg:w-28 minlg:h-28">
          <Image className="object-cover rounded-full" src={creatorImage} fill alt={`creator${rank}`} />
          <div className="absolute bottom-0 w-5 h-5 minglg:w-8 minlg:h-8 -right-0">
            <i className="text-green-600 fa-solid fa-lg fa-circle-check" />
          </div>
        </div>
      </div>
      <div className="flex-col mt-3 text-center minlg:mt-7 flexCenter">
        <p className="text-base font-semibold font-poppins dark:text-white text-nft-black-1">{creatorName}</p>
        <p className="text-base font-semibold font-poppins dark:text-white text-nft-black-1">{creatorEths.toFixed(2)}<span className="font-normal">{nftCurrency}</span></p>
      </div>
    </div>
  );
};

export default CreatorCard;
