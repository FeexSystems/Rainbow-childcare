import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  MessageCircle,
  Send,
  Minimize2,
  Maximize2,
  X,
  Bot,
  User,
  Image,
  Smile,
  Paperclip,
  Phone,
  Video,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot" | "staff";
  timestamp: Date;
  type?: "text" | "image" | "video" | "file";
  avatar?: string;
  senderName?: string;
  isTyping?: boolean;
}

export function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "👋 Welcome to Hillcrest Rising Stars! I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      senderName: "HRS Assistant",
    },
    {
      id: "2",
      content:
        "You can ask me about enrollment, our programs, daily schedules, or anything else!",
      sender: "bot",
      timestamp: new Date(),
      senderName: "HRS Assistant",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
      senderName: "You",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(
      () => {
        const botResponse = generateBotResponse(message);
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
        if (!isOpen) setUnreadCount((prev) => prev + 1);
      },
      Math.random() * 2000 + 1000,
    );
  };

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();

    let response = "";
    if (lowerMessage.includes("enrollment") || lowerMessage.includes("apply")) {
      response =
        "Our enrollment process is simple! Visit our 'Apply for a Place' page to start your application. We accept children aged 6 months to 5 years. Would you like me to guide you through the process?";
    } else if (
      lowerMessage.includes("hours") ||
      lowerMessage.includes("time")
    ) {
      response =
        "We're open Monday to Friday, 7:30 AM to 6:00 PM. We offer flexible sessions including full day care, morning sessions, and afternoon sessions. What type of schedule are you looking for?";
    } else if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("fee")
    ) {
      response =
        "Our fees vary by age group and session type. Full day care starts from £55 per day. We accept government funding for eligible families. Check our Fees page for detailed pricing!";
    } else if (
      lowerMessage.includes("program") ||
      lowerMessage.includes("curriculum")
    ) {
      response =
        "We follow the Early Years Foundation Stage (EYFS) framework with a focus on play-based learning. Our programs include outdoor exploration, creative arts, early literacy, numeracy, and social development. Each child gets personalized attention!";
    } else if (
      lowerMessage.includes("lunch") ||
      lowerMessage.includes("food") ||
      lowerMessage.includes("meal")
    ) {
      response =
        "We provide nutritious, freshly prepared meals and snacks daily. Our menu includes vegetarian options and accommodates allergies. Children are encouraged to try new foods in a supportive environment!";
    } else if (
      lowerMessage.includes("staff") ||
      lowerMessage.includes("teacher")
    ) {
      response =
        "Our qualified early years practitioners are passionate about child development. All staff are DBS checked, first aid trained, and regularly attend professional development courses. We maintain excellent adult-to-child ratios!";
    } else {
      const responses = [
        "That's a great question! Our team would love to help you with that. You can contact us directly or book a visit to see our facilities.",
        "I'd be happy to help! Could you tell me more about what specific information you're looking for?",
        "Thank you for your interest in Hillcrest Rising Stars! For detailed information, feel free to contact our friendly staff at 07340 960829.",
        "We're here to support your family's journey! Is there anything specific about our nursery programs you'd like to know more about?",
      ];
      response = responses[Math.floor(Math.random() * responses.length)];
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: "bot",
      timestamp: new Date(),
      senderName: "HRS Assistant",
    };
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const suggestedQuestions = [
    "How do I apply for enrollment?",
    "What are your opening hours?",
    "Tell me about your programs",
    "What are the fees?",
    "Can I schedule a visit?",
  ];

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={handleOpenChat}
          className="glass-button w-16 h-16 rounded-full shadow-lg hover:shadow-xl relative group"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
            border: "none",
          }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 rounded-full text-xs">
              {unreadCount}
            </Badge>
          )}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with us!
          </div>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Card
        className={`glass-card border-0 shadow-2xl ${
          isMinimized ? "w-80 h-16" : "w-96 h-[500px]"
        } transition-all duration-300`}
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <CardHeader className="pb-3 px-4 py-3 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/icon-192x192.png" />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                    <Star className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-gray-900">
                  Hillcrest Assistant
                </CardTitle>
                <p className="text-xs text-gray-600">Always here to help!</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0 hover:bg-white/20"
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-full p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-end space-x-2 max-w-[80%]`}>
                      {msg.sender !== "user" && (
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                            <Bot className="w-3 h-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`px-3 py-2 rounded-lg ${
                          msg.sender === "user"
                            ? "chat-bubble-user text-white"
                            : "chat-bubble-bot text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === "user"
                              ? "text-white/70"
                              : "text-gray-500"
                          }`}
                        >
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {msg.sender === "user" && (
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs">
                            <User className="w-3 h-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                        <Bot className="w-3 h-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="chat-bubble-bot p-3">
                      <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 2 && (
              <div className="px-4 py-2 border-t border-white/20">
                <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {suggestedQuestions.slice(0, 3).map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setMessage(question);
                        handleSendMessage({
                          preventDefault: () => {},
                        } as React.FormEvent);
                      }}
                      className="text-xs py-1 px-2 h-6 glass-button border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/20">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center space-x-2"
              >
                <div className="flex-1 relative">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="glass-input border-0 pr-20 focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <Smile className="w-3 h-3 text-gray-400" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <Paperclip className="w-3 h-3 text-gray-400" />
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={!message.trim()}
                  className="glass-button h-10 w-10 p-0 rounded-full"
                  style={{
                    background: message.trim()
                      ? "linear-gradient(135deg, #8b5cf6, #ec4899)"
                      : "rgba(156, 163, 175, 0.3)",
                  }}
                >
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </form>
              <div className="flex items-center justify-between mt-2">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Phone className="w-3 h-3 text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Video className="w-3 h-3 text-gray-400" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  We typically reply in a few minutes
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}
