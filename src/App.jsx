import React from 'react'; 
import * as web3 from "@solana/web3.js";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ToastContainer } from 'react-toastify';
import '@solana/wallet-adapter-react-ui/styles.css';
import 'react-toastify/dist/ReactToastify.css'; 
import Header from './components/Airdrop';
import { Outlet, Route, Routes } from 'react-router-dom';
import Home from './components/Home';


function App() {
  window.Buffer = Buffer;
  // const endpoint = web3.clusterApiUrl('devnet')
  return (
    <div>
      <ConnectionProvider endpoint="https://devnet.helius-rpc.com/?api-key=63535c34-1392-4ac4-a796-89c5ff86923d">
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className='flex items-center text-center justify-between'>
              <Home/>
              <WalletMultiButton style={{ background: 'white', color: 'black', marginRight: '6rem' }} />
            </div>
              <ToastContainer position="bottom-right"
                reverseOrder={false} />
            <Outlet/>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      
    </div>
  );
}



export default App;
