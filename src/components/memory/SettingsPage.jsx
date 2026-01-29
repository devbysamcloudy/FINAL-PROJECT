import React, { useState } from "react";

// settings page
function SettingsPage() {
  const [name, setName] = useState("User");
  const [voiceOn, setVoiceOn] = useState(true);
  const [notificationsOn, setNotificationsOn] = useState(true);

  function saveSettings() {
    let data = {
      name: name,
      voice: voiceOn,
      notifications: notificationsOn,
    };
    localStorage.setItem("jarvisSettings", JSON.stringify(data));
    alert("Saved!");
  }

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      <div className="settings-form">
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={function (e) {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="form-divider"></div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={voiceOn}
            onChange={function (e) {
              setVoiceOn(e.target.checked);
            }}
            id="voice-toggle"
          />
          <label className="checkbox-label" htmlFor="voice-toggle">
            Voice enabled
          </label>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={notificationsOn}
            onChange={function (e) {
              setNotificationsOn(e.target.checked);
            }}
            id="notifications-toggle"
          />
          <label
            className="checkbox-label"
            htmlFor="notifications-toggle"
          >
            Notifications enabled
          </label>
        </div>

        <button className="save-button" onClick={saveSettings}>
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;


