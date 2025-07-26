import { useState, useEffect, useRef } from "react";
import { query } from "@/api/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChatMessage from "@/components/ui/ChatMessage";
import { useUser } from "@/utils/UserContext";
import { Link } from "react-router";

interface Message {
  role: "user" | "ai";
  text: string;
}

function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData } = useUser();

  // Ref for scroll area to auto-scroll to bottom
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    setLoading(true);
    setInput("");

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
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error fetching reply" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messages array changes
  }, [messages]);

  return (
    <div className="flex items-center justify-center">
      {userData ? (
        <div className="h-[80vh] flex flex-col w-full max-w-2xl mx-auto border rounded-lg p-4">
          <p className="p-2">
            Ask Questions related to{" "}
            <span className="capitalize">{userData.subject}</span>!
          </p>

          {/* Scrollable messages */}
          <ScrollArea className="flex-1 mb-4 pr-2 h-full overflow-y-auto">
            <div className="space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[80%] flex flex-col gap-3 text-left ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white self-end justify-self-end"
                      : "bg-gray-200 text-black self-start"
                  }`}
                >
                  <ChatMessage content={msg.text} />
                </div>
              ))}
              {loading && (
                <div className="text-gray-500 text-sm">Thinking...</div>
              )}
              <div ref={scrollRef}></div>
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
      ) : (
        <div>
          <div>
            Complete the <Link to="/onboarding">Onboarding Form</Link> to use
            the chatbox
          </div>
          <Button
            asChild
            className="text-xl mt-4 p-5 hover:text-black hover:bg-white"
          >
            <Link to="/onboarding">Onboarding Form</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Chatbox;
