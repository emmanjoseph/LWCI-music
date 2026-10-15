"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function CoursesGrid() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-100">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-125  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="container mx-auto w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 items-start gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col  w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full  rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
    {
        title: "Piano",
        description: "Learn keys, chords, and musical expression.",
        src: "https://images.unsplash.com/photo-1561014816-50ce5acb5e73?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        ctaText: "Apply Now",
        ctaLink: "/apply?course=piano",
        content: () => (
            <p>
                Learn piano from the fundamentals to more advanced techniques.
                Develop your skills in reading music, playing chords, coordinating
                both hands, and performing your favourite pieces. Suitable for
                beginners and learners looking to improve their playing.
            </p>
        ),
    },
    {
        title: "Solo Guitar",
        description: "Master lead guitar and solo performance.",
        src: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        ctaText: "Apply Now",
        ctaLink: "/apply?course=solo-guitar",
        content: () => (
            <p>
                Develop lead guitar skills, scales, improvisation, melody,
                and solo techniques. Learn how to express yourself through
                guitar solos while building timing, accuracy, and confidence.
            </p>
        ),
    },
    {
        title: "Bass Guitar",
        description: "Build rhythm, groove, and bass techniques.",
        src: "https://images.unsplash.com/photo-1543060749-aa3f115aad09?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        ctaText: "Apply Now",
        ctaLink: "/apply?course=bass-guitar",
        content: () => (
            <p>
                Learn bass guitar fundamentals, rhythmic patterns, scales,
                groove, and techniques for playing with other musicians.
                Build a solid understanding of how bass supports harmony
                and rhythm in a band.
            </p>
        ),
    },
    {
        title: "Acoustic Guitar",
        description: "Learn chords, strumming, and fingerstyle.",
        src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        ctaText: "Apply Now",
        ctaLink: "/apply?course=acoustic-guitar",
        content: () => (
            <p>
                Learn acoustic guitar chords, strumming patterns, fingerpicking,
                and song accompaniment. Build your skills progressively, whether
                you are picking up a guitar for the first time or refining
                your existing playing.
            </p>
        ),
    },
    {
        title: "Vocal Training",
        description: "Develop your voice, pitch, and control.",
        src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        ctaText: "Apply Now",
        ctaLink: "/apply?course=vocals",
        content: () => (
            <p>
                Develop vocal technique, pitch accuracy, breath control,
                diction, and expressive singing. Learn how to use your voice
                confidently and improve your performance through guided practice.
            </p>
        ),
    },
    {
        title: "Drums",
        description: "Learn beats, timing, and percussion techniques.",
        src: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        ctaText: "Apply Now",
        ctaLink: "/apply?course=drums",
        content: () => (
            <p>
                Learn drum fundamentals, basic beats, fills, coordination,
                and rhythmic patterns. Develop timing and control while
                building the skills needed to play along with different
                musical styles.
            </p>
        ),
    },
];
