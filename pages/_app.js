import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import { Footer, Navbar } from '../components';
import { NFTProvider } from '../context/NFTContext';

const App = ({ Component, pageProps }) => (
  // we will change the light and dark mode depend on different classes
  <NFTProvider>
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-white dark:bg-nft-dark">
        <Navbar />
        <div className="pt-65">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
      {/* fontawesome for icons on the page */}
      <Script src="https://kit.fontawesome.com/b32c0febbc.js" crossOrigin="anonymous" />
    </ThemeProvider>
  </NFTProvider>

);

export default App;
