import React from 'react';
import { SparklesCore } from "../components/ui/sparkles";
import { TypewriterEffectSmooth } from './ui/typewriter-effect';

function SparklesPreview() {
  return (
    <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
    </div>
  );
}

const TypewriterEffectSmoothDemo = () => {
  const words = [
    { text: "Unleash Your Creativity &" },
    { text: "Earn , ", className: "" },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-red-700 mt-4 z-10">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
};

const BountyCard = ({ name, contact, description, prize }) => {
  return (
    <div className="bg-gray-800 text-white border border-2 border-red-500 shadow-md shadow-white rounded-lg p-6 w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-2">Name: {name}</h3>
      <p className="text-sm mb-2">
        <strong>Contact:</strong> {contact}
      </p>
      <p className="text-sm mb-2">
        <strong>Description:</strong> {description}
      </p>
      <p className="text-md">
        <strong>Bounty Prize:</strong> {prize} TRX
      </p>
    </div>
  );
};

const Bounties = () => {
  return (
    <div className="min-h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      {/* Particle background */}
      <div className="w-full absolute inset-0 h-screen z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Typewriter Effect */}
      <div className="relative z-10 mt-[-170px] text-red-500">
        <TypewriterEffectSmoothDemo />
      </div>

      {/* Bounty Cards Side by Side */}
      <div className="relative z-10 flex flex-row gap-x-6 justify-center items-center mt-8">
      <BountyCard   />
        <BountyCard   />
      </div>
    </div>
  );
};

export default Bounties;
