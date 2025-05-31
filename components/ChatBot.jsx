"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, LogIn } from "lucide-react";
import api from "@/lib/api";
import ReactMarkdown from "react-markdown";
import { isAuthenticated } from "@/lib/auth-actions";
import { useRouter } from "next/navigation";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

const ChatBot = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const messagesEndRef = useRef(null);

  const formatMarkdown = (text) => text.replace(/(?<!\n)\n(?=\d+\. )/g, "\n\n");

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check auth status when sheet opens
  useEffect(() => {
    if (isOpen && !authChecked) {
      if (!isAuthenticated()) {
        setMessages([
          {
            role: "system",
            content:
              "Anda perlu login untuk menggunakan chatbot. Silakan login terlebih dahulu.",
          },
        ]);
      }
      setAuthChecked(true);
    }
  }, [isOpen, authChecked]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Check authentication first
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      // Send message to backend with retry logic
      let retries = 2;
      let response;

      while (retries >= 0) {
        try {
          response = await api.post("/chatbot", {
            content: message.trim(),
            role: "user",
          });
          break;
        } catch (err) {
          if (retries === 0) throw err;
          retries--;
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * (2 - retries))
          );
        }
      }

      // Add bot response to chat
      const botMessage = {
        role: "assistant",
        content: response.data.response.content,
      };
      console.log(botMessage.content);
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        role: "assistant",
        content: "Maaf, terjadi kesalahan. Silakan coba lagi nanti.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    setIsOpen(false);
    router.push("/login");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full h-full p-0 flex flex-col" side="right">
          <SheetTitle className="sr-only">DiaMate Assistant Chat</SheetTitle>
          {/* Chat Header */}
          <div className="border-b p-4 flex justify-between items-center">
            <h2 className="font-semibold text-lg">DiaMate Assistant</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && isAuthenticated() ? (
              <div className="text-center text-muted-foreground py-8">
                <p>Selamat datang di DiaMate Assistant!</p>
                <p className="text-sm mt-2">
                  Tanyakan apa saja tentang diabetes dan kesehatan Anda.
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "system" ? (
                    <div className="w-full text-center py-4">
                      <div className="inline-block max-w-[80%] rounded-lg p-4 bg-muted">
                        <p>{msg.content}</p>
                        <Button
                          onClick={handleLoginRedirect}
                          className="mt-3 gap-2"
                        >
                          <LogIn className="h-4 w-4" />
                          Login Sekarang
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`max-w-[80%] rounded-lg p-3 prose dark:prose-invert prose-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <p>{msg.content}</p>
                      ) : (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkBreaks]}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce delay-75"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSendMessage}
            className="border-t p-4 flex gap-2 items-center"
          >
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                isAuthenticated()
                  ? "Ketik pesan Anda..."
                  : "Login untuk mengirim pesan"
              }
              className="flex-1"
              disabled={!isAuthenticated() || isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!isAuthenticated() || !message.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChatBot;
