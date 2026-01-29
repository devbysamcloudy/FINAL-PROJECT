import { useState } from "react";
import  TaskRouter from "./TaskRouter.jsx";

function AssistantCore({onUpdate}) {
    const [status, setStatus] = useState("idle");
    async function handleCommand(commandText) {
        setStatus("processing");
        let response;
        response = TaskRouter(commandText);
        if(!response) {
            response = await fetch(commandText);
        }

        setStatus("idle");
        onUpdate({
            command: commandText,
            response,
            status: "Completed"
        });
    }

    async function fetchAiResponse(command) {
        const response = await fetch("https://api.openai.com/v1/chat/completions");
        return `AI processed response: "${command}"`;
    }
    return {
        handleCommand,
        status
    };
    }

export default AssistantCore;

