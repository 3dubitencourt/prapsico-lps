"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { PlayCircle } from "lucide-react";
import {
  CHAPTER_SEEK_EVENT,
  VIMEO_VIDEO_ID,
} from "./constants";
import {
  trackPlayReplay,
  trackReplayProgress,
  trackReplayQualifiedLead,
} from "@/lib/tracking";

type VimeoPlayerInstance = {
  on: (event: string, cb: (data: { seconds?: number; duration?: number; percent?: number }) => void) => void;
  setCurrentTime: (seconds: number) => Promise<number>;
  ready: () => Promise<void>;
};

declare global {
  interface Window {
    Vimeo?: {
      Player: new (
        el: HTMLIFrameElement | string,
      ) => VimeoPlayerInstance;
    };
  }
}

export function VimeoPlayer({ videoId }: { videoId?: string }) {
  const vimeoId = videoId ?? VIMEO_VIDEO_ID;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<VimeoPlayerInstance | null>(null);
  const milestonesFired = useRef({ p25: false, p50: false, p75: false, complete: false, qualified: false });

  const initPlayer = () => {
    if (!iframeRef.current || !window.Vimeo) return;
    if (playerRef.current) return;

    const player = new window.Vimeo.Player(iframeRef.current);
    playerRef.current = player;

    player.on("play", () => {
      trackPlayReplay();
    });

    player.on("timeupdate", (data) => {
      const percent = data.percent ?? 0;
      const seconds = data.seconds ?? 0;
      const m = milestonesFired.current;
      if (!m.p25 && percent >= 0.25) {
        m.p25 = true;
        trackReplayProgress("25%");
      }
      if (!m.p50 && percent >= 0.5) {
        m.p50 = true;
        trackReplayProgress("50%");
      }
      if (!m.p75 && percent >= 0.75) {
        m.p75 = true;
        trackReplayProgress("75%");
      }
      if (!m.qualified && seconds >= 1800) {
        m.qualified = true;
        trackReplayQualifiedLead();
      }
    });

    player.on("ended", () => {
      if (!milestonesFired.current.complete) {
        milestonesFired.current.complete = true;
        trackReplayProgress("complete");
      }
    });
  };

  useEffect(() => {
    const handleSeek = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      if (typeof detail !== "number" || !playerRef.current) return;
      playerRef.current
        .ready()
        .then(() => playerRef.current?.setCurrentTime(detail))
        .catch(() => {});
      iframeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener(CHAPTER_SEEK_EVENT, handleSeek as EventListener);
    return () => window.removeEventListener(CHAPTER_SEEK_EVENT, handleSeek as EventListener);
  }, []);

  if (!vimeoId) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-dashed border-cyan/30 bg-navy-900 aspect-video flex flex-col items-center justify-center text-center px-6">
        <PlayCircle className="w-16 h-16 md:w-20 md:h-20 text-cyan/60 mb-5" strokeWidth={1.25} aria-hidden />
        <p className="eyebrow mb-3">Player do replay</p>
        <p className="text-ink text-base md:text-lg font-medium mb-2">
          Plugar o vídeo aqui quando estiver pronto.
        </p>
        <p className="text-subtle text-xs md:text-sm font-mono">
          components/sections/replay/constants.ts · VIMEO_VIDEO_ID
        </p>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://player.vimeo.com/api/player.js"
        strategy="afterInteractive"
        onLoad={initPlayer}
        onReady={initPlayer}
      />
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&dnt=1`}
          title="Replay · Aula ao vivo · Psicólogo Paulo de Tarso"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </>
  );
}
