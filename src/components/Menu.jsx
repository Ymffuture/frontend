import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaPen, FaBook, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa'; // Import icons

const Menu = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${URL}/api/auth/logout`, { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#0C1844] w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
      {!user && (
        <>
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer flex items-center">
            <FaSignInAlt className="mr-2" />
            <Link to="/login">Login</Link>
          </h3>
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer flex items-center">
            <FaUserPlus className="mr-2" />
            <Link to="/register">Register</Link>
          </h3>
        </>
      )}
      {user && (
        <>
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer flex items-center">
            <FaUser className="mr-2" />
            <Link to={`/profile/${user._id}`}>Profile ({user.username})</Link>
          </h3>
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer flex items-center">
            <FaPen className="mr-2" />
            <Link to="/write">Write</Link>
          </h3>
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer flex items-center">
            <FaBook className="mr-2" />
            <Link to={`/myblogs/${user._id}`}>Posts</Link>
          </h3>
          <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer flex items-center">
            <FaSignOutAlt className="mr-2" />
            Logout
          </h3>
        </>
      )}
    </div>
  );
};

export default Menu;
