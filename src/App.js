import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import { useState } from "react";
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
