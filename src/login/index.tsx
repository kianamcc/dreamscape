import { useState } from "react";
import "./styles.scss";

interface Props {
  handleForm: () => void;
  userHandler: (token: string) => void;
  form: "signup" | "login";
  toggleForm: () => void;
}

const LoginForm = ({ handleForm, userHandler, form, toggleForm }: Props) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [identifier, setIdentifier] = useState<string>("");
  const [error, setError] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = form === "signup" ? "api/register" : "api/login";

    if (form === "signup" && (!username || !email || !password)) {
      setError("All fields are required for registration.");
      return;
    }

    const formData =
      form === "signup"
        ? { username, email, password }
        : { identifier, password };

    await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (response.status === 409) {
          setError("User already exists!");
          throw new Error(`Error! Status: ${response.status}`);
        }
        if (!response.ok) {
          setError("An error occurred.");
          throw new Error(`Error! Status: ${response.status}`);
        }
        setError("");
        const data = await response.json();
        localStorage.setItem("jwtToken", data?.jwtToken);
        userHandler(data.jwtToken || "");
        handleForm();
      })
      .catch((error) => console.log("Error: ", error));
  };

  const clearFields = () => {
    setEmail("");
    setUsername("");
    setPassword("");
  };

  return (
    <>
      {form === "signup" && (
        <form
          className="login-form"
          id="login-form"
          data-testid="signup-form"
          onSubmit={handleFormSubmit}
        >
          <button className="close-form-button" onClick={handleForm}>
            Close
          </button>
          <div className="login-form-container">
            <h3>Signup</h3>
            {error && <p className="error-text">{error}</p>}
            <div className="form-inputs">
              <input
                className="login-form-input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                className="login-form-input"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="login-form-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="login-button" type="submit">
              Sign up
            </button>
            <p>
              Already have an account?{" "}
              <a
                href="#"
                onClick={() => {
                  toggleForm();
                  setError("");
                  clearFields();
                }}
                className="form-toggle-link"
              >
                Login here!
              </a>
            </p>
          </div>
        </form>
      )}
      {form === "login" && (
        <form
          className="login-form"
          id="login-form"
          data-testid="login-form"
          onSubmit={handleFormSubmit}
        >
          <button className="close-form-button" onClick={handleForm}>
            Close
          </button>
          <div className="login-form-container">
            <h3>Login</h3>
            {error && <p className="error-text">{error}</p>}
            <div className="form-inputs">
              <input
                className="login-form-input"
                placeholder="Username or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
              <input
                className="login-form-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            <p>
              Don't have an account yet?{" "}
              <a
                href="#"
                onClick={() => {
                  toggleForm();
                  setError("");
                  clearFields();
                }}
                className="form-toggle-link"
              >
                Signup here!
              </a>
            </p>
          </div>
        </form>
      )}
    </>
  );
};

export default LoginForm;
