import React, { memo } from "react";
import { Img } from "react-image";
import { useInView } from "react-intersection-observer";

const LazyImage = memo(({ src, alt, className, loader }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only load once the image is in view
    threshold: 0.1, // Trigger when 10% of the image is visible
  });

  return (
    <div ref={ref}>
      {inView && (
        <Img
          src={src}
          alt={alt || "image"}
          className={className || null}
          onError={(e) => {
            e.target.src = "/src/assets/noImage.jpg";
          }}
          loader={
            loader || (
              <div className="w-full h-full bg-gray-300 animate-pulse"></div>
            )
          }
          
        />
      )}
    </div>
  );
});

export default LazyImage;
