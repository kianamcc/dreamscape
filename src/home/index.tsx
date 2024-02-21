// import { useEffect, useState } from "react";

import LoginForm from "../login";

import "./styles.scss";

// interface User {
//   username?: string;
//   identifier?: string;
// }

interface props {
  handleForm: () => void;
  // handleLogin: (user: User) => void;
  showLoginForm: boolean;
  userHandler: (token: string) => void;
}

const Home = ({
  handleForm,
  showLoginForm,
  // handleLogin,
  userHandler,
}: props) => {
  return (
    <section id="home">
      <div className="home-container">
        <h1 className="home-title">Welcome to Dreamscape</h1>
        <p className="home-subtitle">
          Explore the link between dreams and conscious reality through
          intuitive journaling.
        </p>
        <div className="home-get-started-button-container">
          <button className="home-get-started-button" onClick={handleForm}>
            Get started
          </button>
          <p>(It's free!)</p>
        </div>
      </div>
      {showLoginForm && (
        <LoginForm
          handleForm={handleForm}
          // handleLogin={handleLogin}
          userHandler={userHandler}
        />
      )}
    </section>
  );
};

export default Home;
