import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";

function Message({
  text,
  sender,
  type,
}) {
  const isUser = sender === "user";

  const isWarning =
    type === "warning";


function downloadPDF() {
  const doc = new jsPDF();

  
  doc.setFontSize(20);
  doc.text("Hampi Heritage Guide", 10, 20);

  
  doc.setFontSize(12);
 const lines = doc.splitTextToSize(text, 180);

doc.text(lines, 10, 40);


  doc.save("hampi-guide.pdf");
}

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser
          ? "flex-end"
          : "flex-start",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: isUser
            ? "#c28637"
            : isWarning
            ? "#ff6b6b"
            : "#e48922",

          color: isUser
            ? "black"
            : "#1a1a1a",
          
          padding: "12px 18px",
          borderRadius: "16px",
          maxWidth: "75%",
          wordBreak: "break-word",
          lineHeight: "1.6",
          whiteSpace: "pre-wrap",
          textAlign: isUser
            ? "left"
            : "justify",

          border: isWarning
            ? "2px solid #00000034"
            : "2px solid #0000004b",

          boxShadow:
            "0px 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <ReactMarkdown>
          {text}
        </ReactMarkdown>
        {!isUser && (
  <div
    style={{
      textAlign: "right",
      marginTop: "10px",
    }}
  >
<button
  onClick={downloadPDF}
  style={{
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "10px",
  }}
>
  Save Response
</button>
      
  </div>
)}
      </div>
    </div>
  );
}

export default Message;