import { useState } from "react";
import "./styles.scss";

interface props {
  handleForm: () => void;
  userHandler: (token: string) => void;
}

const LoginForm = ({ handleForm, userHandler }: props) => {
  const [form, setForm] = useState<"login" | "signup">("signup");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [identifier, setIdentifier] = useState<string>("");
  const [error, setError] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = form === "signup" ? "api/register" : "api/login";
    console.log(endpoint);

    if (form === "signup" && (!username || !email || !password)) {
      setError("All fields are required for registeration.");
      return;
    }

    if (form === "signup") {
      await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then(async (response) => {
          if (!response.ok) {
            setError("User already exists!");
            throw new Error(`Error! Status: ${response.status}`);
          }
          setError("");
          const data = await response.json();
          console.log(data);
          localStorage.setItem("jwtToken", data?.jwtToken);
          userHandler(data.jwtToken || "");
          // handleLogin({ username });
        })
        .catch((error) => console.error("Error:", error));
    } else if (form === "login") {
      await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      })
        .then(async (response) => {
          if (!response.ok) {
            setError("User already exists!");
            throw new Error(`Error! Status: ${response.status}`);
          }
          setError("");
          const data = await response.json();
          console.log(data);
          localStorage.setItem("jwtToken", data?.jwtToken);
          userHandler(data.jwtToken || "");
        })
        .catch((error) => console.error("Error:", error));
    }

    handleForm();
  };

  return (
    <form className="login-form" id="login-form" onSubmit={handleFormSubmit}>
      <div className="close-button-container">
        <button className="close-form" onClick={handleForm}>
          Close
        </button>
      </div>

      <div className="login-form-container">
        <h3>{form === "signup" ? "Signup" : "Login"}</h3>
        {error && <p>{error}</p>}
        <div className="form-inputs">
          {form === "signup" && (
            <>
              <input
                className="login-form-input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="login-form-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}
          {form === "login" && (
            <input
              className="login-form-input"
              placeholder="Username or Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          )}

          <input
            className="login-form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" type="submit">
          {form === "signup" ? "Sign up!" : "Login"}
        </button>
        {form === "signup" ? (
          <p>
            Already have an account?{" "}
            <a href="#" onClick={() => setForm("login")}>
              Login here!
            </a>
          </p>
        ) : (
          <p>
            Don't have an account yet?{" "}
            <a href="#" onClick={() => setForm("signup")}>
              Signup here!
            </a>
          </p>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
