// import React from "react";

// const TypingIndicator2 = () => {
//   return (
//     <div className="fixed inset-0 bg-white opacity-30 flex items-center justify-center ">
//       {" "}
//       <div className="flex items-center justify-center gap-3 ai-thinking-dots">
//         {" "}
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//     </div>
//   );
// };

// export default TypingIndicator2;

// inset-0 does the magic after fixing the page the /inset-0/ = /top-0 bottom-0 left-0 right-0/
import React from "react";

const TypingIndicator2 = () => {
  return (
    <div className="fixed inset-0 bg-white opacity-30 flex items-center justify-center z-50">
      <div className="flex items-center justify-center gap-3 ">
        <span className="w-3 h-3 rounded-full bg-black animate-bounce"></span>
        <span className="w-3 h-3 rounded-full bg-black animate-bounce delay-150"></span>
        <span className="w-3 h-3 rounded-full bg-black animate-bounce delay-300"></span>
      </div>
    </div>
  );
};

export default TypingIndicator2;
