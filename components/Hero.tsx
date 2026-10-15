"use client";

import { ChromaticImage } from "@/components/ui/chromatic-image";
import { Button } from "@/components/ui/button";
import TextReveal from "@/components/ui/line-text-reveal";

export function Hero() {
    return (
        <article className="relative isolate w-full overflow-hidden bg-[#081d3b] text-white outline-1 -outline-offset-1 outline-black/10 dark:bg-neutral-950 dark:outline-white/10">
            <ChromaticImage
                src="https://images.unsplash.com/photo-1453090927415-5f45085b65c0?q=80&w=2348&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Two people collaborating in a blue-lit office"
                backgroundColor="#081d3b"
                zoom={0.1}
                displacement={0.03}
                chromaticShift={0.012}
                tilt={0.12}
                className="min-h-[38rem] w-full md:aspect-[16/9] md:min-h-0"
            >
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/5 to-black/20" />
                <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between gap-12 p-6 sm:p-8 lg:p-10">
                    <div className="pointer-events-auto flex select-text flex-col items-start justify-end gap-6 h-full">
                        <div className="flex flex-col gap-3">
                            <p className="text-base/7 sm:text-lg">Learn more than music</p>
                            <TextReveal
                                as="h3"
                                mode="lines"
                                blockColor="#9cae65"
                                text="Cultivating Excellence in Music"
                                className="mx-auto max-w-[20ch] text-3xl font-bold tracking-tight text-balance md:text-5xl lg:text-7xl"
                            />
                            <p className="max-w-[62ch] text-pretty text-base/7 text-white/75 sm:text-base font-medium">
                                Unlock your full potential through elite mentorship, immersive studio environments, and a refined curriculum designed for driven performers.
                            </p>
                        </div>

                        <div className="max-w-md space-x-2">
                            <Button
                                type="button"
                                className="pointer-events-auto bg-white px-4 py-3 text-sm font-medium text-neutral-950 ring-1 ring-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Explore more
                            </Button>
                            <Button
                                variant="outline"
                                >
                                Contact us
                            </Button>
                        </div>

                    </div>
                </div>
            </ChromaticImage>
        </article>
    );
}
