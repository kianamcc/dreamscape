import Navigation from "./navigation";
import Home from "./home";
import About from "./about";
import Dreams from "./dreams";

import dreamData from "./dreamData";

import "./App.css";

function App() {
  return (
    <>
      <Navigation />
      <Home />
      <About />
      <Dreams dreamData={dreamData} />
    </>
  );
}

export default App;
