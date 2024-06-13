// // src/components/Header.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import DropdownMenu from '../ui/DropdownMenu';

// const Header = () => {
//     const { isLoggedIn, user } = useSelector((state) => state.auth || { isLoggedIn: false, user: null });

//   return (
//     <header className="bg-maroon text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold text-gold">
//           Foundation Platform
//         </Link>
//         <nav className="space-x-4">
//           {isLoggedIn ? (
//             <DropdownMenu user={user} />
//           ) : (
//             <Link to="/login" className="hover:text-gold">Login</Link>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/user/authSlice';

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // Perform any additional logout actions, such as redirecting the user
  };

  return (
    <header className="bg-maroon text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gold">
          Foundation Platform
        </Link>
        <nav className="space-x-4">
          {isLoggedIn ? (
            <div>
              <Link to="/profile" className="hover:text-gold">Profile</Link>
              <button onClick={handleLogout} className="hover:text-gold">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-gold">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
