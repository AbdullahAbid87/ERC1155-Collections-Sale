import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NFT from './pages/NFT';
import Navbar from './components/Navbar';
import { ToastProvider } from "react-toast-notifications";
const App = () => {
  const [address, setAddress] = useState(null);
  return (
    <div className="App">
      <ToastProvider>
        <BrowserRouter>
          <Navbar
            address={address}
            setAddress={setAddress}
          />
          <Routes>
            <Route exact path={'/'} element={<Home />} />
            <Route exact path={'/nft'}
              element={
                <NFT
                  address={address}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </div>
  );
}

export default App;
