import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import PopupModal from "../components/ui/PopupModal";
import { useDispatch } from "react-redux";
import { login } from '../features/user/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        if (isMounted.current) {
          setModalMessage("Login successful");
          setShowModal(true);
          const { token } = data;
          const user = { id: data.user.id, role: data.user.role, email: data.user.email };
          console.log("this is user: ", user)
          dispatch(login({ token, user }));
          navigate('/');
        }
      } else {
        if (isMounted.current) {
          setModalMessage(data.message);
          setShowModal(true);
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-veryLightGray">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-darkGray mb-6">
          Log In
        </h2>
        <form onSubmit={handleSubmit}>
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
          <div className="flex justify-between items-center mb-4">
            <button
              type="submit"
              className="bg-gold text-white py-2 px-4 rounded hover:bg-mutedGold"
            >
              Log In
            </button>
            <Link
              to="/forgot-password"
              className="text-sm text-gray-700 hover:text-gold"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            Don't have an account?{" "}
            <Link to="/register" className="text-gold">
              Register here
            </Link>
          </p>
        </div>
      </div>
      {showModal && (
        <PopupModal
          message={modalMessage}
          type={typeof modalMessage === 'string' && modalMessage.includes("success") ? "success" : "failed"}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Login;
