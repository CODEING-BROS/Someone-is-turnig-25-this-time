import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import FloatingHearts from "../FloatingHearts";
import Sparkles from "../Sparkles";
import MagicButton from "../MagicButton";

interface CakeScreenProps {
  onNext: () => void;
}

const CakeScreen = ({ onNext }: CakeScreenProps) => {
  const [step, setStep] = useState<
    "appear" | "decorate" | "candle" | "complete"
  >("appear");

  const triggerConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      colors: ["#ff6b9d", "#a855f7", "#ffd700", "#00ffff", "#ff0000"],
    });
  };

  const handleDecorate = () => setStep("decorate");

  const handleLightCandle = () => {
    triggerConfetti();
    setStep("candle");
    setTimeout(() => setStep("complete"), 1500);
  };

  return (
    <motion.div
      className="fixed inset-0 gradient-romantic flex flex-col items-center justify-center px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dark Theme Effects */}
      <FloatingHearts count={8} />
      <Sparkles count={10} />

      {/* ---------------- BACKGROUND MEMES ---------------- */}
      <div className="absolute inset-0 pointer-events-none z-0">

        {/* Floating Emojis */}
        {["💩", "🧓", "😂", "🪦", "🧦", "🐒"].map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
            }}
            animate={{ y: [0, -25, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity }}
          >
            {emoji}
          </motion.span>
        ))}

        {/* YOUR MEME IMAGES */}
        {[
          "/meme/1.jpeg",
          "/meme/2.jpeg",
          "/meme/3.jpeg",
          "/meme/4.jpg",
          "/meme/5.jpeg",
        ].map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt="meme"
            className="absolute w-20 md:w-28 opacity-25 rounded-xl shadow-lg"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* ---------------- CAKE ---------------- */}
      <div className="relative w-72 h-80 md:w-96 md:h-96 z-10">
        <motion.svg
          viewBox="0 0 200 220"
          className="w-full h-full"
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          {/* Plate */}
          <ellipse cx="100" cy="210" rx="90" ry="10" fill="#2d1b4e" />

          {/* Bottom Layer */}
          <rect x="20" y="150" width="160" height="60" rx="14" fill="#7c3aed" />

          {/* Middle Layer */}
          <rect x="35" y="100" width="130" height="55" rx="12" fill="#a855f7" />

          {/* Top Layer */}
          <rect x="50" y="60" width="100" height="45" rx="10" fill="#ff6b9d" />

          {/* ================= BANNER ================= */}
          {step !== "appear" && (
            <motion.g
              animate={{ rotate: [0, 1, -1, 0] }}
              style={{ originX: "100px", originY: "60px" }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {/* Stick attached to cake */}
              <rect
                x="98"
                y="25"
                width="4"
                height="35"
                fill="#6b4226"
                rx="2"
              />

              {/* Shadow */}
              <rect
                x="55"
                y="5"
                width="90"
                height="32"
                rx="6"
                fill="rgba(0,0,0,0.3)"
              />

              {/* Banner Rectangle */}
              <rect
                x="55"
                y="2"
                width="90"
                height="40"
                rx="6"
                fill="#ff1744"
                stroke="#ffffff"
                strokeWidth="2"
              />

              {/* Line 1 */}
              <text
                x="100"
                y="16"
                textAnchor="middle"
                fontSize="9"
                fill="#ffffff"
                fontWeight="bold"
              >
                SHIT!
              </text>

              {/* Line 2 */}
              <text
                x="100"
                y="26"
                textAnchor="middle"
                fontSize="9"
                fill="#ffffff"
                fontWeight="bold"
              >
                YOU ARE OLD 😂
              </text>
            </motion.g>
          )}

          {/* ================= POOPS TOP ================= */}
          {[65, 80, 95, 110].map((x, i) => (
            <motion.text
              key={"top" + i}
              x={x}
              y="55"
              fontSize="16"
              initial={{ scale: 0 }}
              animate={{ scale: step !== "appear" ? 1 : 0 }}
              transition={{ delay: i * 0.1 }}
            >
              💩
            </motion.text>
          ))}

          {/* ================= POOPS MIDDLE ================= */}
          {[55, 75, 95, 115].map((x, i) => (
            <motion.text
              key={"mid" + i}
              x={x}
              y="95"
              fontSize="16"
              initial={{ scale: 0 }}
              animate={{ scale: step !== "appear" ? 1 : 0 }}
              transition={{ delay: i * 0.15 }}
            >
              💩
            </motion.text>
          ))}

          {/* ================= POOPS BOTTOM ================= */}
          {[40, 65, 90, 115, 140].map((x, i) => (
            <motion.text
              key={"bot" + i}
              x={x}
              y="145"
              fontSize="16"
              initial={{ scale: 0 }}
              animate={{ scale: step !== "appear" ? 1 : 0 }}
              transition={{ delay: i * 0.2 }}
            >
              💩
            </motion.text>
          ))}

          {/* Candle */}
          <rect x="95" y="35" width="10" height="30" fill="#ffffff" rx="2" />

          {/* Flame */}
          {(step === "candle" || step === "complete") && (
            <motion.circle
              cx="100"
              cy="30"
              r="8"
              fill="orange"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
          )}
        </motion.svg>
      </div>

      {/* FINAL MESSAGE */}
      {/* <AnimatePresence>
        {step === "complete" && (
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-center mt-6 glow-text-pink"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Happy Birthday Bro 😈 <br />
            Uncle Mode Activated 🧓
          </motion.h1>
        )}
      </AnimatePresence> */}

      {/* BUTTONS */}
      <div className="mt-8 z-10">
        <AnimatePresence mode="wait">
          {step === "appear" && (
            <MagicButton key="decorate" onClick={handleDecorate}>
              Decorate The Cake 😈
            </MagicButton>
          )}

          {step === "decorate" && (
            <MagicButton key="light" onClick={handleLightCandle}>
              Light It & Roast 🔥
            </MagicButton>
          )}

          {step === "complete" && (
            <MagicButton key="next" onClick={onNext}>
              Continue The Roast 💀
            </MagicButton>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CakeScreen;