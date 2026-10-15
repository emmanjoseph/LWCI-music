import React from 'react'
import Carousel from "@/components/ui/carousel";

const items = [
    { title: 'Keyboard', description: 'Bright skies over rapeseed in full bloom.', image: 'https://images.unsplash.com/photo-1588440331054-baccc6e1e41d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
    { title: 'Drum set', description: 'The same field, quiet under a full moon.', image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
    { title: 'Acoustic guitar', description: 'Clear water and a long walk out.', image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
    { title: 'Electric guitar', description: 'Clear water and a long walk out.', image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
    { title: 'Bass guitar', description: 'Clear water and a long walk out.', image: 'https://images.unsplash.com/photo-1783461241047-2f10a14e8449?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
    { title: 'Vocal training', description: 'Clear water and a long walk out.', image: 'https://images.unsplash.com/photo-1549349807-4575e87c7e6a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
];

const FeatureCarousel = () => {
    return (
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
            <Carousel
                items={items}
                baseWidth="100%"
                visibleCards={{ sm: 1, md: 3 }}
                aspectRatio={0.8}
                effect="scale"
                indicator="bars"
                frame={false}
                arrows={false}
                loop
                autoplay
                autoplayDelay={4250}
                pauseOnHover
                theme="light"
                peek={0}
                gap={4}
                radius={30}
                draggable
                round={false}
            />
        </div>
    )
}
export default FeatureCarousel
