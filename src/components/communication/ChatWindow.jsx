import React, { useState } from "react";

// chat component for talking to jarvis
function ChatWindow() {
  const [msgs, setMsgs] = useState([
    { id: 1, who: "jarvis", txt: "Hello! How can I help?" },
  ]);
  const [userInput, setUserInput] = useState("");

  function handleSend() {
    if (userInput === "") return;

    //what user typed
    let newMsg = { id: msgs.length + 1, who: "user", txt: userInput };
    setMsgs([...msgs, newMsg]);

    // clear input box
    setUserInput("");

    // jarvis replies
    setTimeout(function () {
      let reply = {
        id: msgs.length + 2,
        who: "jarvis",
        txt: "Got it: " + userInput,
      };
      setMsgs(function (prev) {
        return [...prev, reply];
      });
    }, 500);
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2 className="chat-title">Chat with JARVIS</h2>
      </div>

      <div className="messages-container">
        {msgs.map(function (m) {
          return (
            <div
              key={m.id}
              className={`message ${
                m.who === "jarvis" ? "jarvis-message" : "user-message"
              }`}
            >
              <div className="message-content">
                <span className="sender">
                  {m.who === "jarvis" ? "JARVIS" : "You"}:
                </span>
                {m.txt}
              </div>
            </div>
          );
        })}
      </div>

      <div className="input-container">
        <input
          type="text"
          className="chat-input"
          value={userInput}
          onChange={function (e) {
            setUserInput(e.target.value);
          }}
          placeholder="Type something..."
        />
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;