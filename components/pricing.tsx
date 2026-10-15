import Link from "next/link";
import TextReveal from "@/components/ui/line-text-reveal";

const Pricing = () => {
    return (
        <section id="pricing" aria-label="Lesson pricing" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
            <TextReveal
                as="h2"
                mode="lines"
                blockColor="#9cae65"
                className="text-3xl font-bold tracking-tight sm:text-5xl"
                text="Our Pricing"
            />
            <p className="mt-4 max-w-xl text-base/7 text-muted-foreground">
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
    )
}
export default Pricing
