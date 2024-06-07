import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";

import { CiUser } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  let userlogedIn;
  if (user) {
    const word = user.username;
    const firstLetter = word.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = word.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;
    userlogedIn = capitalizedWord;
  }

  const gotToNewPage = () => {
    navigate("/login");
  };
  const Logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Swift Stay</span>
        </Link>

        {user ? (
          <div className="username">
            <Dropdown
              title={userlogedIn}
              icon={<CiUser />}
              style={{ backgroundColor: "blue" }}
            >
              <Dropdown.Item icon={<CgProfile />}>User Profile</Dropdown.Item>
              <Dropdown.Item icon={<MdDashboard />}>Dashboard</Dropdown.Item>
              <Dropdown.Item icon={<MdLogout />} onClick={() => Logout()}>
                Logout
              </Dropdown.Item>
            </Dropdown>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton" onClick={() => gotToNewPage()}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
