"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import TextReveal from "@/components/ui/line-text-reveal";
import Link from "next/link";

// Put real photos in /public/gallery (students, instruments, studio, recitals)
const photos = [
  "https://images.unsplash.com/photo-1636464808108-644053e72420?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1720749252258-3c4002253c96?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "https://images.unsplash.com/photo-1655891182838-bbb0596a1d2d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1786207469194-56a839006771?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1608319917470-9d9179430f8d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "https://images.unsplash.com/photo-1780838987930-e45e54b67453?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1786729950808-a99b4f85e276?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1645336745172-28aab41f5c53?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "https://plus.unsplash.com/premium_photo-1661715171685-82221f29bf2f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "https://images.unsplash.com/photo-1643240150868-5c4e1834ff75?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "https://images.unsplash.com/photo-1608860911268-dc47b06862e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"


];

// The marquee wants ~30 tiles. The ?v= keeps every src unique, so no duplicate-key warnings.
const images = Array.from(
    { length: 32 },
    (_, i) => `${photos[i % photos.length]}?v=${i}`
);

export default function ContactCta() {
  return (
      <div className="relative flex h-[40rem] w-full flex-col items-center justify-center overflow-hidden bg-black px-4">
        <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center text-center text-white">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#9cae65] opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-[#9cae65]" />
          </span>
          Now enrolling
        </span>

          <TextReveal
              as="h3"
              mode="lines"
              blockColor="#9cae65"
              text="Find your sound, one lesson at a time"
              className="mx-auto max-w-[20ch] text-center text-3xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl"
          />
        </div>

        <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
          Piano, guitar, vocals and drums for kids, teens and adults. Whether it's your first note or
          your next stage, there's a teacher and a lesson that fits you.
        </p>

        <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
              href="/enroll"
              className="rounded-full bg-[#9cae65] px-6 py-2.5 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.03] focus:ring-2 focus:ring-[#9cae65] focus:ring-offset-2 focus:ring-offset-black focus:outline-none active:scale-95"
          >
            Enroll today
          </Link>
          <a
              href="https://wa.me/254700000000?text=Hello%2C%20I%27d%20like%20to%20ask%20about%20music%20lessons"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* overlay: dark tint plus a vignette so the text stays readable over busy photos */}
        <div className="absolute inset-0 z-10 h-full w-full bg-black/55" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

        <ThreeDMarquee
            className="pointer-events-none absolute inset-0 h-full w-full"
            images={images}
        />
      </div>
  );
}