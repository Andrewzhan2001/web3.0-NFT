import { useState, useEffect, useRef, useContext } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Banner, CreatorCard, NFTCard, SearchBar, Loader } from '../components';
import images from '../assets';
/* import { makeId } from '../utils/makeId'; */
import { NFTContext, NFTProvider } from '../context/NFTContext';
import { getCreators } from '../utils/getTopCreators';
import { shortenAddress } from '../utils/shortenAddress';
// index in each folder will match all route with that folder
// next.js use _app.js to initialize pages and taking routes
// _document.js run at the time server build the object
// Any <head> code, render logic, load fonts and style sheets should be moved to a custom _document.js
// Any shared layout between all pages should be moved to a custom _app.js.
// tailwind css start from small size screen, only need to set exception break point for large screen

const Home = () => {
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { fetchNFTs } = useContext(NFTContext);
  const { theme } = useTheme();
  const [hideButtons, setHideButtons] = useState(false);
  const [NFTs, setNFTs] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const topCreators = getCreators(nftsCopy);
  const [activeSelect, setActiveSelect] = useState('Recently Added');
  const [isLoading, setIsLoading] = useState(true);

  const onHandleSearch = (value) => {
    const filteredNfts = NFTs.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));
    setNFTs(filteredNfts);
  };

  const onClearSearch = () => {
    setNFTs(nftsCopy);
  };

  useEffect(() => {
    // spread original nfts to sortedNfts like deep copy
    const sortedNfts = [...NFTs];

    switch (activeSelect) {
      case 'Price (low to high)':
        setNFTs(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case 'Price (high to low)':
        setNFTs(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case 'Recently Added':
        setNFTs(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNFTs(NFTs);
        break;
    }
  }, [activeSelect]);

  const handleScroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;
    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };
  useEffect(() => {
    fetchNFTs().then((items) => {
      setNFTs(items);
      setNftsCopy(items);
      setIsLoading(false);
    });
  }, []);

  /* 拿到这两个ref的current变量，通过addeventlistener来让他每次window变化的时候都run这个function
    每次render结束的时候会清除上一次的地eventlistener */
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;
    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };
  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);
    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });

  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-full minmd:w-4/5">
        <Banner
          banner="Discovering, collecting and selling your personal extraordinary NFTs"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left text-white"
        />
        {!isLoading && NFTs.length === 0 && nftsCopy.length === 0 ? (
          <>
            <h1 className="ml-4 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-4xl xs:ml-0">That&apos;s weird... No NFTs for sale! </h1>
            <h1 className="mt-4 ml-4 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-4xl xs:ml-0">Why not create your own NFTs by top right button ?</h1>
          </>
        ) : isLoading ? <Loader /> : (
          <>
            <div>
              <h1 className="ml-4 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-4xl xs:ml-0">Top Creators</h1>
              <div className="relative flex flex-1 max-w-full mt-3" ref={parentRef}>
                <div className="flex flex-row overflow-x-scroll select-none w-max no-scrollbar" ref={scrollRef}> {/* overflow的话就有一个x轴的scroll */}
                  {
                  topCreators.map((creator, index) => (
                    <CreatorCard
                      key={creator.seller}
                      rank={index + 1}
                      creatorImage={images[`creator${index + 1}`]}
                      creatorName={shortenAddress(creator.seller)}
                      creatorEths={creator.sum}
                    />

                  ))
                }
                  {/*  {[6, 7, 8, 9, 10].map((i) => (
                  <CreatorCard
                    creatorImage={images[`creator${i}`]}
                    rank={i}
                    creatorName={`0x${makeId(3)}...${makeId(4)}`}
                    key={`creator-${i}`}
                    creatorEths={10 - i * 0.434}
                  /> */}
                  {/* for creatorEths, to rank from the one with highest amount of etherium */}
                  {!hideButtons && (
                  <>
                    <div onClick={() => { handleScroll('left'); }} className="absolute left-0 w-8 h-8 cursor-pointer minlg:w-12 minlg:h-12 top-45">
                      <Image src={images.left} fill alt="left_arrow" className={theme === 'light' ? 'filter invert object-contain' : 'object-contain'} />
                    </div>
                    <div onClick={() => { handleScroll('right'); }} className="absolute right-0 w-8 h-8 cursor-pointer minlg:w-12 minlg:h-12 top-45">
                      <Image src={images.right} fill objectFit="contain" alt="left_arrow" className={theme === 'light' ? 'filter invert object-contain' : 'object-contain'} />
                    </div>
                  </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="mx-4 flexBetween xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                <h1 className="flex-1 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-4xl sm:mb-4">Hot Bids</h1>

                <div className="flex flex-row flex-2 sm:w-full sm:flex-col">
                  <SearchBar
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    handleSearch={onHandleSearch}
                    clearSearch={onClearSearch}
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-start w-full mt-3 md:justify-center">
                {NFTs.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
                {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <NFTCard
                  key={`nft-${i}`}
                  nft={{
                    i,
                    seller: `0x${makeId(3)}...${makeId(4)}`,
                    price: (10 - i * 0.434).toFixed(2),
                    description: 'Extraordinary NFT on Sale',
                    name: `Nifty NFT ${i}`,
                    owner: `0x${makeId(3)}...${makeId(4)}`,
                  }}
                />
              ))} */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
