import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import { sendMessageToAI } from "./api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const isMobile = window.innerWidth < 768;

function handleLoginSuccess(
  credentialResponse
) {
  const decoded = jwtDecode(
    credentialResponse.credential
  );

  setUser(decoded);

  setMessages([
    {
      text: `Hi ${decoded.name}! Welcome! How can I help you today?`,
      sender: "bot",
    },
  ]);
}

  function handleLogout() {
    setUser(null);
    setMessages([]);
    setShowMenu(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (input.trim() === "") return;

    const userMessage = {
      text: input,
      sender: "user",
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);

    setInput("");

    setLoading(true);

    try {
      const aiResponse =
        await sendMessageToAI(updatedMessages);

      const botMessage = {
        text: aiResponse.text,
        sender: "bot",
        type: aiResponse.type,
      };

      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);
    } catch (error) {
      const errorMessage = {
        text: `Error: ${error.message}`,
        sender: "bot",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  }

  const suggestedQuestions = [
  "What is Hampi?",
  "History of Hampi",
  "Best places to visit in Hampi",
  "Hampi ticket prices",
  "Hampi opening timings",
];
async function handleSuggestedQuestion(question) {
  const userMessage = {
    text: question,
    sender: "user",
  };

  const updatedMessages = [
    ...messages,
    userMessage,
  ];

  setMessages(updatedMessages);

  setLoading(true);

  try {
    const aiResponse =
      await sendMessageToAI(updatedMessages);

    const botMessage = {
      text: aiResponse.text,
      sender: "bot",
      type: aiResponse.type,
    };

    setMessages((prev) => [
      ...prev,
      botMessage,
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        text: `Error: ${error.message}`,
        sender: "bot",
      },
    ]);
  } finally {
    setLoading(false);
  }
}

  return (
<div
  style={{
    minHeight: "100vh",
    overflow: "hidden",
    height: "100vh",

    backgroundImage:
  "url('https://www.holidaymonk.com/wp-content/uploads/2020/10/Vastuchitra_Stone-Chariot-Hampi.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
marginTop: isMobile ? "60px" : "0px",
    position: "relative",
  }}
>
{!user ? (
  <div
    style={{
width: "90vw",
maxWidth: "750px",
minHeight: "500px",

      backgroundColor: "rgba(0,0,0,0.55)",
      backdropFilter: "blur(8px)",

      borderRadius: "25px",
      border: "2px solid #ff9900",

      boxShadow:
        "0px 0px 30px rgba(255,153,0,0.4)",

      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

      padding: "40px",
    }}
  >
    <h1
      style={{
       fontSize: "clamp(24px, 5vw, 32px)",
        fontWeight: "700",
        background:
          "linear-gradient(90deg, #ca7e0c, #e7d90a)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "15px",
      }}
    >
      Hampi Heritage Guide
    </h1>

    <p
      style={{
        color: "white",
        fontSize: "15px",
        textAlign: "center",
        maxWidth: "500px",
        lineHeight: "1.8",
        marginBottom: "35px",
      }}
    >
      Explore the monuments, history,
      architecture and cultural heritage
      of Hampi with an AI-powered guide.
    </p>

    <GoogleLogin
      theme="filled_blue"
      size="large"
      shape="pill"
      text="signin_with"
      onSuccess={handleLoginSuccess}
      onError={() =>
        console.log("Login Failed")
      }
    />
  </div>
) : (
        <>
          <div
            style={{
              position: "absolute",
top: isMobile ? "65px" : "15px",
right: "15px",
            }}
          >
            <div
  onClick={() =>
    setShowMenu(!showMenu)
  }
  style={{
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  backgroundColor: "#ff9900",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "13px",
  cursor: "pointer",
  border: "1px solid white",
  boxShadow:
    "0px 2px 5px rgba(0,0,0,0.3)",
}}
>
  {user?.name?.charAt(0).toUpperCase()}
</div>

            {showMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "35px",
                  right: "10",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "10px",
                  boxShadow:
                    "0px 3px 10px rgba(0,0,0,0.2)",
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
<>
  <h1
    style={{
      background:
        "linear-gradient(90deg, #ff7300f1, #ffe600)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontSize: isMobile ? "22px" : "32px",
      fontWeight: "400",
      marginBottom: "5px",
    }}
  >
    AI Chat Assistant
  </h1>

  <p
    style={{
      color: "white",
      fontSize: "18px",fontSize: isMobile ? "14px" : "18px",
       marginBottom: "15px",
    }}
  >
    Hi, {user.name} !
  </p>
</>

            <ChatWindow
              messages={messages}
              loading={loading}
            />
            <div
  style={{
  width: "90vw",
maxWidth: "800px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "6px",
    marginBottom: "15px",
    justifyContent: "center",
  }}
>
  {suggestedQuestions.map((question) => (
    <button
      key={question}
     onClick={() =>
  handleSuggestedQuestion(question)
}
      style={{
        padding: isMobile ? "6px 10px" : "8px 14px",
fontSize: isMobile ? "14px" : "16px",
        borderRadius: "20px",
        border: "1px solid #ff9900",
        backgroundColor: "#fff8e6",
        cursor: "pointer",
       whiteSpace: "normal",
      textAlign: "center",
      }}
    >
      {question}
    </button>
  ))}
</div>
            <ChatInput
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;