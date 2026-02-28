import { motion } from "framer-motion";
import MagicButton from "../MagicButton";

interface VideoScreenProps {
  onReplay: () => void;
}

const VideoScreen = ({ onReplay }: VideoScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 gradient-romantic flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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

        {/* Meme Images */}
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
      <div className="relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-400 bg-black z-10" style={{ minHeight: '220px' }}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/8QQCMvRI_oI?autoplay=1&modestbranding=1&rel=0&showinfo=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full min-h-[220px] md:min-h-[400px] lg:min-h-[500px]"
          style={{ aspectRatio: '16/9' }}
        ></iframe>
      </div>
      <h2 className="text-2xl md:text-4xl font-romantic text-center mt-8 mb-4 glow-text-pink z-10">
        <span className="bg-gradient-to-r from-primary via-soft-pink to-accent bg-clip-text text-transparent">
          Special Video Surprise!
        </span>
      </h2>
      <MagicButton onClick={onReplay} delay={1.2}>
        Replay Experience 🔁
      </MagicButton>
    </motion.div>
  );
};

export default VideoScreen;
