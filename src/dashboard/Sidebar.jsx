import React from "react";
import { FaRegEdit, FaEye } from "react-icons/fa";
import useAuthStore from '../store/Auth-Store';
import { useNavigate } from 'react-router-dom';
import { BiLogOutCircle } from "react-icons/bi";

const Sidebar = ({ handleButtonClick }) => {


  const navigate = useNavigate()
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout(); // Call the logout function from Zustand
    navigate('/Login'); // Redirect to Login page after logout
  };
  return (
    <div>
     
      <div className="side_nav">
        <button onClick={() => handleButtonClick("createPost")}>
          <FaRegEdit /> Create Post
        </button>
        <br />
        <br />
        <button onClick={() => handleButtonClick("viewPosts")}>
          <FaEye /> View Post
        </button> 
        <br /> 
        <br />
      <button onClick={() => handleLogout()}>
      <BiLogOutCircle />  Logout   
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
