import React, { useState, useRef } from "react";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, something went wrong." }]);
    }
    setLoading(false);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
      {open ? (
        <div style={{ width: 340, height: 420, background: "#fff", borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: 12, borderBottom: "1px solid #eee", background: "#0d9488", color: "#fff", borderTopLeftRadius: 12, borderTopRightRadius: 12, fontWeight: 600, fontSize: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            AI Chatbot
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer" }}>&times;</button>
          </div>
          <div style={{ flex: 1, padding: 12, overflowY: "auto", background: "#f8fafc" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ margin: "8px 0", textAlign: msg.role === "user" ? "right" : "left" }}>
                <span style={{ display: "inline-block", background: msg.role === "user" ? "#dbeafe" : "#f1f5f9", color: "#0f172a", borderRadius: 8, padding: "6px 12px", maxWidth: 220, wordBreak: "break-word" }}>{msg.content}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} style={{ display: "flex", borderTop: "1px solid #eee", padding: 8, background: "#fff", borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{ flex: 1, border: "none", outline: "none", fontSize: 15, padding: 8, background: "#f1f5f9", borderRadius: 6 }}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} style={{ marginLeft: 8, background: "#0d9488", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer" }}>Send</button>
          </form>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} style={{ background: "#0d9488", color: "#fff", border: "none", borderRadius: "50%", width: 80, height: 80, fontSize: 44, boxShadow: "0 2px 12px rgba(0,0,0,0.18)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} title="Chat with AI">
          💬
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
