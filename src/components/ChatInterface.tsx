import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, User, Bot, Zap, Code, Lightbulb } from "lucide-react";
import TypingIndicator from "./TypingIndicator";
import SmartResponse from "./SmartResponse";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const intelligentResponses = {
  // React & Components
  react: [
    "Excellent choice! I'll create a **modern React component** with proper hooks, TypeScript interfaces, and performance optimizations. I'll use functional components with `useState` and `useEffect` for clean, maintainable code.",
    "Perfect! I'll build a **reusable React component** following the compound component pattern, with proper prop types, default values, and comprehensive error boundaries for production-ready code.",
  ],
  
  // UI & Design
  ui: [
    "Great idea! I'll design a **beautiful, accessible interface** using semantic HTML, ARIA labels, and our design system tokens. The UI will be responsive across all devices with smooth micro-interactions.",
    "I'll create an **intuitive user interface** with proper focus management, keyboard navigation, and visual feedback. Every element will follow modern UX principles for delightful user experiences.",
  ],
  
  // Animations & Interactions
  animation: [
    "Fantastic! I'll implement **smooth, performant animations** using CSS transforms and the Web Animations API. I'll ensure 60fps performance with GPU acceleration and respect users' motion preferences.",
    "Perfect timing! I'll add **engaging micro-interactions** with spring animations, easing functions, and stagger effects. The animations will enhance usability while maintaining performance.",
  ],
  
  // API & Data
  api: [
    "Smart approach! I'll build **robust API integration** with proper error handling, retry logic, and TypeScript types. I'll implement loading states, caching strategies, and optimistic updates for smooth UX.",
    "Excellent! I'll create a **comprehensive data layer** with React Query for caching, background updates, and offline support. The API calls will be type-safe with proper error boundaries.",
  ],
  
  // Forms & Validation
  forms: [
    "I'll build a **powerful form system** with React Hook Form, Zod validation, and real-time error feedback. The forms will be accessible, performant, and provide excellent user experience.",
    "Perfect! I'll create **intelligent form validation** with custom rules, async validation, and progressive enhancement. Users will get instant feedback with clear, helpful error messages.",
  ],
  
  // Performance & Optimization
  performance: [
    "Great focus! I'll optimize for **peak performance** using lazy loading, code splitting, and memoization. I'll implement virtual scrolling, image optimization, and bundle analysis for lightning-fast experiences.",
    "Excellent priority! I'll build with **performance-first mindset** using React.memo, useMemo, and useCallback strategically. Every component will be optimized for minimal re-renders and fast interactions.",
  ],
  
  // Security & Best Practices
  security: [
    "Smart thinking! I'll implement **enterprise-grade security** with input sanitization, CSP headers, and secure authentication flows. Every endpoint will be protected with proper validation and rate limiting.",
    "Perfect! I'll build **secure, production-ready code** following OWASP guidelines with XSS protection, CSRF tokens, and encrypted data handling. Security will be baked into every layer.",
  ],
  
  // State Management
  state: [
    "Excellent architecture choice! I'll implement **intelligent state management** using Context API with useReducer for complex state, or Zustand for global state. The data flow will be predictable and debuggable.",
    "Great approach! I'll design a **scalable state architecture** with proper separation of concerns, normalized data structures, and efficient updates. State will be organized for maintainability and performance.",
  ],
};

const fallbackResponses = [
  "I'll analyze your request and create an **intelligent solution** with clean architecture, proper error handling, and modern best practices. Let me build something exceptional for you!",
  "Fantastic idea! I'll implement this with **cutting-edge techniques**, focusing on performance, accessibility, and maintainable code. Every detail will be crafted with precision.",
  "Perfect! I'll design a **comprehensive solution** using the latest patterns, ensuring scalability, type safety, and delightful user experience. Here's my strategic approach:",
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "✨ Hello! I'm your **intelligent AI coding assistant** with deep expertise in modern web development. I can architect solutions, optimize performance, implement security best practices, and create beautiful user experiences. What challenging project shall we tackle together?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getIntelligentResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    // Advanced keyword matching with context awareness
    if (input.match(/(component|react|jsx|tsx|hook)/)) {
      return intelligentResponses.react[Math.floor(Math.random() * intelligentResponses.react.length)];
    }
    if (input.match(/(ui|interface|design|layout|button|card|modal)/)) {
      return intelligentResponses.ui[Math.floor(Math.random() * intelligentResponses.ui.length)];
    }
    if (input.match(/(animat|transition|motion|spring|gsap|framer)/)) {
      return intelligentResponses.animation[Math.floor(Math.random() * intelligentResponses.animation.length)];
    }
    if (input.match(/(api|fetch|axios|request|endpoint|graphql|rest)/)) {
      return intelligentResponses.api[Math.floor(Math.random() * intelligentResponses.api.length)];
    }
    if (input.match(/(form|input|validat|submit|field|schema)/)) {
      return intelligentResponses.forms[Math.floor(Math.random() * intelligentResponses.forms.length)];
    }
    if (input.match(/(performance|optimi|speed|bundle|lazy|memo)/)) {
      return intelligentResponses.performance[Math.floor(Math.random() * intelligentResponses.performance.length)];
    }
    if (input.match(/(security|auth|protect|encrypt|sanitiz|csrf|xss)/)) {
      return intelligentResponses.security[Math.floor(Math.random() * intelligentResponses.security.length)];
    }
    if (input.match(/(state|redux|zustand|context|store|global)/)) {
      return intelligentResponses.state[Math.floor(Math.random() * intelligentResponses.state.length)];
    }
    if (input.match(/(responsive|mobile|tablet|breakpoint|grid|flexbox)/)) {
      return "Excellent! I'll create a **fully responsive design** using CSS Grid, Flexbox, and container queries. The layout will adapt beautifully across all screen sizes with touch-friendly interactions and optimal performance on mobile devices.";
    }
    if (input.match(/(database|sql|prisma|supabase|mongodb)/)) {
      return "Smart choice! I'll design a **robust database architecture** with proper indexing, relationships, and query optimization. I'll implement type-safe queries with excellent performance and data integrity.";
    }
    if (input.match(/(testing|test|jest|cypress|playwright|unit|e2e)/)) {
      return "Great practice! I'll implement **comprehensive testing strategy** with unit tests, integration tests, and E2E coverage. Every component will have proper test cases ensuring reliability and preventing regressions.";
    }
    if (input.match(/(deploy|hosting|vercel|netlify|aws|docker)/)) {
      return "Perfect! I'll set up **professional deployment** with CI/CD pipelines, environment management, and monitoring. The deployment will be optimized for performance with proper caching and CDN configuration.";
    }
    if (input.match(/(accessibility|a11y|wcag|screen reader|keyboard)/)) {
      return "Excellent priority! I'll ensure **full accessibility compliance** with WCAG 2.1 AA standards, proper ARIA labels, keyboard navigation, and screen reader support. Every user will have an exceptional experience.";
    }
    
    // Fallback to general intelligent responses
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    const userInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Add typing indicator
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getIntelligentResponse(userInput),
        timestamp: new Date(),
        isTyping: true,
      };
      setMessages((prev) => [...prev, aiResponse]);
      
      // Remove typing indicator after response is complete
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => 
          prev.map(msg => 
            msg.id === aiResponse.id 
              ? { ...msg, isTyping: false }
              : msg
          )
        );
      }, 2000);
    }, 800 + Math.random() * 1200); // Random delay for more natural feel
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full glass rounded-xl border border-ai-border-subtle shadow-glass">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-ai-border-subtle">
        <div className="w-8 h-8 gradient-ai rounded-lg flex items-center justify-center animate-glow">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground shimmer-text">AI Assistant</h2>
          <p className="text-sm text-muted-foreground">Your intelligent coding partner</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-500 font-medium">Online</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 message-enter ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[85%] ${
                  message.type === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === "user"
                      ? "bg-primary shadow-ai"
                      : "gradient-ai animate-float shadow-ai"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`rounded-xl p-4 shadow-glass ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-ai-surface-elevated border border-ai-border-subtle"
                  }`}
                >
                  {message.type === "ai" && message.isTyping ? (
                    <SmartResponse content={message.content} />
                  ) : (
                    <div className="text-sm leading-relaxed">
                      {message.content.split('**').map((part, index) => 
                        index % 2 === 1 ? (
                          <span key={index} className="font-semibold text-gradient">{part}</span>
                        ) : (
                          <span key={index}>{part}</span>
                        )
                      )}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-2 opacity-60">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && <TypingIndicator />}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-ai-border-subtle">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about coding..."
              className="glass border-ai-border-subtle focus:ring-ai-purple pr-12 transition-all duration-300 focus:shadow-ai"
              disabled={isTyping}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
              <Lightbulb className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <Button
            onClick={handleSendMessage}
            variant="default"
            size="icon"
            className="gradient-ai shadow-ai hover:animate-glow transition-all duration-300 disabled:opacity-50"
            disabled={isTyping || !inputValue.trim()}
          >
            {isTyping ? (
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-2 mt-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1 text-muted-foreground hover:text-ai-purple transition-colors"
            onClick={() => setInputValue("Create a React component")}
          >
            <Code className="w-3 h-3" />
            Component
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1 text-muted-foreground hover:text-ai-purple transition-colors"
            onClick={() => setInputValue("Add animations")}
          >
            <Zap className="w-3 h-3" />
            Animate
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1 text-muted-foreground hover:text-ai-purple transition-colors"
            onClick={() => setInputValue("Make it responsive")}
          >
            <Sparkles className="w-3 h-3" />
            Responsive
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;