import React, { useState } from "react";

// shows past commands
function History() {
  const [items, setItems] = useState([
    { id: 1, cmd: "Check emails", time: "10:30 AM" },
    { id: 2, cmd: "Set reminder", time: "9:45 AM" },
    { id: 3, cmd: "Organize files", time: "9:00 AM" },
  ]);

  function deleteOne(id) {
    let newList = items.filter(function (item) {
      return item.id !== id;
    });
    setItems(newList);
  }

  function clearAll() {
    setItems([]);
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h1 className="history-title">History</h1>

        <button className="clear-button" onClick={clearAll}>
          Clear All
        </button>
      </div>

      {items.length === 0 ? (
        <p className="empty-state">Nothing here yet</p>
      ) : (
        <ul className="history-list">
          {items.map(function (item) {
            return (
              <li key={item.id} className="history-item">
                <div className="item-content">
                  <span className="command">{item.cmd}</span>
                  <span className="time">{item.time}</span>
                </div>
                <button
                  className="delete-button"
                  onClick={function () {
                    deleteOne(item.id);
                  }}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default History;