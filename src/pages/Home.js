import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { useSelector } from 'react-redux';


const Home = () => {
  const userType = 'institute_student'; // This should be dynamically set based on logged-in user
  const isLoggedIn = useSelector((state) => state.auth.token);;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar userType={userType} />
        <main className="flex-1 p-4">
          {userType === 'institute_student' && ''}
          {/* Add other userType conditions here */}
        </main>
      </div>
    </div>
  );
};

export default Home;
