function VoiceFeedback({ active }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  function startVoice() {
    // CHANGED: Block voice if assistant is deactivated
    if (!active) {
      console.log("JARVIS is deactivated. Voice disabled.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser does not support voice.");

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.start();
  }

  // CHANGED: stop recognition automatically if deactivated
  useEffect(() => {
    if (!active && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  }, [active]);

  return (
    <div>
      <button onClick={listening ? () => recognitionRef.current.stop() : startVoice}>
        {listening ? "Stop Listening" : "Talk to JARVIS"}
      </button>
    </div>
  );
}

export default VoiceFeedback;