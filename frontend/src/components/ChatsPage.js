import React, { useState } from "react";
import NewMessage from "./NewMessage";
import Messages from "./Messages";

const ChatsPage = () => {
  const [currentChatId, setCurrentChatId] = useState(null);

  const handleCreateChat = (conversationId) => {
    setCurrentChatId(conversationId);
  };
  return (
    <div>
      {!currentChatId ? (
        <NewMessage onCreate={handleCreateChat} />
      ) : (
        <Messages conversationId={currentChatId} />
      )}
    </div>
  );
};

export default ChatsPage;
