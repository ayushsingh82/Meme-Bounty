import React ,{useState,useEffect} from 'react'

import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';

function Navbar() {
  const { connect, disconnect, select, connected } = useWallet();
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to initialize wallet connection and fetch the wallet address
  const initSignin = async () => {
    setLoading(true);
    try {
      if (window.tronLink === undefined) {
        console.log("TronLink not found");
        return;
      }

      // Request connection if not connected
      if (!window.tronLink.ready) {
        await window.tronLink.request({ method: "tron_requestAccounts" });
      }

      // Fetch the wallet address after connection
      const address = window.tronLink.tronWeb.defaultAddress.base58;
      console.log("Wallet Address:", address);
      setWalletAddress(address);

      // Optionally use connect() if managing wallet connection via tronwallet-adapter
      await connect();
    } catch (error) {
      console.error("Error while signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if TronLink is connected and update the wallet address
  useEffect(() => {
    if (window.tronLink && window.tronLink.ready) {
      const address = window.tronLink.tronWeb.defaultAddress.base58;
      setWalletAddress(address);
    }
  }, [connected]);

    return (
      <nav className=''>
        <div className='flex flex-row mx-auto px-[40px] py-[25px] justify-between items-center mt-[0px] bg-black'>
          <div className='font-bold text-2xl text-red-700'>
            <a href='/'>Tron-Art</a>
          </div>
          <div className='flex justify-center flex-1 space-x-8 text-center'>
            <h1 className='font-medium text-xl text-white'>
              <a href='/form'>Dashboard</a>
            </h1>
            <h1 className='font-medium text-xl text-white'>
              <a href='/bounties'>Bounties</a>
            </h1>
          </div>

          <div className="text-white border border-2 border-red-500 font-medium px-[10px] py-[5px] bg-gradient-to-r from-red-700 via-red-500 to-red-800">
          {walletAddress ? (
            <p>Connected: {`${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}</p>
          ) : (
            <button onClick={initSignin} disabled={loading}>
              {loading ? "Connecting..." : "Connect Wallet"}
            </button>
          )} 
          </div>
         
        </div>
        <hr className='border-t-2 border-red-700' />
      </nav>
    );
  }
  

export default Navbar