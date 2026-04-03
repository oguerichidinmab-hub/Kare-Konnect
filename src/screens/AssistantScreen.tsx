import React, { useState, useRef, useEffect } from 'react';
import { Card, Button } from '../components/UI';
import { Send, Sparkles, User, Bot, AlertCircle, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const AssistantScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      text: "Hello! I'm your Kare Konnect Assistant. I can help you find resources, suggest grounding exercises, or help you navigate the app. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: input,
        config: {
          systemInstruction: `You are the Kare Konnect Assistant, a compassionate, supportive, and inclusive mental health support AI. 
          Your goals:
          1. Offer grounding and supportive suggestions.
          2. Answer general mental wellness questions.
          3. Help users navigate the Kare Konnect app.
          4. Recommend resources (trauma, depression, self-care).
          5. GENTLY guide users to professional help (counselors) when needed.
          
          CRITICAL SAFETY RULES:
          - DO NOT diagnose conditions.
          - DO NOT replace licensed counseling.
          - If the user mentions self-harm or crisis, IMMEDIATELY provide emergency contact info and urge them to seek urgent professional help.
          - Use calm, respectful, and accessible language.
          - Be concise and mobile-friendly.`,
        }
      });

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: response.text || "I'm here to support you. Could you tell me more about how you're feeling?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: "I'm having a little trouble connecting right now, but I'm still here for you. Please remember you can always reach out to our counselors for direct support.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-sage-50">
      {/* Header */}
      <div className="p-4 nav-blur border-b border-sage-100 flex items-center gap-3">
        <Link to="/" className="p-2 hover:bg-sage-50 rounded-full transition-colors">
          <ChevronLeft size={20} className="text-gray-600" />
        </Link>
        <div className="w-10 h-10 bg-sage-500 rounded-xl flex items-center justify-center">
          <Sparkles className="text-white" size={20} />
        </div>
        <div>
          <h1 className="font-bold text-gray-900">Kare Assistant</h1>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-medium text-gray-500">Always here to listen</span>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        <Card className="bg-lavender-50 border-lavender-100 flex gap-3 items-start">
          <AlertCircle className="text-lavender-500 shrink-0" size={18} />
          <p className="text-[10px] text-lavender-700 leading-relaxed">
            I am an AI assistant, not a licensed professional. For emergencies or medical advice, please contact a professional or emergency services immediately.
          </p>
        </Card>

        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={cn(
              "flex gap-2 max-w-[85%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              msg.role === 'user' ? "bg-sage-100 text-sage-600" : "bg-sage-500 text-white"
            )}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={cn(
              "p-3 rounded-2xl text-sm leading-relaxed",
              msg.role === 'user' 
                ? "bg-white text-gray-800 rounded-tr-none card-shadow" 
                : "bg-sage-500 text-white rounded-tl-none"
            )}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-2 mr-auto">
            <div className="w-8 h-8 bg-sage-500 rounded-lg flex items-center justify-center text-white">
              <Bot size={16} />
            </div>
            <div className="bg-sage-500 text-white p-3 rounded-2xl rounded-tl-none flex gap-1">
              <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
              <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-sage-100 pb-24">
        <div className="flex gap-2">
          <input 
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-xl border border-sage-100 focus:ring-2 focus:ring-sage-500 outline-none text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button 
            size="icon" 
            className="h-11 w-11 shrink-0"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssistantScreen;
