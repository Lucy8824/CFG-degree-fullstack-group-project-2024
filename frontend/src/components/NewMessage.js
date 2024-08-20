import React, { useState } from "react";
import axios from "axios";

const NewMessage = ({ onCreate }) => {
  const [chatName, setChatName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [type, setType] = useState("private");

  const handleCreateChat = async () => {
    if (type === "group" && chatnName.trim() === "") {
      alert("Group conversations must have a name.");
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
    }
  };

  return (
    <div>
      <h2>Create a New Chat</h2>
      <div>
        <label>
          Chat Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="private">Private Chat</option>
            <option value="group">Group Chat</option>
          </select>
        </label>
      </div>

      {type === "group" && (
        <div>
          <label>
            Group Name:
            <input
              type="text"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              placeholder="Enter group name"
            />
          </label>
        </div>
      )}

      <div>
        <label>
          Add Participants (comma-separated user IDs):
          <input
            type="text"
            value={participants.join(",")}
            onChange={(e) => setParticipants(e.target.value.split(","))}
            placeholder="Enter user IDs"
          />
        </label>
      </div>

      <button onClick={handleCreateChat}>Create Chat</button>
    </div>
  );
};

export default NewMessage;
