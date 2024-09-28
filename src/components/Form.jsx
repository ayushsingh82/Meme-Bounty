import React, { useState } from 'react';

const Form = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    aiAgent: '',
    bountyPrize: ''
  });

  // State to handle loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Here, you would typically handle form submission logic, such as sending the form data to a backend server.
      // For now, we are just logging the form data to the console.
      console.log('Form Data Submitted:', formData);

      setSuccess('Form submitted successfully!');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="p-6 max-w-md mx-auto bg-gray-800 text-white rounded-md mt-[0px] w-[500px] ">
        <h2 className="text-2xl font-bold mb-4">Meme ART Request </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name:</label>
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
            <label htmlFor="contact" className="block mb-2">Contact:</label>
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
            <label htmlFor="aiAgent" className="block mb-2">AI Agent Needed:</label>
            <input
              type="text"
              id="aiAgent"
              name="aiAgent"
              value={formData.aiAgent}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 border border-red-700 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bountyPrize" className="block mb-2">Bounty Prize:</label>
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
            className={`px-4 py-2 bg-red-700 hover:bg-slate-900 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
