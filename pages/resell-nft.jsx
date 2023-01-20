import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { NFTContext } from '../context/NFTContext';
import { Loader, Button, Input } from '../components';

const Resellnft = () => {
  const router = useRouter();
  const { tokenId, tokenURI } = router.query;
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const { createSale } = useContext(NFTContext);
  const [loading, setLoading] = useState(true);
  const resell = async () => {
    await createSale(tokenURI, price, true, tokenId);
    router.push('/');
  };
  const fetchNFT = async () => {
    if (!tokenURI) return; // make sure we have access to the tokenURI
    // use tokenURI to get the data of NFT
    // we uploaded to the IPFS file storage
    const { data } = await axios.get(tokenURI);
    setPrice(data.price);
    setImage(data.image);
    setLoading(false);
  };
  useEffect(() => {
    if (tokenURI) fetchNFT();
  }, [tokenURI]);

  if (loading) {
    return (
      <div className="min-h-screen flexStart">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-3/5 md:w-full">
        <h1 className="text-2xl font-semibold font-poppins dark:text-white text-nft-black-1">Resell NFT</h1>

        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => { setPrice(e.target.value)}}
        />

        {image && <img className="mt-4 rounded" width="350" src={image} />}

        <div className="flex justify-end w-full mt-7">
          <Button
            btnName="List NFT"
            btnType="primary"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  );
};

export default Resellnft;
