import { User } from "../App";
import { useState } from "react";

import "./styles.scss";

import LoginForm from "../login";

interface props {
  user: User;
  handleForm: () => void;
  signOut: () => void;
  // handleLogin: (user: User) => void;
  userHandler: (token: string) => void;
}

const Navigation = ({ user, signOut, userHandler }: props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleClick = () => {
    if (user.identifier || user.username) {
      setShowDropdown((prev) => !prev);
    } else {
      setShowLoginForm((prev) => !prev);
    }
  };

  console.log(
    "user",
    user,
    "test",
    user ? user.identifier : "Login or Sign up"
  );

  return (
    <section>
      <nav>
        <ul className="test">
          <li>Home</li>
          <li>About</li>
          <li className="user-li">
            <div className="user-nav">
              <button className="user-button" onClick={handleClick}>
                {user.username
                  ? user.username
                  : user.identifier
                  ? user.identifier
                  : "Login or Sign up"}
              </button>
              {showDropdown && user && (
                <ul className="user-dropdown">
                  <li>Profile</li>
                  <li
                    onClick={() => {
                      signOut();
                      setShowDropdown(false);
                    }}
                  >
                    Sign out
                  </li>
                </ul>
              )}
            </div>
            <>
              {showLoginForm && !user.identifier && !user.username && (
                <LoginForm
                  handleForm={handleClick}
                  // handleLogin={handleLogin}
                  userHandler={userHandler}
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
