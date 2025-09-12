import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 justify-start message-enter">
      <div className="w-8 h-8 gradient-ai rounded-full flex items-center justify-center animate-float">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="ai-thinking">
        <span className="text-sm text-muted-foreground">AI is thinking</span>
        <div className="ai-thinking-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;

// import { Bot } from "lucide-react";

// const TypingIndicator = () => {
//   return (
//     <div className="m-0 top-0 flex w-full h-full gap-3 justify-center items-center">
//       {/* <div className="w-8 h-8 gradient-ai rounded-full flex items-center justify-center animate-float">
//         <Bot className="w-4 h-4 text-white" />
//       </div> */}
//       <div className="ai-thinking">
//         <span className="text-sm text-muted-foreground">AI is thinking</span>
//         <div className="ai-thinking-dots w-24 ">
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TypingIndicator;
