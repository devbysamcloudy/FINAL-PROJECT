import TaskRouter from "./TaskRouter";

// This file is responsible for UNDERSTANDING user intent
// It does NOT perform actions — it only decides WHAT the user wants

function CommandAnalyzer(text) {
  // CHANGED: normalize input to avoid case/spacing issues
  const command = text.trim().toLowerCase();

  // CHANGED: multiple keywords per intent
  // WHY: users don’t speak in exact words every time

  if (command.includes("email") || command.includes("mail")) {
    return TaskRouter("email", command);
  }

  if (command.includes("file") || command.includes("document")) {
    return TaskRouter("file", command);
  }

  if (
    command.includes("status") ||
    command.includes("progress") ||
    command.includes("report")
  ) {
    return TaskRouter("status", command);
  }

  if (
    command.includes("dashboard") ||
    command.includes("home") ||
    command.includes("overview")
  ) {
    return TaskRouter("dashboard", command);
  }

  // CHANGED: better fallback message
  // WHY: sounds more natural for voice + chat assistants
  return "I heard you, but I’m not sure what action you want me to take.";
}

export default CommandAnalyzer;
