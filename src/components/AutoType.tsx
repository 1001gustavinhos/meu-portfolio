"use client";
import { useEffect, useState } from "react";

interface AutoTypeProps {
  phrases?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBetween?: number;
  className?: string;
  cursorColor?: string;
}

export const AutoType = ({
  phrases = [
    "Desenvolvedor Web/Mobile",
    "Designer gráfico",
    "Biólogo de apartamento",
  ],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseBetween = 1000,
  className = "",
  cursorColor = "bg-foreground",
}: AutoTypeProps) => {
  const [currentText, setCurrentText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const currentPhrase = phrases[currentPhraseIndex];

    const handleTyping = () => {
      if (isTyping) {
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => {
            setIsTyping(false);
            setIsDeleting(true);
          }, pauseBetween);
        }
      } else if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          setIsTyping(true);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [
    currentText,
    currentPhraseIndex,
    isTyping,
    isDeleting,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseBetween,
  ]);

  return (
    <div
      className={`inline-flex items-center h-12 overflow-hidden ${className}`}
    >
      <span>{currentText}</span>
      <span className={`ml-1 h-8 w-1 ${cursorColor} animate-pulse`} />
    </div>
  );
};
