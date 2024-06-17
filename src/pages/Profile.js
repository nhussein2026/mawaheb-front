import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import defaultProfileImage from '../assets/images/No-profile-pic.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInternetExplorer, faEdit } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    imageUrl: "",
    name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    linkedin_link: "",
    website: ""
  });

  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const userData = await response.json();
        setProfile(userData.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    // Optionally, you can refetch the user profile data here to revert changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        }
      );
      if (!response.ok) {
        throw new Error("Error updating profile");
      }
      setEditMode(false);
      // Optionally, you can refetch the user profile data here to get updated values
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg relative">
      {editMode && (
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      )}
      {!editMode && (
        <button
          onClick={handleEdit}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      )}
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/3">
          <img 
            src={profile.imageUrl || defaultProfileImage} 
            alt={profile.name || "Profile Image"} 
            onError={(e) => e.target.src = defaultProfileImage} 
            className="w-full h-auto rounded-full shadow-md" 
          />
        </div>
        <div className="md:w-2/3 mt-4 md:mt-0 md:ml-8">
          <h2 className="text-4xl text-darkGray font-semibold mb-4">
            {profile.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              {!editMode ? (
                <p className="mt-1 text-lg text-gray-900">{profile.email}</p>
              ) : (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              {!editMode ? (
                <p className="mt-1 text-lg text-gray-900">{profile.phone_number}</p>
              ) : (
                <input
                  type="text"
                  name="phone_number"
                  value={profile.phone_number}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              {!editMode ? (
                <p className="mt-1 text-lg text-gray-900">
                  {profile.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : "N/A"}
                </p>
              ) : (
                <input
                  type="date"
                  name="date_of_birth"
                  value={profile.date_of_birth ? profile.date_of_birth.toISOString().substr(0, 10) : ""}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              {!editMode ? (
                <p className="mt-1 text-lg text-gray-900">{profile.gender}</p>
              ) : (
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              {!editMode ? (
                <a
                  href={profile.linkedin_link}
                  className="mt-1 text-lg text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.linkedin_link}
                </a>
              ) : (
                <input
                  type="text"
                  name="linkedin_link"
                  value={profile.linkedin_link}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Website
              </label>
              {!editMode ? (
                <a
                  href={profile.website}
                  className="mt-1 text-lg text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.website}
                </a>
              ) : (
                <input
                  type="text"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </div>
          </div>
          {editMode && (
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                className="bg-gold text-white hover:bg-mutedGold px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
