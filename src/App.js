import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';
import Layout from "./Layout";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import WebDesignPage from "./pages/WebDesign";
import TermsAndConditions from "./pages/TermsAndConiditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import WebDevelopment from "./pages/WebDevelopment";
import WebApp from "./pages/WebAppPage";
import Portfolio from "./pages/Portfolio";
import LoadingScreen from './components/LoadingScreen';
import i18n from './i18n';
import ScrollToTop from "./components/ScrollToTop"; // Import ScrollToTop

function App() {
  const [loading, setLoading] = useState(true); // Starea pentru încărcare

  const handleLoaded = () => {
    setLoading(false); // Actualizăm starea când încărcarea s-a terminat
  };

  useEffect(() => {
    // Dezactivează click-dreapta
    document.addEventListener('contextmenu', (event) => event.preventDefault());

    // Dezactivează tastele funcționale pentru DevTools
    const disableDevToolsShortcuts = (event) => {
      if (
        event.keyCode === 123 || // F12
        (event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl+Shift+I
        (event.ctrlKey && event.shiftKey && event.keyCode === 74) || // Ctrl+Shift+J
        (event.ctrlKey && event.keyCode === 85) || // Ctrl+U
        (event.ctrlKey && event.shiftKey && event.keyCode === 67) // Ctrl+Shift+C
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', disableDevToolsShortcuts);

    return () => {
      document.removeEventListener('contextmenu', (event) => event.preventDefault());
      window.removeEventListener('keydown', disableDevToolsShortcuts);
    };
  }, []);





  if (loading) {
    return <LoadingScreen onLoaded={handleLoaded} />;
  }
  

  

  return (
    <div className="app-content">
      <Router>
        <ScrollToTop /> {/* Adaugă ScrollToTop aici */}
        <Layout>
          <div className="container main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/navbar" element={<Navbar />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/webdesign" element={<WebDesignPage />} />
              <Route path="/termeni-si-conditii" element={<TermsAndConditions />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/webdevelopment" element={<WebDevelopment />} />
              <Route path="/WebApp" element={<WebApp />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
