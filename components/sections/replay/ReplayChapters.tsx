"use client";

import { Play } from "lucide-react";
import { CHAPTERS, CHAPTER_SEEK_EVENT, formatChapterTime } from "./constants";
import { trackChapterSeek } from "@/lib/tracking";

export function ReplayChapters() {
  const handleSeek = (time: number, label: string) => {
    window.dispatchEvent(new CustomEvent(CHAPTER_SEEK_EVENT, { detail: time }));
    trackChapterSeek(label);
  };

  return (
    <section className="py-20 md:py-28 bg-navy-900 border-y border-white/5">
      <div className="container-lp max-w-3xl">
        <h2 className="text-2xl md:text-4xl font-bold leading-tight text-center mb-3 text-balance">
          Capítulos da live
        </h2>
        <p className="text-center text-muted text-sm md:text-base mb-10">
          Clique no trecho e o vídeo pula pra lá.
        </p>

        <ul className="space-y-2">
          {CHAPTERS.map((chapter) => (
            <li key={chapter.time}>
              <button
                type="button"
                onClick={() => handleSeek(chapter.time, chapter.label)}
                className="group w-full flex items-center gap-4 rounded-xl bg-navy-950 border border-white/5 hover:border-cyan/30 px-5 py-4 text-left transition-colors"
              >
                <Play
                  className="w-4 h-4 text-cyan shrink-0 group-hover:scale-110 transition-transform"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="font-mono text-xs md:text-sm text-cyan tabular-nums shrink-0">
                  {formatChapterTime(chapter.time)}
                </span>
                <span className="text-muted group-hover:text-ink text-sm md:text-base">
                  {chapter.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
