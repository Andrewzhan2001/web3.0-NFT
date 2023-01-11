import React from 'react';

const Button = ({ btnName, classStyles, handleClick}) => (
  <button
    type="button"
    className={`px-6 py-2 text-sm font-semibold text-white nft-gradient minlg:text-lg minlg:px-8 font-poppins ${classStyles}`}
    onClick={handleClick}
  >
    {btnName}
  </button>

);

export default Button;
