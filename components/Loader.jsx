import React from 'react';
import Image from 'next/image';
import images from '../assets';

const Loader = () => (
  <div className="w-full my-4 flexCenter">
    <Image className="object-contain" src={images.loader} width={100} height={100} alt="loader" />
  </div>
);

export default Loader;
