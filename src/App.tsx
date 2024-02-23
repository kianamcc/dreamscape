import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./navigation";
import Home from "./home";
import About from "./about";
import Benefits from "./benefits";
import Footer from "./footer";
import Dreams, { DreamObject } from "./dreams";
import { FormData } from "./dreams";

export interface User {
  username?: string;
  identifier?: string;
  userId?: string;
}

function App() {
  const [error, setError] = useState(false);
  const [allDreams, setAllDreams] = useState<DreamObject[]>([]);
  const [filteredDreams, setFilteredDreams] = useState<DreamObject[]>([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState<User>({});
  const [form, setForm] = useState<"signup" | "login">("signup");

  /* UseEffects */
  useEffect(() => {
    getDreams();
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedUser = jwtDecode(token) as User;
      setUser(decodedUser);
      console.log("token exists");
    }
  }, []);

  useEffect(() => {
    getDreams();
  }, [user]);

  /* Functions */
  const handleDreamFiltering = (filteredDreams: DreamObject[]) => {
    setFilteredDreams(filteredDreams);
  };

  const toggleForm = () => {
    setForm(form === "signup" ? "login" : "signup");
  };

  const userHandler = (token: string) => {
    const decodedUser = jwtDecode(token) as User;
    setUser(decodedUser);
  };

  const getDreams = () => {
    console.log("getting/updating dreams...");
    JSON.stringify(user) !== "{}" &&
      fetch(`api/dreams?userId=${user.userId}`)
        .then((res) => res.json())
        .then((data) => {
          setFilteredDreams(data);
          setAllDreams(data);
          console.log("getDreams", filteredDreams);
        })
        .catch((error) => console.log("An error has occured: ", error));
  };

  const addDream = (
    e: React.MouseEvent<HTMLButtonElement>,
    formData: FormData
  ) => {
    e.preventDefault();

    if (!formData.title) {
      setError(true);
    } else {
      setError(false);
      fetch("api/addDream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((newDream) => {
          setAllDreams((prevDreams) => [...prevDreams, newDream]);
        })
        .catch((error) => console.log("Error adding dream...: ", error));
    }
  };

  const deleteDream = (e: React.MouseEvent<HTMLButtonElement>, _id: string) => {
    e.preventDefault();
    console.log("deleteDream: id: ", _id);
    fetch("api/deleteDream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: _id }),
    })
      .then(() => getDreams())
      .catch((error) => console.log("Unable to delete dream...: ", error));
  };

  const updateDream = (
    e: React.MouseEvent<HTMLButtonElement>,
    formData: DreamObject
  ) => {
    e.preventDefault();
    console.log("saving", formData);
    fetch("api/updateDream", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedDream: DreamObject) => {
        console.log("Successfully added the following: ", updatedDream);
        setAllDreams((prevDreams) => {
          return prevDreams.map((dream) =>
            dream._id === updatedDream._id ? updatedDream : dream
          );
        });
      })
      .catch((error) => console.log("Error updating dream...: ", error));
  };

  const signOut = () => {
    fetch("api/signout", { method: "POST" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("There was an error signing out.");
        }
        localStorage.removeItem("jwtToken");
        setUser({});
        return response.json();
      })
      .catch((error) => console.log("Error: ", error));
  };

  return (
    <BrowserRouter>
      <Navigation
        user={user}
        handleForm={() => setShowLoginForm(!showLoginForm)}
        signOut={signOut}
        userHandler={userHandler}
        showLoginForm={showLoginForm}
        form={form}
        toggleForm={toggleForm}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home
                user={user}
                handleForm={() => setShowLoginForm(!showLoginForm)}
                showLoginForm={showLoginForm}
                userHandler={userHandler}
                form={form}
                toggleForm={toggleForm}
              />
              <About />
              <Benefits />
            </>
          }
        />
        <Route
          path="/dreams"
          element={
            <>
              {JSON.stringify(user) !== "{}" && (
                <Dreams
                  user={user}
                  error={error}
                  filteredDreams={filteredDreams}
                  allDreams={allDreams}
                  addDream={addDream}
                  deleteDream={deleteDream}
                  updateDream={updateDream}
                  handleDreamFiltering={handleDreamFiltering}
                />
              )}
            </>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
