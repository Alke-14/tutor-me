import { useState, useEffect, useRef } from "react";
import { query } from "@/api/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "ai";
  text: string;
}

function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Ref for scroll area to auto-scroll to bottom
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    setLoading(true);

    try {
      // Combine conversation for memory
      const conversationText = updatedMessages
        .map((m) => `${m.role === "user" ? "User" : "Tutor"}: ${m.text}`)
        .join("\n");

      const reply = await query(conversationText);

      const aiMessage: Message = { role: "ai", text: reply ?? "" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "ai", text: "Error fetching reply" }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  // Auto-scroll when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-[95vh] flex items-center justify-center">
      <div className="flex flex-col w-full max-w-2xl mx-auto border rounded-lg p-4 h-full">
        <p className="p-2">Ask me anything!</p>

        {/* Scrollable messages */}
        <ScrollArea className="flex-1 mb-4 pr-2 h-[700px]" ref={scrollRef}>
          <div className="space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white self-end justify-self-end"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-gray-500 text-sm">Thinking...</div>}
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="flex gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
