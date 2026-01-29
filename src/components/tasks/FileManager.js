export default async function FileManager(command) {
    command = command.toLowerCase();

    if (command.includes("list")) {
        // Simulate listing files
        return ["file1.txt", "file2.docx", "image.png"];
    }

    if (command.includes("delete")) {
        return "File deleted successfully (simulated).";
    }

    return "FileManager: Command not recognized.";
}