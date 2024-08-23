import React, { useState } from "react";
import NewMessage from "./NewMessage";
import Messages from "./Messages";

const ChatsPage = () => {
  const [currentChatId, setCurrentChatId] = useState(null);

  const handleCreateChat = (conversation_id) => {
    setCurrentChatId(conversation_id);
  };
  return (
    <div>
      {!currentChatId ? (
        <NewMessage onCreate={handleCreateChat} />
      ) : (
        <Messages conversation_id={currentChatId} />
      )}
    </div>
  );
};

export default ChatsPage;
