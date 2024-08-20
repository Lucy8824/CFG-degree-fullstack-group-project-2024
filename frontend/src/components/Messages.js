import React, { useState, useEffect } from "react";
import axios from "axios";

const Messages = ({ conversation_id }) => {
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [conversationDetails, setConversationDetails] = useState(null);

  useEffect(() => {
    const fetchConversationDetails = async () => {
      try {
        const response = await axios.get(
          `./api/conversations/${conversation_id}`
        );
        setConversationDetails(response.data);
      } catch (error) {
        console.error("Error fetching conversation details:", error);
      }
    };

    fetchConversationDetails();

    const fetchMessages = async () => {
      try {
        // await prevents data loading before it's ready, prevents errors
        const response = await axios.get(`/api/messages/${conversation_id}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messsages:", error);
      }
    };

    fetchMessages();

    const interval = setInterval(fetchMessages, 5000); // polling
    return () => clearInterval(interval);
  }, [conversation_id]);

  const sendMessages = async () => {
    if (newMessages.trim()) {
      // checks message isnt empty
      try {
        const response = await axios.post("/api/messages", {
          conversation_id,
          content: newMessages,
        });
        setMessages([...messages, response.data]); // adds new message to the list
        setNewMessages("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div>
      <h2>
        {conversationDetails.type === "group"
          ? conversationDetails.name
          : "Private Chat"}
      </h2>
      <div className="message-list">
        {messages.map((messages, index) => (
          <div key={index} className="message-item">
            <p>
              <strong>{messages.senderUsername}:</strong> {messages.content}
            </p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessages}
          onChange={(e) => setNewMessages(e.target.value)}
          placeholder="Start typing here"
        />
        <button onClick={sendMessages}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
