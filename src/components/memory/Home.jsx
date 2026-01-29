import React from "react";

function Home() {
  //  greeting based on time
  let hour = new Date().getHours();
  let greeting = "Good Evening";
  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="page-container">
      <h1 className="home-greeting">{greeting}!</h1>
      <p className="home-welcome">Welcome to JARVIS</p>

      <section className="home-section">
        <h2 className="section-title">Quick Stats</h2>
        <ul className="stats-grid">
          <li className="stat-item">Emails: 5</li>
          <li className="stat-item">Tasks: 3</li>
          <li className="stat-item">Reminders: 2</li>
        </ul>
      </section>

      <section className="home-section">
        <h2 className="section-title">What I can do for you</h2>
        <ul className="capabilities">
          <li className="capability-item">Check emails</li>
          <li className="capability-item">Organize files</li>
          <li className="capability-item">Set reminders</li>
          <li className="capability-item">Show system info</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;