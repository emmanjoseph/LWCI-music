import FeatureCarousel from "@/components/ui/feature-carousel";

export default function Courses() {
    return (
        <div className="w-full overflow-x-clip">
            <div className="mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
                <FeatureCarousel />
            </div>
        </div>
    );
}