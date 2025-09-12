import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Bot, Code, Lightbulb, Send, Sparkles, User, Zap } from "lucide-react";
import React, { useState } from "react";
import SmartResponse from "../SmartResponse";
import TypingIndicator from "../TypingIndicator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TypingIndicator2 from "../TypingIndicator2";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  persona?: "mentor" | "challenger" | "builder" | "critic";
  code?: string;
  executionResult?: string;
  isTyping?: boolean;
}

const personas = {
  mentor: "🧙 Mentor — Wise guidance, best practices, and structured learning.",
  challenger:
    "⚔️ Challenger — Pushes boundaries, questions assumptions, forces deeper thinking.",
  builder:
    "🔨 Builder — Crafts working code, systems, and pragmatic solutions.",
  critic:
    "🕵️ Critic — Reviews, audits, finds flaws, improves security and performance.",
  2: "This is kobe the best developer in the tech industire",
};

// --- Core Chat Engine ---
const ChatEngine2 = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "🔥 Welcome challenger! I’m **Nemesis AI**, designed to test and refine your ideas. Want me to fetch real API data for you?",
      timestamp: new Date(),
      persona: "challenger",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Intent classifier
  const classifyIntent = (input: string): keyof typeof personas => {
    switch (true) {
      case /(teach|learn|explain|guide)/i.test(input):
        return "mentor";
      case /(wrong|fail|prove|challenge|battle)/i.test(input):
        return "challenger";
      case /(api|fetch|data|get|show|call|request)/i.test(input):
        return "builder";
      case /(review|audit|security|test|bug|flaw)/i.test(input):
        return "critic";
      default:
        return "builder"; // default to builder for utility
    }
    // if (input.match(/(teach|learn|explain|guide)/i)) return "mentor";
    // if (input.match(/(wrong|fail|prove|challenge|battle)/i))
    //   return "challenger";
    // if (input.match(/(api|fetch|data|get|show|call|request)/i))
    //   return "builder";
    // if (input.match(/(review|audit|security|test|bug|flaw)/i)) return "critic";
    // return "builder"; // default to builder for utility
  };

  //   // Detect if user wants API data
  //   const detectApiTarget = (input: string) => {

  //     if (input.match(/pokemon/i)) {
  //       return {
  //         url: "https://pokeapi.co/api/v2/pokemon/ditto",
  //         exampleCode: `
  //             import { useEffect, useState } from "react";

  //             export default function Pokemon() {
  //             const [data, setData] = useState<any>(null);

  //             useEffect(() => {
  //                 fetch("https://pokeapi.co/api/v2/pokemon/ditto")
  //                 .then(res => res.json())
  //                 .then(setData);
  //             }, []);

  //             if (!data) return <p>Loading...</p>;
  //             return (
  //                 <div>
  //                 <h2>{data.name}</h2>
  //                 <img src={data.sprites.front_default} alt={data.name} />
  //                 </div>
  //             );
  //             }
  //         `,
  //       };
  //     }
  //     if (input.match(/github/i)) {
  //       return {
  //         url: "https://api.github.com/repos/facebook/react",
  //         exampleCode: `
  //             import { useEffect, useState } from "react";

  //             export default function RepoInfo() {
  //             const [repo, setRepo] = useState<any>(null);

  //             useEffect(() => {
  //                 fetch("https://api.github.com/repos/facebook/react")
  //                 .then(res => res.json())
  //                 .then(setRepo);
  //             }, []);

  //             if (!repo) return <p>Loading...</p>;
  //             return (
  //                 <div>
  //                 <h2>{repo.full_name}</h2>
  //                 <p>⭐ Stars: {repo.stargazers_count}</p>
  //                 <p>{repo.description}</p>
  //                 </div>
  //             );
  //             }
  //                     `,
  //       };
  //     }
  //     return null;
  //   };

  const detectApiTarget = (input: string) => {
    switch (true) {
      case /pokemon/i.test(input):
        return {
          url: "https://pokeapi.co/api/v2/pokemon/ditto",
          response: "⚡ Fetching Pokémon data from PokeAPI...",
          exampleCode: `
                import { useEffect, useState } from "react";

                export default function Pokemon() {
                const [data, setData] = useState<any>(null);

                useEffect(() => {
                    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
                    .then(res => res.json())
                    .then(setData);
                }, []);

                if (!data) return <p>Loading...</p>;
                return (
                    <div>
                    <h2>{data.name}</h2>
                    <img src={data.sprites.front_default} alt={data.name} />
                    </div>
                );
                }
        `,
        };

      case /github/i.test(input):
        return {
          url: "https://api.github.com/repos/facebook/react",
          response: "📦 Pulling GitHub repo info for React...",
          exampleCode: `
                import { useEffect, useState } from "react";

                export default function RepoInfo() {
                const [repo, setRepo] = useState<any>(null);

                useEffect(() => {
                    fetch("https://api.github.com/repos/facebook/react")
                    .then(res => res.json())
                    .then(setRepo);
                }, []);

                if (!repo) return <p>Loading...</p>;
                return (
                    <div>
                    <h2>{repo.full_name}</h2>
                    <p>⭐ Stars: {repo.stargazers_count}</p>
                    <p>{repo.description}</p>
                    </div>
                );
                }
                        `,
        };

      case /weather/i.test(input):
        return {
          url: "https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&hourly=temperature_2m",
          response: "🌤️ Fetching sample weather data from Open-Meteo...",
          exampleCode: `
                import { useEffect, useState } from "react";

                export default function Weather() {
                const [data, setData] = useState<any>(null);

                useEffect(() => {
                    fetch("https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&hourly=temperature_2m")
                    .then(res => res.json())
                    .then(setData);
                }, []);

                if (!data) return <p>Loading weather data...</p>;
                return (
                    <div>
                    <h2>Weather Forecast</h2>
                    <pre>{JSON.stringify(data.hourly.temperature_2m.slice(0,5), null, 2)}</pre>
                    </div>
                );
                }
        `,
        };

      default:
        return null;
    }
  };

  // AI response generator
  const generateResponse = async (userInput: string): Promise<Message> => {
    const persona = classifyIntent(userInput);

    if (persona === "builder") {
      const apiTarget = detectApiTarget(userInput);

      if (apiTarget) {
        // Try fetching data live
        let result = "";
        try {
          const res = await fetch(apiTarget.url);
          result =
            JSON.stringify(await res.json(), null, 2).slice(0, 400) + " ...";
        } catch {
          result = "⚠️ Could not fetch live data here (CORS or offline).";
        }

        return {
          id: Date.now().toString(),
          type: "ai",
          content: `🔨 I’ll fetch from **${apiTarget.url}**. Here’s a working React component you can drop into your app:`,
          timestamp: new Date(),
          persona,
          code: apiTarget.exampleCode,
          executionResult: result,
        };
      }

      return {
        id: Date.now().toString(),
        type: "ai",
        content: `🔨 I can generate a React app for API fetching. Try asking "fetch Pokémon data" or "get GitHub repo info".`,
        timestamp: new Date(),
        persona,
      };
    }

    return {
      id: Date.now().toString(),
      type: "ai",
      content: personas[persona],
      timestamp: new Date(),
    };
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMsg]);
    const userInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    setTimeout(async () => {
      const aiResponse = await generateResponse(userInput);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="bg-gray-950 text-gray-100 h-screen w-[800px] sm:[500px] flex flex-col mx-auto md:p-4 sm:p-4 ">
      <div className="flex-1 overflow-y-auto space-y-4 flex flex-col ">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex p-3 rounded-2xl max-w-3xl${
              msg.type === "ai"
                ? "bg-gray-800 justify-start flex-col"
                : "bg-blue-600 justify-end"
            }`}
          >
            <div
              className={`text-sm opacity-75 ${
                msg.type === "ai" ? "flex-row  " : "flex-row-reverse "
              }`}
            >
              {msg.type === "ai"
                ? personas[msg.persona || "builder"]
                : "👤 You "}
            </div>
            <div className="mt-1 whitespace-pre-wrap">{msg.content}</div>

            {msg.code && (
              <pre className="bg-black text-green-400 p-2 mt-2 rounded-lg text-sm overflow-x-auto">
                {msg.code}
              </pre>
            )}

            {msg.executionResult && (
              <div className="mt-2 text-yellow-300">
                ⚡ API Response (truncated): <pre>{msg.executionResult}</pre>
              </div>
            )}
          </div>
        ))}
        {/* {isTyping && (
          <div className="p-3 rounded-2xl bg-gray-700 w-28 animate-pulse">
            Nemesis AI is typing...
          </div>
        )} */}
        {isTyping && <TypingIndicator />}
      </div>
      <div className="mt-4 flex">
        <input
          className="flex-1 p-2 rounded-l-xl bg-gray-800 text-gray-100 outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your move..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 px-4 rounded-r-xl hover:bg-blue-500"
        >
          Send
        </button>
      </div>
    </div>
    // <div className="flex flex-col h-full lg:px-52 md:p-10 sm:p-2 xm:p-0 glass rounded-xl border border-ai-border-subtle shadow-glass">
    //   {/* Header */}
    //   <div className="flex items-center gap-3 p-4 border-b border-ai-border-subtle">
    //     <div className="w-8 h-8 gradient-ai rounded-lg flex items-center justify-center animate-glow">
    //       <Sparkles className="w-4 h-4 text-white" />
    //     </div>
    //     <div className="flex-1">
    //       <h2 className="font-semibold text-foreground shimmer-text">
    //         AI Assistant
    //       </h2>
    //       <p className="text-sm text-muted-foreground">
    //         Your intelligent coding partner
    //       </p>
    //     </div>
    //     <div className="flex items-center gap-1">
    //       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
    //       <span className="text-xs text-green-500 font-medium">Online</span>
    //     </div>
    //   </div>

    //   <ScrollArea className="flex-1 p-4">
    //     <div className="space-y-6">
    //       {messages.map((message) => (
    //         <div
    //           key={message.id}
    //           className={`flex gap-3 message-enter ${
    //             message.type === "user" ? "justify-end" : "justify-start"
    //           }`}
    //         >
    //           <div
    //             className={`flex gap-3 max-w-[85%] ${
    //               message.type === "user" ? "flex-row-reverse" : "flex-row"
    //             }`}
    //           >
    //             <div
    //               className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
    //                 message.type === "user"
    //                   ? "bg-primary shadow-ai"
    //                   : "gradient-ai animate-float shadow-ai"
    //               }`}
    //             >
    //               {message.type === "user" ? (
    //                 <User className="w-4 h-4 text-primary-foreground" />
    //               ) : (
    //                 <Bot className="w-4 h-4 text-white" />
    //               )}
    //             </div>
    //             <div
    //               className={`rounded-xl p-4 shadow-glass ${
    //                 message.type === "user"
    //                   ? "bg-primary text-primary-foreground"
    //                   : "bg-ai-surface-elevated border border-ai-border-subtle"
    //               }`}
    //             >
    //               {message.type === "ai" && message.isTyping ? (
    //                 <SmartResponse content={message.content} />
    //               ) : (
    //                 <div className="text-sm leading-relaxed">
    //                   {message.content.split("**").map((part, index) =>
    //                     index % 2 === 1 ? (
    //                       <span
    //                         key={index}
    //                         className="font-semibold text-gradient"
    //                       >
    //                         {part}
    //                       </span>
    //                     ) : (
    //                       <span key={index}>{part}</span>
    //                     )
    //                   )}
    //                 </div>
    //               )}
    //               <div className="text-xs text-muted-foreground mt-2 opacity-70">
    //                 {message.timestamp.toLocaleTimeString([], {
    //                   hour: "2-digit",
    //                   minute: "2-digit",
    //                 })}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       ))}

    //       {isTyping && <TypingIndicator />}
    //     </div>
    //   </ScrollArea>

    //   <div className="p-4 border-t border-ai-border-subtle">
    //     <div className="flex gap-3">
    //       <div className="flex-1 relative">
    //         <Input
    //           value={inputValue}
    //           onChange={(e) => setInputValue(e.target.value)}
    //           onKeyPress={handleKeyPress}
    //           placeholder="Ask me anything about coding..."
    //           className="glass border-ai-border-subtle focus:ring-ai-purple pr-12 transition-all duration-300 focus:shadow-ai"
    //           disabled={isTyping}
    //         />
    //         <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
    //           <Lightbulb className="w-4 h-4 text-muted-foreground" />
    //         </div>
    //       </div>
    //       <Button
    //         onClick={handleSend}
    //         variant="default"
    //         size="icon"
    //         className="gradient-ai shadow-ai hover:animate-glow transition-all duration-300 disabled:opacity-50"
    //         disabled={isTyping || !inputValue.trim()}
    //       >
    //         {isTyping ? (
    //           <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
    //         ) : (
    //           <Send className="w-4 h-4" />
    //         )}
    //       </Button>
    //     </div>

    //     <div className="flex gap-2 mt-3">
    //       <Button
    //         variant="ghost"
    //         size="sm"
    //         className="text-xs gap-1 text-muted-foreground hover:text-ai-purple transition-colors"
    //         onClick={() => setInputValue("Create a React component")}
    //       >
    //         <Code className="w-3 h-3" />
    //         Component
    //       </Button>
    //       <Button
    //         variant="ghost"
    //         size="sm"
    //         className="text-xs gap-1 text-muted-foreground hover:text-ai-purple transition-colors"
    //         onClick={() => setInputValue("Add animations")}
    //       >
    //         <Zap className="w-3 h-3" />
    //         Animate
    //       </Button>
    //       <Button
    //         variant="ghost"
    //         size="sm"
    //         className="text-xs gap-1 text-muted-foreground hover:text-ai-purple transition-colors"
    //         onClick={() => setInputValue("Make it responsive")}
    //       >
    //         <Sparkles className="w-3 h-3" />
    //         Responsive
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ChatEngine2;
