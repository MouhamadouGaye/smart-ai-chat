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
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(content.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30 + Math.random() * 30); // Variable typing speed for more natural feel

      return () => clearTimeout(timer);
    } else if (!isComplete) {
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