import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button } from '.';
import { NFTContext } from '../context/NFTContext';

const MenuItems = ({ isMobile, active, setActive, setIsOpen }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0: return '/';
      case 1: return '/listed-nfts';
      case 2: return '/my-nfts';
      default: return '/';
    }
  };
  return (
    <ul className={`list-none flexCenter flex-row  ${isMobile && 'flex-col h-full'}`}>
      {/* for the map i is the index */}
      {['Explore NFTs', 'My selling NFTs', 'My Purchased NFTs'].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item);
            setIsOpen(false);
          }}
          className={`flex flex-row w-[2.6] items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
          ${active === item
            ? 'dark:text-white text-nft-black-1'
            : 'dark:text-nft-gray-3 text-nft-gray-2'}`}
        >
          <Link className={`${isMobile && 'text-3xl p-4'}`} href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router, setIsOpen }) => {
  const { connectWallet, currentAccount } = useContext(NFTContext);

  return currentAccount ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('');
        setIsOpen(false);
        router.push('/create-nft');
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        connectWallet();
        setIsOpen(false);
      }}
    />
  );
};
const checkActive = (active, setActive, router) => {
  switch (router.pathname) {
    case '/':
      if (active !== 'Explore NFTs') setActive('Explore NFTs');
      break;
    case '/listed-nfts':
      if (active !== 'My selling NFTs') setActive('My selling NFTs');
      break;
    case '/my-nfts':
      if (active !== 'My Purchased NFTs') setActive('My Purchased NFTs');
      break;
    case '/create-nft':
      setActive('');
      break;
    default:
      setActive('');
  }
};

const Navbar = () => {
  // automatically set the theme which is decided by dark: prefix
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState('Explore NFTs');
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    checkActive(active, setActive, router);
  }, [router.pathname]);

  return (
    /* for the nagivation bar */
    <nav className="fixed z-10 flex-row w-full p-4 bg-white border-b flexBetween dark:bg-nft-dark dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-row justify-start flex-1">
        <Link href="/">
          <div className="cursor-pointer flexCenter md:hidden">
            <i className="fa-brands fa-viacoin fa-flip fa-3x text-nft-red-violet" />
            <p className="ml-1 text-lg font-semibold dark:text-white text-nft-black-1">CryptoMarket</p>
          </div>
        </Link>
        <Link href="/">
          {/* make display = flex being not hidden, following for small screen */}
          <div className="hidden md:flex" onClick={() => {}}>
            <i className="fa-brands fa-viacoin fa-flip fa-3x text-nft-red-violet" />
          </div>
        </Link>
      </div>

      {/* this is the div for the large screen  */}
      <div className="flex flex-row justify-end flex-initial">
        <div className="flex items-center mr-2">
          <input type="checkbox" className="checkbox" checked={theme === 'light'} id="checkbox" onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
          <label htmlFor="checkbox" className="relative p-1 bg-black cursor-pointer w-11 rounded-2xl flexBetween label">
            <i className="fas fa-sun fa-shake" />
            <i className="fas fa-moon fa-shake" />
            <div className="absolute bg-white rounded-full ball" />
          </label>
        </div>
        <div className="flex md:hidden">
          <MenuItems active={active} setActive={setActive} setIsOpen={setIsOpen} />
          <div>
            <ButtonGroup setActive={setActive} router={router} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>

      {/* right side manu for the mobile device */}
      <div className="hidden ml-3 cursor-pointer md:flex">
        {isOpen
          ? (
            <i className="fa-solid fa-xmark fa-2xl fa-fade fa-manual" onClick={() => setIsOpen(false)} />
          ) : (
            <i className="fa-solid fa-bars fa-2xl fa-fade fa-manual" onClick={() => setIsOpen(true)} />
          )}
        {isOpen && (
          <div className="fixed inset-0 z-10 flex flex-col justify-between bg-white top-65 dark:bg-nft-dark nav-h">
            <div className="flex-1 p-4">
              {/* isMobile默认为true */}
              <MenuItems active={active} setActive={setActive} isMobile setIsOpen={setIsOpen} />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup setActive={setActive} router={router} setIsOpen={setIsOpen} />
            </div>
          </div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
