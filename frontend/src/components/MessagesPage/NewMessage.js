import React, { useState } from "react";
import axios from "axios";
import './NewMessage.css';

const NewMessage = ({ onCreate }) => {
  const [chatName, setChatName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [type, setType] = useState("private");

  const handleParticipantsChange = (e) => {
    const input = e.target.value;
    const ids = input
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "");
    setParticipants(ids);
  };

  const handleCreateChat = async () => {
    if (type === "group" && chatName.trim() === "") {
      alert("Group conversations must have a name.");
      return;
    }
    if (participants.length === 0) {
      alert("Please add at least one participant.");
      return;
    }

    try {
      const response = await axios.post("/api/conversations", {
        name: chatName,
        type,
        participants,
      });
      onCreate(response.data.conversation_id);
    } catch (error) {
      console.error("Error creating conversation:", error);
      alert("Failed to create conversation. Please try again later.");
    }
  };

  return (
    <div className="new-message-container">
      <h2 className="new-message-title">Create a New Chat</h2>
      <div className="form-group">
        <label>
          Chat Type:
          <select value={type} onChange={(e) => setType(e.target.value)} className="form-select">
            <option value="private">Private Chat</option>
            <option value="group">Group Chat</option>
          </select>
        </label>
      </div>

      {type === "group" && (
        <div className="form-group">
          <label>
            Group Name:
            <input
              type="text"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              placeholder="Enter group name"
              className="form-input"
            />
          </label>
        </div>
      )}

      <div className="form-group"> 
        <label>
          Add Participants (comma-separated user IDs):
          <input
            type="text"
            value={participants.join(",")}
            onChange={handleParticipantsChange}
            placeholder="Enter user IDs"
            className="form-input"
          />
        </label>
      </div>

      <button onClick={handleCreateChat} className="create-chat-button">Create Chat</button>
    </div>
  );
};

export default NewMessage;
