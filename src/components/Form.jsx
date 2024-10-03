import React, { useState, useEffect } from "react";
import { SparklesCore } from "../components/ui/sparkles";

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

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    description: "",
    bountyPrize: "",
  });

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

  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const getContract = async () => {
      try {
        if (window.tronLink && window.tronLink.tronWeb) {
          const instance = await window.tronLink.tronWeb.contract(
            BountyABI,
            "TBVxqmxC2Vpym5rJs44cibHzPMnjvgmXWL" // Smart contract address
          );
          setContract(instance);
        } else {
          setError("TronLink wallet not detected. Please install TronLink.");
        }
      } catch (err) {
        setError("Failed to connect to the contract. Please check your network.");
      }
    };

    getContract();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const { name, contact, description, bountyPrize } = formData;

    try {
      if (contract) {
        // const prizeInWei = window.tronLink.tronWeb.toSun(bountyPrize); 
        const prizeInSunHex = window.tronLink.tronWeb.toSun(bountyPrize); // Returns hex

        
        // Call the contract method with form data
        const result = await contract
          .submitForm(name, contact, description, bountyPrize)
          .send({
            feeLimit: 1000000000, // Specify fee limit
            shouldPollResponse: true,
          });

        const transactionId = result.txID;
        setSuccess(`Bounty listed successfully! `);
        console.log(`${name},${contact},${description},${bountyPrize}`)
      } else {
        setError("Contract is not available. Please try again later.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
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
      <div className="relative z-10 min-h-screen bg-black flex items-center justify-center">
        <div className="p-6 max-w-md mx-auto bg-gray-800 text-white rounded-md mt-[0px] w-[500px]">
          <h2 className="text-2xl font-bold mb-4">Meme ART Request</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-black border border-red-700 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contact" className="block mb-2">
                Contact:
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-black border border-red-700 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-2">
                Meme Description:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-black border border-red-700 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="bountyPrize" className="block mb-2">
                Bounty Prize (in TRX):
              </label>
              <input
                type="number"
                id="bountyPrize"
                name="bountyPrize"
                value={formData.bountyPrize}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-black border border-red-700 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className={`px-4 py-2 bg-red-700 hover:bg-slate-900 rounded-md ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
