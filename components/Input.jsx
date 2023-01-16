import React, { useContext } from 'react';
import { NFTContext } from '../context/NFTContext';

const Input = ({ inputType, title, placeholder, handleClick }) => {
  const { nftCurrency } = useContext(NFTContext);
  return (
    <div className="w-full mt-10">
      <p className="text-xl font-semibold font-poppins dark:text-white text-nft-black-1">{title}</p>
      {inputType === 'number' ? (
        <div className="flex-row w-full px-4 py-3 mt-4 text-base bg-white border rounded-lg outline-none dark:bg-nft-black-1 dark:border-nft-black-1 border-nft-gray-2 font-poppins dark:text-white text-nft-gray-2 flexBetween">
          <input type="number" placeholder={placeholder} onChange={handleClick} className="flex-1 w-full bg-white outline-none dark:bg-nft-black-1 " />
          <p className="text-xl font-semibold font-poppins dark:text-white text-nft-black-1">{nftCurrency}</p>
        </div>
      ) : inputType === 'textarea' ? (
        <textarea rows={10} placeholder={placeholder} onChange={handleClick} className="w-full px-4 py-3 mt-4 text-base bg-white border rounded-lg outline-none dark:bg-nft-black-1 dark:border-nft-black-1 border-nft-gray-2 font-poppins dark:text-white text-nft-gray-2" />
      ) : (
        <input placeholder={placeholder} onChange={handleClick} className="w-full px-4 py-3 mt-4 text-base bg-white border rounded-lg outline-none dark:bg-nft-black-1 dark:border-nft-black-1 border-nft-gray-2 font-poppins dark:text-white text-nft-gray-2" />
      )}

    </div>
  );
};

export default Input;
