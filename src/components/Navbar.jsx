import React from 'react'
// import { ConnectButton } from '@rainbow-me/rainbowkit';

function Navbar() {
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
              <a href='/'>Bounties</a>
            </h1>
          </div>
          <div className='text-white'>
           Connect
          </div>
        </div>
        <hr className='border-t-2 border-red-700' />
      </nav>
    );
  }
  

export default Navbar