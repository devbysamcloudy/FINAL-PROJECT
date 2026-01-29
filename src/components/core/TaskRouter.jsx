import EmailManager from "../tasks/EmailManager";
import FileManager from "../tasks/FileManager";
import SystemStatus from "../tasks/SystemStatus";

export default function TaskRouter(commandText) {
    if (typeof commandText !== "string") {
        return "Invalid command";
    }

    const command = commandText.toLowerCase();

    if (command.includes("email")) {
        return EmailManager(command);
    }

    if (command.includes("file")) {
        return FileManager(command);
    }

    if (command.includes("status")) {
        return SystemStatus();
    }

    return "Task not recognized";
}