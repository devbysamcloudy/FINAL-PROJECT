import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function ChatWindow() {
  // State for storing chat messages array
  const [msgs, setMsgs] = useState([]);
  
  // State for current input text
  const [input, setInput] = useState("");
  
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  
  // State for Ollama connection status
  const [ollamaStatus, setOllamaStatus] = useState("checking");
  
  // Ref for auto-scrolling to bottom of messages
  const messagesEndRef = useRef(null);

  // Effect to auto-scroll when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  // Effect to check Ollama connection on component mount
  useEffect(() => {
    const initializeOllama = async () => {
      try {
        const response = await axios.get("http://localhost:11434/api/tags", {
          timeout: 5000,
        });
        setOllamaStatus("running");
      } catch (error) {
        setOllamaStatus("stopped");
      }
    };
    
    initializeOllama();
  }, []);

  // Function to handle sending a message
  const handleSend = async () => {
    if (!input.trim()) return;

    // Create user message and add to messages array
    const userMsg = { role: "user", content: input };
    const updatedMsgs = [...msgs, userMsg];
    
    // Update UI state
    setMsgs(updatedMsgs);
    setInput("");
    setLoading(true);

    try {
      // Call Ollama generate API endpoint
      const response = await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: "gemma3:4b",
          prompt: input,
          stream: false,
          options: {
            temperature: 0.7,
            num_predict: 500,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 45000,
        }
      );

      // Create assistant message from response
      const aiMsg = {
        role: "assistant",
        content: response.data.response,
      };
      
      // Add assistant response to messages
      setMsgs((prev) => [...prev, aiMsg]);

    } catch (err) {
      // Handle different error types
      let errorMessage = `Error: ${err.message}`;
      
      if (err.message.includes("timeout")) {
        errorMessage = "The model is taking too long to respond. First requests can take up to 60 seconds. Please be patient or try a smaller prompt.";
      }
      
      const errorMsg = {
        role: "assistant",
        content: errorMessage,
      };
      setMsgs((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle Enter key press in textarea
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Function to clear chat history
  const clearChat = () => {
    setMsgs([]);
  };

  // Function to test Ollama connection
  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:11434/api/tags", {
        timeout: 5000,
      });
      alert(`Ollama is running. Available models: ${response.data.models.map(m => m.name).join(', ')}`);
      setOllamaStatus("running");
    } catch (error) {
      alert(`Ollama connection failed: ${error.message}`);
      setOllamaStatus("stopped");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Header section with title and status */}
      <div className="chat-header">
        <div className="chat-title-container">
          <h2 className="chat-title">AI Assistant</h2>
          <div className="status-indicator">
            <span className={`status-dot status-${ollamaStatus}`}></span>
            <span className="status-text">
              {ollamaStatus === "running" ? "Connected" : 
               ollamaStatus === "checking" ? "Connecting..." : 
               "Disconnected"}
            </span>
          </div>
        </div>
        
        {/* Control buttons */}
        <div className="chat-controls">
          <button 
            onClick={testConnection} 
            disabled={loading}
            className="nav-button"
          >
            Test Connection
          </button>
          <button 
            onClick={clearChat} 
            disabled={loading}
            className="nav-button"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Main messages display area */}
      <div className="messages-window">
        {/* Welcome message when chat is empty */}
        {msgs.length === 0 ? (
          <div className="welcome-message">
            <p className="welcome-title">Start a conversation</p>
            <p className="welcome-subtitle">
              Type a message below to begin chatting with Gemma 3 4B.
              First response may take a moment.
            </p>
          </div>
        ) : (
          /* Display all messages */
          msgs.map((msg, idx) => (
            <div key={idx} className={`message-bubble ${msg.role}`}>
              <div className="message-sender">
                {msg.role === "user" ? "You" : "AI Assistant"}
              </div>
              <div className="message-content">
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className="message-line">{line || <br />}</p>
                ))}
              </div>
            </div>
          ))
        )}
        {/* Invisible div for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area at the bottom */}
      <div className="input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            ollamaStatus !== "running" 
              ? "Waiting for Ollama connection..." 
              : "Type your message here... (Press Enter to send)"
          }
          disabled={loading || ollamaStatus !== "running"}
          rows={3}
          className="chat-textarea"
        />
        <div className="input-controls">
          <div className="input-hint">
            {loading ? "Processing your request..." : "Press Enter to send, Shift+Enter for new line"}
          </div>
          <button
            onClick={handleSend}
            disabled={loading || ollamaStatus !== "running" || !input.trim()}
            className={`send-button ${loading ? 'loading' : ''}`}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>

      {/* Footer with connection info */}
      <div className="chat-footer">
        <div className="model-info">
          <span className="model-label">Model:</span>
          <span className="model-name">gemma3:4b</span>
        </div>
        <div className="connection-info">
          <span className="connection-label">Endpoint:</span>
          <span className="connection-url">localhost:11434</span>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
// Note: Ensure you have axios installed via npm or yarn
// npm install axios
// or
// yarn add axios
