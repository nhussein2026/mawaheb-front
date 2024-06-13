// src/pages/ProfilePage.js
import React from 'react';
import Profile from '../components/layout/Profile';

const ProfilePage = () => {
  // Example user data
  const user = {
    image: 'https://via.placeholder.com/150', // Placeholder image URL
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone_number: '123-456-7890',
    date_of_birth: '1990-01-01',
    gender: 'Male',
    linkedin_link: 'https://www.linkedin.com/in/johndoe',
    website: 'https://www.johndoe.com',
    userType: 'institute_student',
  };

  return (
    <div className="container mx-auto p-8">
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;
