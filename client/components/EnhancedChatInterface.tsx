import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
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
  Mic,
  MicOff,
  Camera,
  Upload,
  Clock,
  Calendar,
  Users,
  FileText,
  Heart,
  ArrowRight,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot" | "staff";
  timestamp: Date;
  type?: "text" | "image" | "voice" | "file";
  avatar?: string;
  senderName?: string;
  isTyping?: boolean;
  audioUrl?: string;
  imageUrl?: string;
  fileUrl?: string;
}

interface QuickTemplate {
  id: string;
  title: string;
  description: string;
  icon: any;
  message: string;
  category: "enrollment" | "daily" | "emergency" | "general";
  color: string;
}

export function EnhancedChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "👋 Welcome to Hillcrest Rising Stars! I'm your AI assistant powered by advanced voice and image recognition. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      senderName: "HRS Assistant",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const quickTemplates: QuickTemplate[] = [
    {
      id: "1",
      title: "Apply for Enrollment",
      description: "Start the application process",
      icon: FileText,
      message:
        "I'd like to apply for a place at your nursery. Can you guide me through the enrollment process?",
      category: "enrollment",
      color: "bg-blue-500",
    },
    {
      id: "2",
      title: "Check Daily Updates",
      description: "View your child's activities",
      icon: Clock,
      message: "Can you show me today's activities and updates for my child?",
      category: "daily",
      color: "bg-green-500",
    },
    {
      id: "3",
      title: "Schedule a Visit",
      description: "Book a nursery tour",
      icon: Calendar,
      message:
        "I'd like to schedule a visit to tour your nursery facilities. What times are available?",
      category: "general",
      color: "bg-purple-500",
    },
    {
      id: "4",
      title: "Emergency Contact",
      description: "Urgent assistance needed",
      icon: Phone,
      message:
        "I need urgent assistance regarding my child. Please connect me with staff immediately.",
      category: "emergency",
      color: "bg-red-500",
    },
    {
      id: "5",
      title: "Fees & Funding",
      description: "Information about costs",
      icon: Star,
      message:
        "Can you provide information about your fees and any available funding options?",
      category: "general",
      color: "bg-yellow-500",
    },
    {
      id: "6",
      title: "Programs & Activities",
      description: "Learn about our curriculum",
      icon: Users,
      message:
        "Tell me about your learning programs and daily activities for different age groups.",
      category: "general",
      color: "bg-indigo-500",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSendMessage = async (messageContent?: string) => {
    const textToSend = messageContent || message;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      sender: "user",
      timestamp: new Date(),
      senderName: "You",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);
    setShowTemplates(false);

    // Simulate AI response with voice synthesis
    setTimeout(
      async () => {
        const botResponse = generateEnhancedBotResponse(textToSend);
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
        if (!isOpen) setUnreadCount((prev) => prev + 1);

        // Synthesize speech if audio is enabled
        if (audioEnabled && "speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(botResponse.content);
          utterance.rate = 0.9;
          utterance.pitch = 1.1;
          speechSynthesis.speak(utterance);
        }
      },
      Math.random() * 2000 + 1000,
    );
  };

  const generateEnhancedBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();

    let response = "";
    if (lowerMessage.includes("enrollment") || lowerMessage.includes("apply")) {
      response =
        "🎓 I'd be happy to help with enrollment! Our application process is completely digital. You can start by clicking 'Apply for a Place' in the menu. We accept children from 6 months to 5 years. Would you like me to check availability for your preferred start date?";
    } else if (
      lowerMessage.includes("daily") ||
      lowerMessage.includes("update")
    ) {
      response =
        "📱 Daily updates are one of our most loved features! Parents receive real-time photos, activity summaries, meal reports, and mood updates throughout the day. You can access these through your parent dashboard. Would you like to see a demo of what daily updates look like?";
    } else if (
      lowerMessage.includes("emergency") ||
      lowerMessage.includes("urgent")
    ) {
      response =
        "🚨 For immediate assistance, please call us directly at 07340 960829 (Hillcrest) or 020 3827 6414 (Rainbow Stars). Our staff are available during nursery hours. For after-hours emergencies, please contact emergency services. Is there anything specific I can help you with right now?";
    } else if (
      lowerMessage.includes("visit") ||
      lowerMessage.includes("tour")
    ) {
      response =
        "🏫 We'd love to show you our beautiful nurseries! Tours are available Monday-Friday between 10 AM and 3 PM. Our virtual tour is also available 24/7 on our website. Would you prefer to book an in-person visit or start with our virtual tour?";
    } else if (
      lowerMessage.includes("fees") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("funding")
    ) {
      response =
        "💰 Our fees are competitive and we accept government funding. Full day care starts from £55/day. We offer 15 and 30-hour funded places for eligible families. Tax-free childcare and childcare vouchers are also accepted. Would you like me to calculate costs for your specific requirements?";
    } else if (
      lowerMessage.includes("program") ||
      lowerMessage.includes("activity") ||
      lowerMessage.includes("curriculum")
    ) {
      response =
        "🌟 Our programs follow the Early Years Foundation Stage with focus on: Creative Arts 🎨, Music & Movement 🎵, Outdoor Adventures 🌳, Early Literacy 📚, Numeracy Skills 🔢, and Social Development 👫. Each child gets personalized attention. Which age group are you interested in learning more about?";
    } else {
      const responses = [
        "✨ That's a great question! I'm here to help with anything about our nurseries. You can ask me about enrollment, daily activities, fees, or use the quick templates below for common questions.",
        "🤖 I'm powered by advanced AI to give you the best answers about Hillcrest Rising Stars. Feel free to ask about our programs, facilities, or anything else you'd like to know!",
        "💬 I can help you with enrollment questions, daily updates, scheduling visits, and much more. You can also upload images or use voice messages - I understand it all!",
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

  const handleTemplateClick = (template: QuickTemplate) => {
    handleSendMessage(template.message);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: file.type.startsWith("image/")
        ? "I've uploaded an image. Can you help me with this?"
        : `I've uploaded a file: ${file.name}`,
      sender: "user",
      timestamp: new Date(),
      senderName: "You",
      type: file.type.startsWith("image/") ? "image" : "file",
      imageUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
      fileUrl: !file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI image/file analysis
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now().toString(),
        content: file.type.startsWith("image/")
          ? "📸 I can see your image! This looks like a great question. Our image recognition helps me understand what you're showing me. How can I assist you with this?"
          : `📎 I've received your file "${file.name}". I can help you understand our policies, forms, or any other documents. What specific information are you looking for?`,
        sender: "bot",
        timestamp: new Date(),
        senderName: "HRS Assistant",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);

        const userMessage: Message = {
          id: Date.now().toString(),
          content: "🎤 Voice message sent",
          sender: "user",
          timestamp: new Date(),
          senderName: "You",
          type: "voice",
          audioUrl: audioUrl,
        };

        setMessages((prev) => [...prev, userMessage]);

        // Simulate voice transcription and response
        setTimeout(() => {
          const botResponse: Message = {
            id: Date.now().toString(),
            content:
              "🎧 I heard your voice message! Our advanced speech recognition understood your question. Based on what you said, let me help you with that information about our nursery services.",
            sender: "bot",
            timestamp: new Date(),
            senderName: "HRS Assistant",
          };
          setMessages((prev) => [...prev, botResponse]);
        }, 2000);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
    setShowTemplates(true);
  };

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
          className="glass-button w-16 h-16 rounded-full shadow-lg hover:shadow-xl relative group glow-effect"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
            border: "none",
          }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 rounded-full text-xs pulse-animation">
              {unreadCount}
            </Badge>
          )}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3 h-3" />
              <span>AI Assistant with Voice & Images!</span>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
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
        className={`glass-card border-0 shadow-2xl transition-all duration-300 ${
          isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
        }`}
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
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full pulse-animation"></div>
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-gray-900 flex items-center space-x-1">
                  <span>AI Assistant</span>
                  <Badge variant="secondary" className="text-xs">
                    <Sparkles className="w-2 h-2 mr-1" />
                    Voice & Vision
                  </Badge>
                </CardTitle>
                <p className="text-xs text-gray-600">Powered by Eleven Labs</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="h-8 w-8 p-0 hover:bg-white/20"
              >
                {audioEnabled ? (
                  <Volume2 className="w-4 h-4 text-green-600" />
                ) : (
                  <VolumeX className="w-4 h-4 text-gray-400" />
                )}
              </Button>
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
            {/* Quick Templates */}
            <AnimatePresence>
              {showTemplates && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 border-b border-white/20 bg-gradient-to-r from-purple-50 to-pink-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Quick Actions
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowTemplates(false)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {quickTemplates.slice(0, 4).map((template) => (
                      <Button
                        key={template.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleTemplateClick(template)}
                        className="text-xs py-2 px-3 h-auto glass-button border-purple-200 text-gray-700 hover:bg-purple-50 flex items-center space-x-2"
                      >
                        <template.icon className="w-3 h-3" />
                        <span className="truncate">{template.title}</span>
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
                    <div className={`flex items-end space-x-2 max-w-[85%]`}>
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
                        {msg.type === "image" && msg.imageUrl && (
                          <img
                            src={msg.imageUrl}
                            alt="Uploaded"
                            className="w-full max-w-xs h-32 object-cover rounded-lg mb-2"
                          />
                        )}
                        {msg.type === "voice" && msg.audioUrl && (
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <Mic className="w-2 h-2 text-white" />
                            </div>
                            <div className="flex-1 h-1 bg-green-200 rounded-full">
                              <div className="h-full w-1/3 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-xs">0:03</span>
                          </div>
                        )}
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

            {/* Input Area */}
            <div className="p-4 border-t border-white/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type, speak, or upload..."
                      className="glass-input border-0 pr-24 focus:ring-2 focus:ring-purple-500"
                      disabled={isRecording}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-3 h-3 text-gray-400" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="w-3 h-3 text-gray-400" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                      >
                        <Smile className="w-3 h-3 text-gray-400" />
                      </Button>
                    </div>
                  </div>

                  {/* Voice Recording Button */}
                  <Button
                    type="button"
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    className={`h-10 w-10 p-0 rounded-full transition-all ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600 scale-110"
                        : "glass-button bg-gradient-to-r from-green-500 to-emerald-500"
                    }`}
                  >
                    {isRecording ? (
                      <div className="flex flex-col items-center">
                        <MicOff className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <Mic className="w-4 h-4 text-white" />
                    )}
                  </Button>

                  <Button
                    type="submit"
                    disabled={!message.trim() && !isRecording}
                    className="glass-button h-10 w-10 p-0 rounded-full"
                    style={{
                      background: message.trim()
                        ? "linear-gradient(135deg, #8b5cf6, #ec4899)"
                        : "rgba(156, 163, 175, 0.3)",
                    }}
                  >
                    <Send className="w-4 h-4 text-white" />
                  </Button>
                </div>

                {/* Recording Indicator */}
                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center space-x-2 text-red-500"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full pulse-animation"></div>
                    <span className="text-sm font-medium">
                      Recording: {formatTime(recordingTime)}
                    </span>
                    <span className="text-xs text-gray-500">
                      Release to send
                    </span>
                  </motion.div>
                )}

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="text-xs"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Quick Actions
                  </Button>
                  <p className="text-xs text-gray-500">
                    AI-powered • Voice & Image ready
                  </p>
                </div>
              </form>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}
