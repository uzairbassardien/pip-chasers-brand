import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import songSrc from "../song/Lil Baby - Due 4A Win (Official Visualizer).mp3";

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;

    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // Autoplay may be blocked until the user interacts with the page.
        });
      }
    }
  }, [isMuted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.muted = !isMuted;
    audio.play().catch(() => {
      // Autoplay may be blocked until the user interacts with the page.
    });
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      <audio ref={audioRef} src={songSrc} loop preload="auto" />
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full border border-border bg-background/95 p-1 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-500 hover:text-blue-600 focus-visible:ring-blue-500"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          title={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? "🔇" : "🔊"}
        </Button>
      </div>
    </>
  );
};

export default AudioPlayer;
