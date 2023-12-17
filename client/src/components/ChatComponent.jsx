import React, { useState } from "react";

function ChatComponent() {
  const [userInput, setUserInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });
  
      if (!response.ok) {
        console.log(response) // log response, this error below keeps throwing
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setChatResponse(data.reply); // Update the chat response state with the received reply
    } catch (error) {
      console.error("Error fetching response:", error);
      console.log(userInput);
    }
  };
  

  return (
    <div>
      <div className="robot">
        <div className="head">
          <div className="response-bubble">{chatResponse}</div>
        </div>
        <div className="arms">
          <div className="left-arm"></div>
          <div className="right-arm"></div>
        </div>
        <div className="body"></div>
        <div className="legs">
          <div className="left-leg"></div>
          <div className="right-leg"></div>
        </div>
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message here..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatComponent;
