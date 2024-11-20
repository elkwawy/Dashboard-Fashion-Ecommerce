import React, { memo } from 'react';
import { Img } from 'react-image';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from './LoadingSpinner';

const LazyImage = memo(({ src, alt, className, loader }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,  // Only load once the image is in view
        threshold: 0.1      // Trigger when 10% of the image is visible
    });

    return (
        <div ref={ref}>
        {inView && (
            <Img src={src} alt={alt || "image"} className={className || null} loader={loader || <div className='w-full h-full bg-gray-300 flex items-center justify-center'><LoadingSpinner /></div>} />
        )}
        </div>
    );
});

export default LazyImage;
