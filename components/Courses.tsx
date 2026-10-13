import FeatureCarousel from "@/components/ui/feature-carousel";

const courses = [
    { title: "Piano", description: "From first notes to full pieces, classical or gospel.", image: "/piano.png" },
    { title: "Guitar", description: "Acoustic, electric and bass, with songs you actually want to play.", video: "/guitar.mp4" },
    { title: "Vocals", description: "Breathing, range and stage confidence.", image: "/vocals.png" },
    { title: "Drums", description: "Groove, rudiments and playing in a band.", image: "/drums.png" },
];

export default function Courses() {
    return (
        <div className="overflow-x-clip">
            <div className="mx-auto max-w-5xl px-4 py-24">
                <FeatureCarousel items={courses} />
            </div>
        </div>
    );
}