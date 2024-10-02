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

// Main Bounties component
const Bounties = () => {
  const [bounties, setBounties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bountyData,setBountyData]=useState([]);

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const contract = await window.tronLink.tronWeb.contract(
          BountyABI,
          "TBVxqmxC2Vpym5rJs44cibHzPMnjvgmXWL"
        );
        const bountyAddresses = ["address1", "address2"]; 

        const bountyData = await contract.getAllSubmissions().call();
        console.log(bountyData)
        setBounties(bountyData);
       
        // const fetchedBounties = await Promise.all(

        //   bountyAddresses.map(async () => {
        //     const bountyData = await contract.getForm().call();
        //     const [name, contact, description, prize] = bountyData;
        //     return { name, contact, description, prize };
        //   })
        // );
   
        // setBounties(fetchedBounties);
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
      <div className="relative z-10 flex flex-row gap-x-6 justify-center items-center mt-8">
        {bounties.length > 0 ? (
            bountyData.map((bounty, index) => (
            <BountyCard
              key={index}
              name={bounty.name}
              contact={bounty.contact}
              description={bounty.description}
              prize={bounty.prize}
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
