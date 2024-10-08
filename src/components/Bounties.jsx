import React, { useEffect, useState } from "react";
import { SparklesCore } from "../components/ui/sparkles";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";


// Bounty contract ABI and address
const BountyABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "contact",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "prize",
          "type": "uint256"
        }
      ],
      "name": "FormSubmitted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allSubmissions",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "contact",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "prize",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "submitter",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllSubmissions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "contact",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "prize",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "submitter",
              "type": "address"
            }
          ],
          "internalType": "struct UserForm.User[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_contact",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_prize",
          "type": "uint256"
        }
      ],
      "name": "submitForm",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "submittedForms",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "contact",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "prize",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "submitter",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]


// Typewriter Effect for the header
const TypewriterEffectSmoothDemo = () => {
  const words = [
    { text: "Unleash Your Creativity &" },
    { text: "Earn  ", className: "" },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-red-700 mt-4 z-10">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
};

// BountyCard component to display the bounty details
const BountyCard = ({ name, contact, description, prize }) => {
  return (
    <div className="bg-slate-900 text-white border border-4 border-white shadow-md shadow-white rounded-lg p-6 w-full max-w-sm">
    <div className="border border-white p-2 rounded-lg mb-2 bg-red-800">
      <h3 className="text-md font-semibold">Name: {name}</h3>
    </div>
    
    <div className="border border-white p-2 rounded-lg mb-2 bg-red-800">
    <p className="text-sm font-bold">
      Contact:
      <a href={`mailto:${contact}`} target="_blank" rel="noopener noreferrer">
        <strong> {contact} </strong>
      </a>
    </p>
  </div>
  
  
    <div className="border border-white p-2 rounded-lg mb-2 bg-red-800">
      <p className="text-sm">
        <strong>Description:</strong> {description}
      </p>
    </div>
    
    <div className="border border-white p-2 rounded-lg bg-red-800">
      <p className="text-md">
        <strong>Bounty Prize:</strong> {prize} TRX
      </p>
    </div>
  </div>
  
  );
};

// Main Bounties component
const Bounties = () => {
    const [bounties, setBounties] = useState([]); // This is the state holding your bounty data
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchBounties = async () => {
        try {
          const contract = await window.tronLink.tronWeb.contract(
            BountyABI,
            "TBVxqmxC2Vpym5rJs44cibHzPMnjvgmXWL"
          );
  
          const bountyData = await contract.getAllSubmissions().call();
          console.log(bountyData);

        //   const prizeInSun = window.tronLink.tronWeb.toSun(bountyPrize); // Still returns BigNumber
        //  const prizeInTRX = window.tronLink.tronWeb.fromSun(prizeInSun); // Convert to TRX (string or number)

  
          // Set bountyData to state correctly
          setBounties(bountyData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching bounties:", error);
          setIsLoading(false);
        }
      };
  
      fetchBounties();
    }, []);
  
    if (isLoading) {
      return <div className="text-white">Loading bounties...</div>;
    }
  
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {bounties.length > 0 ? (
            bounties.map((bounty, index) => (
              <BountyCard
                key={index}
                name={bounty.name}
                contact={bounty.contact}
                description={bounty.description}
                prize={parseInt(bounty.prize._hex,16)}
              />
            ))
          ) : (
            <p className="text-white">No bounties available at the moment.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default Bounties;