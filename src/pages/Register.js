import React, { useState } from "react";
import { Link } from "react-router-dom";
import PopupModal from "../components/ui/PopupModal";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false); // State for showing/hiding the modal
  const [modalMessage, setModalMessage] = useState(""); // State for the modal message
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State for tracking registration success
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Registration successful, set success message and show modal
        setModalMessage(data.message);
        setShowModal(true);
        setRegistrationSuccess(true);
      } else {
         // Registration failed, set error message and show modal
         setModalMessage(data.message);
         setShowModal(true);
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-veryLightGray">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-darkGray mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-gold"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-gold"
            />
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-gold"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gold text-white py-2 px-4 rounded hover:bg-mutedGold"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-gold">
              Log in here
            </Link>
          </p>
        </div>
      </div>
      {showModal && (
        <PopupModal
          message={modalMessage}
          type={modalMessage.includes("success") ? "success" : "failed"}
          button1={registrationSuccess}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Register;
