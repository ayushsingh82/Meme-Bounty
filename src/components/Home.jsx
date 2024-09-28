import React from 'react';
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./ui/tracing-beam";
import { TypewriterEffectSmooth } from './ui/typewriter-effect';

import { BackgroundBeams } from "./ui/background-beams";

function BackgroundBeamsDemo() {
    return (
      <div className="h-screen w-screen rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased py-[-200px]">
        <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-3xl bg-clip-text  bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
        <TypewriterEffectSmoothDemo/>
      </h1>
      <p></p>
      <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
        Welcome to MemeBounty, the ultimate meme platform powered by the TRON blockchain! 
        Post bounties, create viral meme masterpieces, and earn rewards in TRON. Whether 
        you're a meme creator or just a fan, dive into the world of decentralized meme 
        culture and let your creativity thrive.
      </p>
      
          <button className='mt-[20px] ml-[170px] border-2 border-red-700 text-white px-[10px] py-[10px] font-medium text-xl bg-gradient-to-r from-red-700 via-black to-black rounded-lg mx-auto'>
          Join the community
      </button>
        </div>
        <BackgroundBeams />
      </div>
    );
  }


  const TypewriterEffectSmoothDemo = () => {
    const words = [
        { text: "Unleash Your Creativity on" },
        { text: "Tron , ", className: "text-red-700" },
        { text: "one" },
        { text: "meme", className: "text-red-700" },
        { text: "at a Time!." },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-[5rem] mt-[40px]">
            <TypewriterEffectSmooth words={words} />
        </div>
    );
};

function Home() {
    return (
        <div className='flex flex-col items-center bg-black scroller min-h-screen'>
            <div className='text-4xl'>
            <BackgroundBeamsDemo/>
            </div>
           
        </div>
    )
}

export default Home


