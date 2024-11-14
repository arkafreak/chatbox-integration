import React from "react";
import Chatbot from "../components/Chatbot/Chatbot";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <h1>Home Page</h1>
      <h2>Hey there this is the home page and there is nothing in  here for now</h2>
      <h3>Type any prompt inside the chatbox to get into fullscreen chatbot mode</h3>
      <Chatbot />
    </div>
  );
}

export default HomePage;
