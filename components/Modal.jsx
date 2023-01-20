import React, { useRef } from 'react';
import Image from 'next/image';
import images from '../assets';

const Modal = ({ header, body, footer, handleClick }) => {
  // use useRef when we want to interact with jsx elements with javascript
  const modalRef = useRef(null);
  const handleClickOutside = (event) => {
    // checking if the modalRef contains the click event
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClick();
    }
  };

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 z-10 flexCenter bg-overlay-black animated fadeIn">
      <div ref={modalRef} className="flex flex-col w-2/5 bg-white rounded-lg md:w-11/12 minlg:w-2/4 dark:bg-nft-dark">
        <div className="flex justify-end mt-4 mr-4 minlg:mt-6 minlg:mr-6">
          <div
            className="relative w-3 h-3 cursor-pointer minlg:w-6 minlg:h-6"
            onClick={handleClick}
          >
            <i className="fa-solid fa-xmark fa-2xl fa-fade fa-manual" />
          </div>
        </div>

        <div className="w-full p-4 text-center flexCenter">
          <h2 className="text-2xl font-normal font-poppins dark:text-white text-nft-black-1">{header}</h2>
        </div>
        <div className="p-10 border-t border-b sm:px-4 dark:border-nft-black-3 border-nft-gray-1">
          {body}
        </div>
        <div className="p-4 flexCenter">
          {footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;
