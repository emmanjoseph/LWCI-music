"use client";

import { ChromaticImage } from "@/components/ui/chromatic-image";
import TextReveal from "@/components/ui/line-text-reveal";

const instruments = ["Piano", "Guitar", "Vocals", "Drums"]; // edit to match your courses

const leftFeatures = [
  {
    number: "01",
    title: "Private & group lessons",
    description:
        "Learn one-on-one with a dedicated teacher, or join a small group and grow alongside other students.",
  },
  {
    number: "02",
    title: "Your instrument, your teacher",
    description:
        "Choose what you want to play and we'll match you with the right teacher for it.",
  },
];

const rightFeatures = [
  {
    number: "03",
    title: "Every age, every level",
    description:
        "Kids, teens and adults are welcome, whether you're holding an instrument for the first time or sharpening years of practice.",
  },
  {
    number: "04",
    title: "Made for the stage",
    description:
        "Recitals and showcases give you a real audience to play for, and the confidence to enjoy it.",
  },
];

function Equalizer() {
  return (
      <>
        <style>{`
        @keyframes eq { from { transform: scaleY(.25) } to { transform: scaleY(1) } }
        @media (prefers-reduced-motion: reduce) { .eq-bar { animation: none !important } }
      `}</style>
        <span aria-hidden="true" className="flex h-4 items-end gap-0.5">
        {[0, 0.25, 0.5, 0.15].map((delay, i) => (
            <span
                key={i}
                className="eq-bar h-full w-0.5 origin-bottom rounded-full bg-[#9cae65]"
                style={{ animation: `eq .8s ease-in-out ${delay}s infinite alternate` }}
            />
        ))}
      </span>
      </>
  );
}

function FeatureColumn({ features }: { features: typeof leftFeatures }) {
  return (
      <dl className="grid h-full grid-rows-2 divide-y divide-black/10 dark:divide-white/10">
        {features.map((feature) => (
            <div
                key={feature.number}
                className="group relative flex min-h-48 flex-col justify-between gap-8 p-6 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.03] sm:p-8"
            >
              <span className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-[#9cae65] transition-transform duration-300 group-hover:scale-y-100" />
              <dt className="flex items-start justify-between gap-4">
                <span className="text-lg font-medium">{feature.title}</span>
                <span className="font-mono text-sm tracking-wide text-neutral-400 tabular-nums transition-colors group-hover:text-[#7d8f4a] dark:text-neutral-500">
              {feature.number}
            </span>
              </dt>
              <dd className="max-w-[40ch] text-pretty text-base/7 text-neutral-600 dark:text-neutral-400 sm:text-sm/6">
                {feature.description}
              </dd>
            </div>
        ))}
      </dl>
  );
}

export default function Features() {
  return (
      <div className="container mx-auto px-4 pb-14">
        <section className="overflow-hidden rounded-3xl bg-white text-neutral-950 outline-1 -outline-offset-1 outline-black/10 dark:bg-neutral-900 dark:text-neutral-50 dark:outline-white/10">
          {/* Header */}
          <div className="flex flex-col gap-6 border-b border-black/10 p-6 dark:border-white/10 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="flex items-center gap-3 font-mono text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
                <Equalizer />
                Music lessons for every age
              </p>
              <TextReveal
                  as="h3"
                  mode="lines"
                  blockColor="#9cae65"
                  text="Find your sound, one lesson at a time"
                  className="max-w-[20ch] pt-3 text-3xl font-medium tracking-tight sm:text-4xl"
              />
            </div>

            <ul className="flex flex-wrap gap-2">
              {instruments.map((name) => (
                  <li
                      key={name}
                      className="rounded-full border border-black/10 px-3 py-1 text-sm text-neutral-600 dark:border-white/10 dark:text-neutral-300"
                  >
                    {name}
                  </li>
              ))}
            </ul>
          </div>

          {/* Features + image */}
          <div className="grid lg:grid-cols-[3fr_4fr_3fr]">
            <div className="order-2 border-black/10 dark:border-white/10 lg:order-1 lg:border-r">
              <FeatureColumn features={leftFeatures} />
            </div>

            <div className="relative order-1 lg:order-2">
              <ChromaticImage
                  src="https://images.unsplash.com/photo-1525183480399-e8706926adac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" // swap for a real photo of your students or studio
                  alt="Students learning music at the school"
                  backgroundColor="#9cae65"
                  zoom={0.14}
                  displacement={0.035}
                  chromaticShift={0.009}
                  tilt={0.14}
                  className="aspect-[4/5] h-full min-h-96 w-full bg-stone-300 dark:bg-neutral-800 lg:aspect-auto lg:min-h-[42rem]"
              />
              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-neutral-900 backdrop-blur dark:bg-neutral-900/70 dark:text-neutral-50">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#9cae65] opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-[#7d8f4a]" />
              </span>
                Now enrolling
              </div>
            </div>

            <div className="order-3 border-t border-black/10 dark:border-white/10 lg:border-t-0 lg:border-l">
              <FeatureColumn features={rightFeatures} />
            </div>
          </div>

          {/* CTA bar */}
          <div className="flex flex-col gap-4 border-t border-black/10 p-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="max-w-[48ch] text-pretty text-base/7 text-neutral-600 dark:text-neutral-400 sm:text-sm/6">
              Not sure which instrument fits you? Tell us what you like to listen to and we'll point you
              in the right direction.
            </p>
            <a
                href="#enroll"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.03] active:scale-95 dark:bg-white dark:text-neutral-950"
            >
              Enroll today
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </div>
  );
}