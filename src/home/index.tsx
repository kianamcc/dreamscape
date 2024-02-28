import { User } from "../App";

import LoginForm from "../login";

import "./styles.scss";

interface props {
  user: User;
  handleForm: () => void;
  showLoginForm: boolean;
  userHandler: (token: string) => void;
  form: "signup" | "login";
  toggleForm: () => void;
}

const Home = ({
  handleForm,
  showLoginForm,
  userHandler,
  user,
  form,
  toggleForm,
}: props) => {
  return (
    <section id="home" data-testid="home">
      <div className="home-container">
        <div className="text-container">
          <h1 className="home-title">
            Welcome to Dreamscape{user.username && `, ${user.username}`}
          </h1>
          <p className="home-subtitle">
            Explore the link between dreams and conscious reality through
            intuitive journaling.
          </p>
        </div>
        {!user.username && (
          <div className="home-get-started-button-container">
            <button className="home-get-started-button" onClick={handleForm}>
              Get started
            </button>
            <p>(It's free!)</p>
          </div>
        )}
      </div>
      {showLoginForm && (
        <LoginForm
          handleForm={handleForm}
          userHandler={userHandler}
          form={form}
          toggleForm={toggleForm}
        />
      )}
    </section>
  );
};

export default Home;
