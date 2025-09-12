import React, { useState } from "react";

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
};

// --- Core Chat Engine ---
const ChatEngine = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "🔥 Welcome challenger! I’m **Nemesis AI**, designed to test and refine your ideas. I don’t just answer… I fight back, optimize, and sharpen your thinking. Shall we begin?",
      timestamp: new Date(),
      persona: "challenger",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // --- Intent Classification ---
  const classifyIntent = (input: string): keyof typeof personas => {
    if (input.match(/(teach|learn|explain|guide)/i)) return "mentor";
    if (input.match(/(wrong|fail|prove|challenge|battle)/i))
      return "challenger";
    if (input.match(/(code|build|make|implement|run|execute)/i))
      return "builder";
    if (input.match(/(review|audit|security|test|bug|flaw)/i)) return "critic";
    return ["mentor", "challenger", "builder", "critic"][
      Math.floor(Math.random() * 4)
    ] as keyof typeof personas;
  };

  // --- Code Sandbox (for builder persona) ---
  const runCode = (code: string): string => {
    try {
      // ⚠️ Only safe for demo — in production, use a secure sandbox
      const result = eval(code);
      return String(result);
    } catch (err: any) {
      return `❌ Error: ${err.message}`;
    }
  };

  // --- Generate Nemesis AI Responses ---
  const generateResponse = (userInput: string): Message => {
    const persona = classifyIntent(userInput);

    if (persona === "builder") {
      const codeSnippet = `(() => {
  const nums = [1, 2, 3, 4];
  return nums.map(n => n * 2);
})();`;

      return {
        id: Date.now().toString(),
        type: "ai",
        content: `🔨 I’ll **build proof**: doubling an array of numbers.`,
        timestamp: new Date(),
        persona,
        code: codeSnippet,
        executionResult: runCode(codeSnippet),
      };
    }

    const responses = {
      mentor: `🧙 Let me **teach**: "${userInput}" works best if you break it into fundamentals.`,
      challenger: `⚔️ Bold claim! But is "${userInput}" truly correct? Prove it, or I’ll dismantle it.`,
      critic: `🕵️ I see **flaws** in "${userInput}". Let’s expose weaknesses and fix them.`,
    };

    return {
      id: Date.now().toString(),
      type: "ai",
      content: responses[persona],
      timestamp: new Date(),
      persona,
    };
  };

  // --- Handle User Sending Message ---
  const handleSend = () => {
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

    setTimeout(() => {
      const aiResponse = generateResponse(userInput);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  // --- UI ---
  return (
    <div className="p-4 bg-gray-950 text-gray-100 h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-2xl max-w-xl ${
              msg.type === "ai"
                ? "bg-gray-800 self-start"
                : "bg-blue-600 self-end"
            }`}
          >
            <div className="text-sm opacity-75">
              {msg.type === "ai"
                ? personas[msg.persona || "builder"]
                : "👤 You"}
            </div>
            <div className="mt-1 whitespace-pre-wrap">{msg.content}</div>

            {msg.code && (
              <pre className="bg-black text-green-400 p-2 mt-2 rounded-lg text-sm overflow-x-auto">
                {msg.code}
              </pre>
            )}

            {msg.executionResult && (
              <div className="mt-2 text-yellow-300">
                ⚡ Execution Result: {msg.executionResult}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="p-3 rounded-2xl bg-gray-700 w-28 animate-pulse">
            Nemesis AI is typing...
          </div>
        )}
      </div>

      <div className="mt-4 flex">
        <input
          className="flex-1 p-2 rounded-l-xl bg-gray-800 text-gray-100 outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
  );
};

export default ChatEngine;
