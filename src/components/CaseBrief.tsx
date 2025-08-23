import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, Variants, easeOut } from "framer-motion";
import { ScrollingLogo } from "./ScrollingLogo";

interface CaseBriefProps {
  onAcceptMission: () => void;
}

export function CaseBrief({ onAcceptMission }: CaseBriefProps) {
  const [showButton, setShowButton] = useState(false);

  const paragraphs = [
    "Last night at 02:13 AM, Falcon Corp suffered a data breach. Their research on an advanced AI defense system, codenamed Black Ice, was stolen. The attackers left almost no trace… almost.",
    "Your task: uncover who is behind the breach, how they got in, and what their real motive was. Suspects may be insiders—but nothing is what it seems.",
    "Time is limited. Proceed to evidence."
  ];

  useEffect(() => {
    const totalChars = paragraphs.join("").length;
    const totalDuration = totalChars * 30; // 30ms per char
    const timer = setTimeout(() => setShowButton(true), totalDuration + 1000);
    return () => clearTimeout(timer);
  }, []);

  const letterAnim: Variants = {
    hidden: { opacity: 0, y: "0.25em" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.05,
        ease: easeOut
      }
    })
  };

  const getGlobalChars = () => {
    let index = 0;
    return paragraphs.map((para, pi) => {
      const chars = para.split("").map((char) => {
        const obj = { char, globalIndex: index };
        index++;
        return obj;
      });
      return { paraIndex: pi, chars };
    });
  };

  const paraChars = getGlobalChars();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative cyber-grid px-4">
      <ScrollingLogo />
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold bg-gradient-to-r from-primary to-forensic-red bg-clip-text text-transparent">
            CASE BRIEF
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-primary to-forensic-red mx-auto"></div>
        </div>

        {/* Paragraphs */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 md:p-8 space-y-6 min-h-[400px] flex flex-col justify-center">
          {paraChars.map((p) => (
            <motion.p
              key={p.paraIndex}
              className="text-base md:text-lg leading-relaxed text-justify"
              initial="hidden"
              animate="visible"
            >
              {p.chars.map(({ char, globalIndex }) => (
                <motion.span
                  key={p.paraIndex + "-" + globalIndex}
                  custom={globalIndex}
                  variants={letterAnim}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
          ))}
        </div>

        {/* Accept Button */}
        {showButton && (
          <div className="text-center">
            <Button
              onClick={() => {
                try {
                  // store the click timestamp (ms since epoch) as startTime
                  localStorage.setItem("startTime", String(Date.now()));
                } catch (e) {
                  // ignore storage errors (e.g., private mode) and proceed
                }
                onAcceptMission();
              }}
              size="lg"
              className="font-orbitron font-semibold text-lg px-8 py-4 glow-primary hover:glow-primary transition-all duration-300"
            >
              Accept Mission
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
