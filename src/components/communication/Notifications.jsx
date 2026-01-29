import React, { useState } from "react";

// shows notifications to user
function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, msg: "Welcome to JARVIS!", isRead: false },
  ]);

  function addNotification() {
    let newOne = {
      id: notifications.length + 1,
      msg: "New alert at " + new Date().toLocaleTimeString(),
      isRead: false,
    };
    setNotifications([...notifications, newOne]);
  }

  function markRead(id) {
    let updated = notifications.map(function (n) {
      if (n.id === id) {
        return { ...n, isRead: true };
      }
      return n;
    });
    setNotifications(updated);
  }

  function removeNotification(id) {
    let filtered = notifications.filter(function (n) {
      return n.id !== id;
    });
    setNotifications(filtered);
  }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2 className="notifications-title">Notifications</h2>

        <div className="notification-controls">
          <button className="add-button" onClick={addNotification}>
            Add Test
          </button>
          <button
            className="clear-button"
            onClick={function () {
              setNotifications([]);
            }}
          >
            Clear All
          </button>
        </div>
      </div>

      {notifications.length === 0 && (
        <p className="empty-state">No notifications</p>
      )}

      <div className="notifications-list">
        {notifications.map(function (n) {
          return (
            <div
              key={n.id}
              className={`notification ${
                !n.isRead ? "notification-unread" : ""
              }`}
            >
              <div className="notification-content">
                <p className="notification-message">
                  {n.msg}
                  {n.isRead === false && (
                    <span className="badge">new</span>
                  )}
                </p>
              </div>
              <div className="notification-actions">
                <button
                  className="action-button read-button"
                  onClick={function () {
                    markRead(n.id);
                  }}
                >
                  Read
                </button>
                <button
                  className="action-button delete-button"
                  onClick={function () {
                    removeNotification(n.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Notifications;