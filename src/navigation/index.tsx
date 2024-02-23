import { User } from "../App";
import { useState } from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";

import LoginForm from "../login";

interface props {
  user: User;
  handleForm: () => void;
  showLoginForm: boolean;
  signOut: () => void;
  userHandler: (token: string) => void;
  form: "signup" | "login";
  toggleForm: () => void;
}

const Navigation = ({
  user,
  signOut,
  userHandler,
  handleForm,
  showLoginForm,
  form,
  toggleForm,
}: props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    if (user.username) {
      setShowDropdown((prev) => !prev);
    } else {
      handleForm();
    }
  };

  return (
    <section id="nav">
      <nav>
        <ul>
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {JSON.stringify(user) !== "{}" && (
            <li>
              <Link className="nav-link" to="/dreams">
                Dreams
              </Link>
            </li>
          )}
          <li className="user-li nav-link">
            <div className="user-nav">
              <button className="user-button" onClick={handleClick}>
                {user.username ? user.username : "Login or Sign up"}
              </button>
              {showDropdown && user && (
                <ul className="user-dropdown">
                  <li className="user-dropdown-links">
                    <>
                      <FontAwesomeIcon icon={faUser} />
                      <Link to="/" className="profile-link">
                        {" "}
                        My Profile
                      </Link>
                    </>
                  </li>
                  <li
                    className="user-dropdown-links signout-link"
                    onClick={() => {
                      signOut();
                      setShowDropdown(false);
                    }}
                  >
                    <>
                      <FontAwesomeIcon icon={faRightFromBracket} />
                      Sign out
                    </>
                  </li>
                </ul>
              )}
            </div>
            <>
              {showLoginForm && !user.identifier && !user.username && (
                <LoginForm
                  handleForm={handleClick}
                  userHandler={userHandler}
                  form={form}
                  toggleForm={toggleForm}
                />
              )}
            </>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Navigation;
