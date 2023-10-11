import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../Assets/img/logo300.png";
import Navbar from "react-bootstrap/Navbar";
import { UserContext } from "../../../context/UserContext";

const Header = () => {
  const { userToken, logOut } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-custom navbar-dark bg-dark">
      <div className="container mx-auto">
        <Link className="navbar-brand" to="/">
          <img src={Logo} width="54" alt="" />
        </Link>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <ul className="navbar-nav ms-auto">
            {userToken === null ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="auth/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="auth/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="nav-link"
                  to="auth/login"
                  onClick={() => {
                    logOut();
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
