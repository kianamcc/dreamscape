import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import Navigation from "./navigation";
import Home from "./home";
import About from "./about";
import Benefits from "./benefits";
import Dreams, { DreamObject } from "./dreams";
import { FormData } from "./dreams";

export interface User {
  username?: string;
  identifier?: string;
}

function App() {
  const [error, setError] = useState(false);
  const [allDreams, setAllDreams] = useState<DreamObject[]>([]);
  const [filteredDreams, setFilteredDreams] = useState<DreamObject[]>([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    getDreams();
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedUser = jwtDecode(token) as User;
      setUser(decodedUser);
      console.log("token exists");
    }
  }, []);

  const handleDreamFiltering = (filteredDreams: DreamObject[]) => {
    setFilteredDreams(filteredDreams);
  };

  const handleForm = () => {
    setShowLoginForm((prev) => !prev);
  };

  // const handleLogin = (user: User) => {
  //   setUser(user);
  // };

  const getDreams = () => {
    console.log("getting/updating dreams...");
    fetch("api/dreams")
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

  const userHandler = (token: string) => {
    const decodedUser = jwtDecode(token) as User;
    setUser(decodedUser);
  };

  return (
    <>
      <Navigation
        user={user}
        handleForm={handleForm}
        signOut={signOut}
        userHandler={userHandler}
      />
      <Home
        handleForm={handleForm}
        showLoginForm={showLoginForm}
        userHandler={userHandler}
      />
      <About />
      <Benefits />
      {allDreams && (
        <Dreams
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
  );
}

export default App;
