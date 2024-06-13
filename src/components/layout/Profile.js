// src/components/layout/Profile.js
import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/3">
          <img src={user.image} alt={user.name} className="w-full h-auto rounded-full shadow-md" />
        </div>
        <div className="md:w-2/3 mt-4 md:mt-0 md:ml-8">
          <h2 className="text-4xl text-darkGray font-semibold mb-4">{user.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <p className="mt-1 text-lg text-gray-900">{user.phone_number}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <p className="mt-1 text-lg text-gray-900">{new Date(user.date_of_birth).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <p className="mt-1 text-lg text-gray-900">{user.gender}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
              <a href={user.linkedin_link} className="mt-1 text-lg text-blue-600" target="_blank" rel="noopener noreferrer">
                {user.linkedin_link}
              </a>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <a href={user.website} className="mt-1 text-lg text-blue-600" target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">User Type</label>
              <p className="mt-1 text-lg text-gray-900 capitalize">{user.userType.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
