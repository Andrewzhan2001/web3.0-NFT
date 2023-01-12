import { Banner } from '../components';

// index in each folder will match all route with that folder
// next.js use _app.js to initialize pages and taking routes
// _document.js run at the time server build the object
// Any <head> code, render logic, load fonts and style sheets should be moved to a custom _document.js
// Any shared layout between all pages should be moved to a custom _app.js.
// tailwind css start from small size screen, only need to set exception break point for large screen
const Home = () => (
  <div className="flex justify-center p-12 sm:px-4">
    <div className="w-full minmd:w-4/5">
      <Banner
        banner="Discovering, collecting and selling your personal extraordinary NFTs"
        parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left text-white"
      />
      <div>
        <h1 className="ml-4 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-4xl xs:ml-0">Best Creators</h1>
      </div>
    </div>
    

  </div>
);

export default Home;
