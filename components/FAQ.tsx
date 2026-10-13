"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import TextReveal from "@/components/ui/line-text-reveal";

const questions = [
    {
        question: "Do I need any music experience to start?",
        answer: "No experience needed. Whether you're learning your first notes or building on what you already know, lessons can start at your level and work towards your goals.",
    },
    {
        question: "Which instruments can I learn?",
        answer: "Explore piano, guitar, vocals and drums. If you're unsure where to begin, tell us what music you love and we can help you choose.",
    },
    {
        question: "Are lessons available for children and adults?",
        answer: "Yes! Kids, teens and adults are welcome. Get in touch to discuss the right starting point for your age, experience and interests.",
    },
    {
        question: "Can I choose private or group lessons?",
        answer: "We offer both private and group lessons. Learn one-on-one with a teacher or grow alongside other students in a small group. Contact us to explore the available options.",
    },
    {
        question: "Do I need to bring my own instrument?",
        answer: "Before your first lesson, check with us about what to bring and which instruments are available. Your teacher can also guide you on a suitable instrument for practice at home.",
    },
    {
        question: "How do I find out about fees and lesson times?",
        answer: "Get in touch with your preferred instrument and availability. We'll share the current fees and lesson options so you can choose what works for you.",
    },
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const id = useId();
    const reduceMotion = useReducedMotion();

    return (
        <section aria-labelledby={`${id}-heading`} className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
            <div id={`${id}-heading`}>
            <TextReveal
                as="h2"
                mode="lines"
                blockColor="#9cae65"
                text="Got questions? We've got answers."
                className="mx-auto max-w-[20ch] text-center text-3xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl"
            />
            </div>
            <p className="mx-auto mt-5 max-w-lg text-center text-base/7 text-muted-foreground">
                Curious about getting started? Here&apos;s what to know before your first lesson.
            </p>

            <div className="mt-12 divide-y divide-border border-y border-border">
                {questions.map(({ question, answer }, index) => {
                    const isOpen = openIndex === index;
                    const triggerId = `${id}-trigger-${index}`;
                    const panelId = `${id}-panel-${index}`;

                    return (
                        <div key={question}>
                            <h3>
                                <button
                                    id={triggerId}
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="group flex w-full items-center justify-between gap-6 rounded-lg py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:py-7"
                                >
                                    <span className="text-base font-medium sm:text-lg">{question}</span>
                                    <motion.span
                                        aria-hidden="true"
                                        animate={{ rotate: isOpen ? 45 : 0 }}
                                        transition={{ duration: reduceMotion ? 0 : 0.2 }}
                                        className={`flex size-9 shrink-0 items-center justify-center rounded-full ${isOpen ? "bg-[#9cae65]" : "bg-black/5 group-hover:bg-black/10"}`}
                                    >
                                        <Plus className="size-4" />
                                    </motion.span>
                                </button>
                            </h3>
                            <motion.div
                                id={panelId}
                                role="region"
                                aria-labelledby={triggerId}
                                aria-hidden={!isOpen}
                                inert={!isOpen}
                                initial={false}
                                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                                transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                            >
                                <p className="max-w-3xl pb-7 pr-12 text-sm/7 text-muted-foreground sm:text-base/7">
                                    {answer}
                                </p>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}
export default Faq
