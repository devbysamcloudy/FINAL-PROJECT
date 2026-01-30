import EmailManager from "../tasks/EmailManager";
import FileManager from "../tasks/FileManager";
import SystemStatus from "../tasks/SystemStatus";

// This file EXECUTES tasks based on intent
// It is called by CommandAnalyzer after intent detection

// CHANGED: TaskRouter now accepts TWO arguments
// WHY: first is the intent type, second is the full command text
export default function TaskRouter(type, commandText) {

    // CHANGED: basic safety check
    // WHY: prevents crashes if AI returns unexpected data
    if (typeof commandText !== "string") {
        return "Invalid command";
    }

    const command = commandText.toLowerCase();

    // CHANGED: switch-based routing instead of keyword scanning
    // WHY: intent is already decided in CommandAnalyzer
    switch (type) {
        case "email":
            return EmailManager(command);

        case "file":
            return FileManager(command);

        case "status":
            return SystemStatus();

        default:
            // CHANGED: clearer fallback message
            return "Task not recognized";
    }
}
