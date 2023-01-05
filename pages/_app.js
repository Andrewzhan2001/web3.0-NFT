import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import { Footer, Navbar } from '../components';

const App = ({ Component, pageProps }) => (
  // we will change the light and dark mode depend on different classes
  <ThemeProvider attribute="class">
    <div className="dark:bg-nft-dark bg-white min-h-screen">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
    {/* fontawesome for icons on the page */}
    <script src="https://kit.fontawesome.com/b32c0febbc.js" crossOrigin="anonymous" />
  </ThemeProvider>
  

);

export default App;
