import React, { useState } from "react";

// voice stuff for jarvis
function VoiceFeedback() {
  const [userInformation, setUserInformation] = useState("");
  const [listening, setListening] = useState(false);

  function startVoice() {
    // check if browser supports this
    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesnt support voice");
      return;
    }

    let recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = function (e) {
      setUserInformation(e.results[0][0].transcript);
    };
    recognition.onend = function () {
      setListening(false);
    };

    recognition.start();
    setListening(true);
  }

  function makeJarvisTalk(text) {
    let speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  }

  return (
    <div className="voice-container">
      <h2 className="voice-title">Voice</h2>

      <div className="voice-controls">
        <button
          className={`voice-button primary-button ${
            listening ? "listening" : ""
          }`}
          onClick={startVoice}
          disabled={listening}
        >
          {listening ? "Listening..." : "Talk to JARVIS"}
        </button>

        <button
          className="voice-button secondary-button"
          onClick={function () {
            makeJarvisTalk("Hello, I am JARVIS");
          }}
        >
          Test Voice
        </button>
      </div>

      {userInformation !== "" && (
        <div className="voice-output">
          <p className="output-text">You said: {userInformation}</p>
        </div>
      )}
    </div>
  );
}

export default VoiceFeedback;
