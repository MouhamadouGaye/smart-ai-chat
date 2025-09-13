import { useState, useEffect } from "react";

interface SmartResponseProps {
  content: string;
  onComplete?: () => void;
}

const SmartResponse = ({ content, onComplete }: SmartResponseProps) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex <= content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(content.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, 30 + Math.random() * 30); // Variable typing speed

      return () => clearTimeout(timer);
    }

    if (currentIndex > content.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, content, isComplete, onComplete]);

  return (
    <div className="text-sm leading-relaxed">
      <span>{displayedContent}</span>
      {!isComplete && (
        <span className="inline-block w-2 h-5 bg-ai-purple animate-typing ml-1 rounded-sm"></span>
      )}
    </div>
  );
};

export default SmartResponse;
// import React, { useEffect, useRef, useState } from "react";

// type SmartResponseProps = {
//   content: string;
//   loop?: boolean; // default false => type once
//   typingSpeed?: number; // base ms per char
//   variance?: number; // +0..variance ms random
//   pause?: number; // pause at end/start (ms)
//   onFinish?: () => void; // optional: notify parent when done (non-loop)
// };

// export default function SmartResponse({
//   content,
//   loop = false,
//   typingSpeed = 30,
//   variance = 30,
//   pause = 800,
//   onFinish,
// }: SmartResponseProps) {
//   const [index, setIndex] = useState(0); // number of visible chars
//   const [direction, setDirection] = useState<1 | -1>(1); // 1 = typing, -1 = deleting
//   const timerRef = useRef<number | null>(null);

//   const randDelay = () => typingSpeed + Math.floor(Math.random() * variance);

//   // Reset when content changes (start fresh)
//   useEffect(() => {
//     setIndex(0);
//     setDirection(1);
//     if (timerRef.current) {
//       window.clearTimeout(timerRef.current);
//       timerRef.current = null;
//     }
//   }, [content]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (timerRef.current) window.clearTimeout(timerRef.current);
//     };
//   }, []);

//   // Main typing loop effect
//   useEffect(() => {
//     // Non-loop mode: type once then call onFinish
//     if (!loop) {
//       if (index < content.length) {
//         timerRef.current = window.setTimeout(() => {
//           setIndex((i) => i + 1);
//         }, randDelay());
//       } else {
//         onFinish?.();
//       }
//       return () => {
//         if (timerRef.current) window.clearTimeout(timerRef.current);
//       };
//     }

//     // Loop mode: type -> pause -> delete -> pause -> repeat
//     if (direction === 1) {
//       // typing forward
//       if (index < content.length) {
//         timerRef.current = window.setTimeout(
//           () => setIndex((i) => i + 1),
//           randDelay()
//         );
//       } else {
//         // reached end -> pause then delete
//         timerRef.current = window.setTimeout(() => setDirection(-1), pause);
//       }
//     } else {
//       // deleting backwards
//       if (index > 0) {
//         timerRef.current = window.setTimeout(
//           () => setIndex((i) => i - 1),
//           randDelay()
//         );
//       } else {
//         // reached 0 -> pause then type again
//         timerRef.current = window.setTimeout(() => setDirection(1), pause);
//       }
//     }

//     return () => {
//       if (timerRef.current) window.clearTimeout(timerRef.current);
//     };
//   }, [index, direction, content, loop, typingSpeed, variance, pause, onFinish]);

//   const displayed = content.slice(0, index);

//   return (
//     <div className="text-sm leading-relaxed">
//       <span>{displayed}</span>
//       <span className="inline-block ml-1 animate-pulse">|</span>
//     </div>
//   );
// }
