import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

function Chatbot() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
  
    const userMessage = { role: "user", content: input };
  
    // Add the user message to the messages state
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);
  
    try {
      // Send the request to OpenAI API
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini-2024-07-18", // The model you're using
          messages: [...messages, userMessage], // The conversation history
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your API key
          },
        }
      );

      // Parse and add the response from the assistant
      const botMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content.trim(),
      };
  
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error communicating with OpenAI API:", error.response || error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      setIsFullScreen(true); // Expand to full page on submit
    }
  };

  // Function to minimize the chatbox
  const handleMinimize = () => {
    setIsFullScreen(false);
  };

  return (
    <div className={`chatbot ${isFullScreen ? "fullscreen" : "minimized"}`}>
      <div className="chatbox">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.role === "user" ? "user" : "bot"}`}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && <div className="message bot">Thinking...</div>}
        </div>

        {/* If the chat is full-screen, show the minimize button */}
        {isFullScreen && (
          <button className="minimize-button" onClick={handleMinimize}>
            CLOSE
          </button>
        )}

        <form className="input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message ChatGPT"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Go"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
