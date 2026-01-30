import { useState } from "react";

// ==========================
// OpenRouter configuration
// ==========================
const OPENAI_API_KEY = "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";
const BASE_URL = "https://openrouter.ai/api/v1";
const MODEL = "gpt-4o-mini";
const MAX_TOKENS = 2048;

// ==========================
// Chat component
// ==========================
function ChatWindow({ active }) {
  const [msgs, setMsgs] = useState([
    { id: 1, who: "jarvis", txt: "Hello! How can I help?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!active) {
      // ACTIVE check: JARVIS deactivated
      setMsgs((prev) => [
        ...prev,
        { id: Date.now(), who: "jarvis", txt: "JARVIS is currently deactivated." },
      ]);
      setUserInput("");
      return;
    }

    if (userInput.trim() === "" || sending) return;

    const userMsg = { id: Date.now(), who: "user", txt: userInput };
    setMsgs((prev) => [...prev, userMsg]);

    const currentInput = userInput;
    setUserInput("");
    setSending(true);

    try {
      const aiReply = await askOpenRouterAI(currentInput);

      const jarvisMsg = {
        id: Date.now(),
        who: "jarvis",
        txt: aiReply,
      };

      setMsgs((prev) => [...prev, jarvisMsg]);
    } catch (err) {
      console.error("AI error:", err);
      setMsgs((prev) => [
        ...prev,
        { id: Date.now(), who: "jarvis", txt: "Sorry, something went wrong." },
      ]);
    } finally {
      setSending(false);
    }
  }

  async function askOpenRouterAI(question) {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "JARVIS Frontend Project",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: question }],
        max_tokens: MAX_TOKENS,
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response from AI.";
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2 className="chat-title">Chat with JARVIS</h2>
      </div>

      <div className="messages-container">
        {msgs.map((m) => (
          <div
            key={m.id}
            className={`message ${m.who === "jarvis" ? "jarvis-message" : "user-message"}`}
          >
            <div className="message-content">
              <span className="sender">{m.who === "jarvis" ? "JARVIS" : "You"}:</span>{" "}
              {m.txt}
            </div>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          className="chat-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={active ? "Type something..." : "JARVIS is deactivated"}
          disabled={!active || sending} // prevent typing if deactivated
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={!active || sending} // prevent click if deactivated
        >
          {sending ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;

