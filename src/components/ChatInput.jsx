function ChatInput({
  input,
  setInput,
  handleSubmit,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "15px",
        width: "90vw",
        maxWidth: "800px",
      }}
    >
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
          outline: "none",
        }}
      />

      <button
        type="submit"
        style={{
          backgroundColor: "#925a06",
          color: "white",
          border: "none",
          borderRadius: "10px",
         padding: "10px 14px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;