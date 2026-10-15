import React from 'react'
import {ChromaticImage} from "@/components/ui/chromatic-image";
import TextReveal from "@/components/ui/line-text-reveal";
import CoursesGrid from "@/components/courses-grid";
import Pricing from "@/components/pricing";
import Link from "next/link";
import Footer from "@/components/Footer";

const Page = () => {
    return (
        <section className={''}>
            <ChromaticImage
            src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            alt="Two people collaborating in a blue-lit office"
            backgroundColor="#081d3b"
            zoom={0.1}
            displacement={0.03}
            chromaticShift={0.012}
            tilt={0.12}
            className="h-[30rem] w-full md:aspect-[16/9]"
        >
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/5 to-black/60" />
                <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between gap-12 px-4 py-10 max-w-7xl mx-auto text-white">
                    <div className="pointer-events-auto flex select-text flex-col items-start justify-end gap-6 h-full">
                        <TextReveal
                            as="h3"
                            mode="lines"
                            blockColor="#9cae65"
                            text="Main Courses"
                            className="max-w-[10ch] text-3xl font-bold tracking-tight text-balance md:text-5xl lg:text-7xl text-white"
                        />
                    </div>

                </div>
            </ChromaticImage>
            <div className="bg-black px-4 py-24">
                <CoursesGrid/>
                <section  aria-label="Lesson pricing" className="mx-auto container px-4 py-20 sm:px-6">
                    <TextReveal
                        as="h2"
                        mode="lines"
                        blockColor="#9cae65"
                        className="text-3xl font-bold tracking-tight sm:text-5xl text-white"
                        text="Our Pricing"
                    />
                    <p className="mt-4 max-w-xl text-base/7 text-muted">
                        One simple price to start your musical journey. Lessons are KSh 5,000 per month,
                        with a KSh 500 registration fee.
                    </p>

                    <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-white">
                        <div className="grid md:grid-cols-2">
                            <div className="p-6 sm:p-10">
                                <h3 className="text-lg font-medium">Monthly lessons</h3>
                                <p className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">
                                    <span className="mr-2 text-xl font-medium tracking-normal">KSh</span>
                                    5,000
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground">per month</p>
                                <p className="mt-6 max-w-sm text-sm/7 text-muted-foreground">
                                    Build your skills in piano, guitar, vocals or drums, one lesson at a time.
                                </p>
                            </div>

                            <div className="flex flex-col justify-between gap-8 border-t border-border bg-[#9cae65]/15 p-6 sm:p-10 md:border-t-0 md:border-l">
                                <div>
                                    <h3 className="text-lg font-medium">Registration fee</h3>
                                    <p className="mt-6 text-4xl font-bold tracking-tight">
                                        <span className="mr-2 text-xl font-medium tracking-normal">KSh</span>
                                        500
                                    </p>
                                    <p className="mt-3 text-sm/7 text-muted-foreground">
                                        Paid when you register, in addition to your monthly lesson fee.
                                    </p>
                                </div>
                                <Link
                                    href="/enroll"
                                    className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                                >
                                    Enroll today <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>

        </section>
    )
}
export default Page
