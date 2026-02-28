import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


import { useEffect, useRef, useState } from "react";

const GlobalAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const playAudio = () => {
      setUserInteracted(true);
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 10;
        audio.play();
        setPlaying(true);
      }
      window.removeEventListener("pointerdown", playAudio);
      window.removeEventListener("keydown", playAudio);
    };
    window.addEventListener("pointerdown", playAudio);
    window.addEventListener("keydown", playAudio);
    return () => {
      window.removeEventListener("pointerdown", playAudio);
      window.removeEventListener("keydown", playAudio);
    };
  }, []);

  // Replay after ending
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      audio.currentTime = 10;
      audio.play();
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Play/pause control
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/songs/1st.m4a"
        preload="auto"
        style={{ display: "none" }}
      />
      {/* Floating Play/Pause Button */}
      {userInteracted && (
        <button
          onClick={togglePlay}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
            background: playing ? "#f472b6" : "#a3a3a3",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 56,
            height: 56,
            boxShadow: "0 2px 12px #0002",
            fontSize: 28,
            cursor: "pointer",
            transition: "background 0.2s"
          }}
          aria-label={playing ? "Pause song" : "Play song"}
        >
          {playing ? "❚❚" : "▶"}
        </button>
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GlobalAudio />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
