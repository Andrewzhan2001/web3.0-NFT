import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import images from '../assets';
import { Button } from '.';

const FooterLinks = ({ heading, items, extraClasses }) => (
  <div className={`flex-1 justify-start items-start ${extraClasses}`}>
    <h3 className="mb-10 text-xl font-semibold text-center font-poppins dark:text-white text-nft-black-1">{heading}</h3>
    {items.map((item, index) => <p key={item + index} className="my-3 text-base font-normal text-center cursor-pointer font-poppins dark:text-white text-nft-black-1 dark:hover:text-nft-gray-1 hover:text-nft-black-1">{item}</p>)}
  </div>
);

const Footer = () => {
  const { theme } = useTheme();
  const [clicked, setClicked] = useState(false);
  return (
    <footer className="flex-col py-16 border-t flexCenter dark:border-nft-black-1 border-nft-gray-1 sm:py-8">
      <div className="flex flex-row w-full px-16 minmd:w-4/5 md:flex-col sm:px-4">
        <div className="flex-col flex-1 flexStart">
          <div className="flexCenter">
            <i className="fa-brands fa-viacoin fa-flip fa-3x text-nft-red-violet" />
            <p className="ml-1 text-lg font-semibold dark:text-white text-nft-dark">CryptoMarket</p>
          </div>
          <p className="mt-6 text-base font-semibold font-poppins dark:text-white text-nft-black-1">Get the latest updates</p>
          {clicked ? (
            <div className="flex items-center justify-center mt-6 bg-white rounded-md md:w-full minlg:w-557 w-357 dark:bg-nft-dark">
              <i className="fa-solid fa-check fa-2xl" />
              <h3 className="ml-3 text-xl font-semibold font-poppins dark:text-white text-nft-black-1">Thank you for joining the updates!</h3>
            </div>
          ) : (
            <div className="mt-6 bg-white border rounded-md flexBetween md:w-full minlg:w-557 w-357 dark:bg-nft-black-2 dark:border-nft-black-2 border-nft-gray-2">
              <input type="email" placeholder="Your Email" className="flex-1 w-full h-full px-4 text-xs font-normal bg-white rounded-md outline-none dark:bg-nft-black-2 font-poppins dark:text-white text-nft-black-1 minlg:text-lg" />
              <div className="flex-initial">
                <Button
                  btnName="Email me !!!"
                  btnType="primary"
                  classStyles="rounded-md"
                  handleClick={() => { setClicked(true); }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex-wrap flex-1 ml-10 flexBetweenStart md:ml-0 md:mt-8">
          <FooterLinks heading="CryptoMarket" items={['Explore', 'How it Works', 'Contact Us']} />
          <FooterLinks heading="Support" items={['Help Center', 'Terms of service', 'Legal', 'Privacy policy']} extraClasses="ml-4" />
        </div>
      </div>

      <div className="w-full px-16 mt-5 border-t flexCenter dark:border-nft-black-1 border-nft-gray-1 sm:px-4">
        <div className="flex-row w-full flexBetween minmd:w-4/5 sm:flex-col mt-7"> {/* from minimum to medium let the width to be that 80% */}
          <p className="text-base font-semibold font-poppins dark:text-white text-nft-black-1">Tianyi's Project, All Rights Reserved</p>
          <div className="flex flex-row sm:mt-4">
            {[images.instagram, images.twitter, images.telegram, images.discord].map((image, index) => (
              <div className="mx-2 cursor-pointer" key={`image ${index}`}>
                <Image src={image} key={index} objectFit="contain" width={24} height={24} alt="social" className={theme === 'light' ? 'filter invert' : undefined} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
