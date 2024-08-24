import React, { useState } from "react";
import NewMessage from "./NewMessage";
import Messages from "./Messages";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";

const ChatsPage = () => {
  const { user_id: userId} = useParams()
  const [currentChatId, setCurrentChatId] = useState(null);

  const handleCreateChat = (conversation_id) => {
    setCurrentChatId(conversation_id);
  };
  return (
    <div>
      <NavBar userId={userId} />
      {!currentChatId ? (
        <NewMessage onCreate={handleCreateChat} />
      ) : (
        <Messages conversation_id={currentChatId} />
      )}
    </div>
  );
};

export default ChatsPage;
