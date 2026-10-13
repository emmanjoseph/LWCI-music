import TextReveal from "@/components/ui/line-text-reveal";

export default function About() {
    return (
        <section className="px-6 py-32">
            <TextReveal
                as="h2"
                mode="lines"
                blockColor="#5C6FFF"
                className="max-w-3xl mx-auto text-4xl md:text-5xl font-semibold tracking-tight text-neutral-700"
                text="Learn piano, guitar, vocals and drums from teachers who live and breathe music."
            />

            <TextReveal
                mode="words"
                className="mt-16 max-w-3xl mx-auto text-2xl text-neutral-900"
                text="From striking your very first chord to stepping under the lights for your debut stage performance, our dedicated instructors walk alongside you through every step of your musical journey."
            />
        </section>
    );
}