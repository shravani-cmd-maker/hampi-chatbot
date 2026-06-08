import { useEffect, useRef } from "react";
import Message from "./Message";

function ChatWindow({ messages, loading }) {
    const bottomRef = useRef(null);
    useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, loading]);
  return (
    <div
      style={{
        width: "90vw",
        maxWidth: "800px",
        height: "50vh",
        backgroundColor: "#e7ab7ae3",
        borderRadius: "15px",
        padding: "20px",
        overflowY: "auto",
        boxShadow: "inset 0px 0px 10px rgba(197, 68, 68, 0.1)",
      }}
    >
      {messages.map((msg, index) => (
<Message
  key={index}
  text={msg.text}
  sender={msg.sender}
  type={msg.type}
/>
      ))}

      {loading && (
        <Message
          text="AI is typing..."
          sender="bot"
        />
      )}
      <div ref={bottomRef}></div>
    </div>
  );
}

export default ChatWindow;