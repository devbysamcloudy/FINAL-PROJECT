import { useState, useEffect } from "react";

import ChatWindow from "./components/communication/ChatWindow";
import VoiceFeedback from "./components/communication/VoiceFeedback";
import Notifications from "./components/communication/Notifications";

import Home from "./components/memory/Home.jsx";
import History from "./components/memory/History.jsx";
import SettingsPage from "./components/memory/SettingsPage.jsx";
import Tasks from "./components/core/TaskRouter.jsx";
import Heartbeat from "./components/core/Heartbeat.jsx";

import "./components/styles/variables.css";
import "./components/styles/animations.css";
import "./components/styles/App.css";
import "./components/styles/jarvis.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // CHANGED: this state now acts as a master ON/OFF switch for the assistant
  const [active, setActive] = useState(false);

  function renderPage() {
    if (currentPage === "home") {
      return <Home />;
    } else if (currentPage === "history") {
      return <History />;
    } else if (currentPage === "settings") {
      return <SettingsPage />;
    } else if (currentPage === "chat") {
      // CHANGED: pass active state to ChatWindow
      return <ChatWindow active={active} />;
    } else if (currentPage === "voice") {
      // CHANGED: pass active state to VoiceFeedback
      return <VoiceFeedback active={active} />;
    } else if (currentPage === "notifications") {
      return <Notifications />;
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">JARVIS Assistant</h1>
      </header>

      <nav className="app-nav">
        <button className="nav-button" onClick={() => setCurrentPage("home")}>Home</button>
        <button className="nav-button" onClick={() => setCurrentPage("chat")}>Chat</button>
        <button className="nav-button" onClick={() => setCurrentPage("voice")}>Voice</button>
        <button className="nav-button" onClick={() => setCurrentPage("notifications")}>Notifications</button>
        <button className="nav-button" onClick={() => setCurrentPage("history")}>History</button>
        <button className="nav-button" onClick={() => setCurrentPage("settings")}>Settings</button>

        {/* CHANGED: Master ON/OFF button */}
        <button
          className={`rotating-button ${active ? "active" : ""}`}
          onClick={() => setActive(!active)}
          style={{ marginLeft: "25px", position: "relative", marginRight: "20px" }}
        >
          {active ? "ACTIVE" : "DEACTIVE"}
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
        </button>

        <div className="heartbeat-container">
          <div className="heartbeat">
            <div className="ecg-line"></div>
          </div>
        </div>
      </nav>

      <Tasks />
      <Heartbeat />

      <hr className="divider" />

      <div>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
