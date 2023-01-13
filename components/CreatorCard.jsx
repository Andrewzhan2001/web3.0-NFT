import React from 'react';
import Image from 'next/image';
import images from '../assets';

const CreatorCard = ({ rank, creatorImage, creatorName, creatorEths }) => (
  <div className="flex flex-col p-4 m-4 border bg-slate-100 min-w-190 minlg:min-w-249 dark:bg-nft-black-3 dark:border-nft-black-3 border-nft-gray-1 rounded-3xl">
    <div className="w-8 h-8 rounded-full minlg:w-10 minlg:h-10 bg-nft-red-violet flexCenter">
      <p className="font-semibold text-white font-poppins tet-base minlg:text-lg">{rank}</p>
    </div>
    <div className="flex justify-center my-2">
      <div className="relative w-20 h-20 minlg:w-28 minlg:h-28">
        <Image className="object-cover rounded-full" src={creatorImage} fill alt={`creator${rank}`} />
        <div className="absolute bottom-0 w-5 h-5 minglg:w-8 minlg:h-8 -right-0">
          <Image className="object-cover" src={images.tick} fill alt="tick" />
        </div>
      </div>
    </div>
    <div className="flex-col mt-3 text-center minlg:mt-7 flexCenter">
      <p className="text-base font-semibold font-poppins dark:text-white text-nft-black-1">{creatorName}</p>
      <p className="text-base font-semibold font-poppins dark:text-white text-nft-black-1">{creatorEths.toFixed(2)}<span className="font-normal">ETH</span></p>
    </div>
  </div>
);

export default CreatorCard;
