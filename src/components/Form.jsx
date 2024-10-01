import React, { useState, useEffect } from "react";

const Form = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    description: "",
    bountyPrize: "",
  });

  const BountyABI = [
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "userAddress", type: "address" },
        { indexed: false, internalType: "string", name: "name", type: "string" },
        { indexed: false, internalType: "string", name: "contact", type: "string" },
        { indexed: false, internalType: "string", name: "description", type: "string" },
        { indexed: false, internalType: "uint256", name: "prize", type: "uint256" },
      ],
      name: "FormSubmitted",
      type: "event",
    },
    {
      inputs: [{ internalType: "address", name: "_user", type: "address" }],
      name: "getForm",
      outputs: [
        { internalType: "string", name: "", type: "string" },
        { internalType: "string", name: "", type: "string" },
        { internalType: "string", name: "", type: "string" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "string", name: "_contact", type: "string" },
        { internalType: "string", name: "_description", type: "string" },
        { internalType: "uint256", name: "_prize", type: "uint256" },
      ],
      name: "submitForm",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch contract instance when the component mounts
  useEffect(() => {
    const getContract = async () => {
      const instance = await window.tronLink.tronWeb.contract(
        BountyABI,
        "TG92DKfwsf7b2RgBCrwrbEuEomPuKUrAek" // Replace with your actual contract address
      );
      setContract(instance);
    };

    getContract();
  }, []);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const { name, contact, description, bountyPrize } = formData;

    try {
      if (contract) {
        // Call the contract method with form data
        const result = await contract.submitForm(name, contact, description, bountyPrize).send({
          feeLimit: 1000000000,
          shouldPollResponse: true,
        });

        const transactionId = result.txID;
        console.log("Transaction ID:", transactionId);
        console.log(`${name}, ${contact}, ${description},${bountyPrize}`)

        setSuccess("Bounty listed successfully! Transaction ID: " + transactionId);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="p-6 max-w-md mx-auto bg-gray-800 text-white rounded-md mt-[0px] w-[500px]">
        <h2 className="text-2xl font-bold mb-4">Meme ART Request </h2>
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
              className="w-full px-3 py-2 bg-gray-900 border border-red-700 rounded-md"
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
              className="w-full px-3 py-2 bg-gray-900 border border-red-700 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">
              AI Agent Needed:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 border border-red-700 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bountyPrize" className="block mb-2">
              Bounty Prize:
            </label>
            <input
              type="number"
              id="bountyPrize"
              name="bountyPrize"
              value={formData.bountyPrize}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 border border-red-700 rounded-md"
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
  );
};

export default Form;
