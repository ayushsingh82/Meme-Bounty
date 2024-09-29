import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider,createRoutesFromElements} from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Form from './components/Form.jsx'

// import { Web3AuthNoModal } from "@web3auth/no-modal";
// import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
// import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS, WEB3AUTH_NETWORK, CustomChainConfig } from "@web3auth/base";
// import { AuthAdapter, AuthLoginParams } from "@web3auth/auth-adapter";

// import TronRpc from "./tronRPC.js";

// const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

// const chainConfig = {
//   chainNamespace: CHAIN_NAMESPACES.EIP155,
//   chainId: "0x94a9059e", // "0x2b6653dc" for Tron Mainnet
//   rpcTarget: "https://api.shasta.trongrid.io/jsonrpc",
//   displayName: "TRON Shasta Testnet",
//   blockExplorerUrl: "https://shasta.tronscan.org",
//   ticker: "TRX",
//   tickerName: "TRON",
//   logo: "https://cryptologos.cc/logos/tron-trx-logo.png",
// };

// import '@rainbow-me/rainbowkit/styles.css';

// import {
//   getDefaultConfig,
//   RainbowKitProvider,
// } from '@rainbow-me/rainbowkit';
// import { WagmiProvider } from 'wagmi';
// import {
//   sepolia,
//   optimismGoerli,
//   arbitrumGoerli,
//   polygonMumbai,
// } from 'wagmi/chains';
// import {
//   QueryClientProvider,
//   QueryClient,
// } from "@tanstack/react-query";

// const config = getDefaultConfig({
//   appName: 'My RainbowKit App',
//   projectId: 'e7fa7d19fd057ecd9403a0e89bd62b8b',
//   chains: [sepolia, optimismGoerli, arbitrumGoerli, polygonMumbai],
//   ssr: false
// });

// const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path='/' element={<Home/>}/>
    <Route path='/form' element={<Form/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Navbar/>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)



// <WagmiProvider config={config}>
// <QueryClientProvider client={queryClient}>
 
//  <Navbar/>
//  <RouterProvider router={router}/>

// </QueryClientProvider>
// </WagmiProvider>