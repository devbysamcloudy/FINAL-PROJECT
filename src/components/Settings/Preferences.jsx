import React from 'react';
import { useAssistant } from '../Context/AssistantContent.jsx';

const Preferences = () => {
    const [voiceEnabled, setVoiceEnabled] = useAssistant();

   
  return (
    <div>
        <h1>Preferences</h1>
        <label>
            Voice Enabled:
            <input
                type="checkbox"
                checked={voiceEnabled}
                onChange={() => setVoiceEnabled(!voiceEnabled) }
            />
            Enable or disable voice assistance
        </label>    
    
    </div>
  )
}
export default Preferences;