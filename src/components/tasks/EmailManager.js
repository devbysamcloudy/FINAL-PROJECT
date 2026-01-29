export default async function EmailManager(command) {
    command = command.toLowerCase();

    if (command.includes("check")) {
        // Simulate checking for new emails
        return [
            { subject: "Test Email 1", from: "friend@example.com", date: "2026-01-29" },
            { subject: "Test Email 2", from: "boss@example.com", date: "2026-01-28" },
        ];
    }

    if (command.includes("organize")) {
        return "All emails marked as read (simulated).";
    }

    return "EmailManager: Command not recognized.";
}