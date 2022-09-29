import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import SidebarComponent from "./components/sidebar/SidebarComponent";
import ComponentContainer from "./components/componentContainer/ComponentContainer";
import MobileNav from "./components/mobileNav/MobileNav.jsx";
import AuthContext from "./context/AuthContext";
import "./App.css";
import { useState } from "react";

function App() {
  const { darken } = useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState(false);

  const className = showSidebar ? `sideBar display` : `sideBar`;
  return (
    <div className="app">
      <MobileNav setState={setShowSidebar} state={showSidebar} />
      <div className={className}>
        <SidebarComponent setState={setShowSidebar} state={showSidebar} />
      </div>
      <div className="routes">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:component" element={<ComponentContainer />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>

      {darken ? <div className="darken"></div> : null}
    </div>
  );
}

export default App;
