import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import videoPoster from '../assets/images/video_poster_1783692231022.jpg';

interface OptimizedVideoProps {
  src: string;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({ src }) => {
  const [isClient, setIsClient] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasLoadedSrc = useRef(false);

  // Guarantee client-side mounting to prevent SSR/hydration mismatch (Next.js/remix/Vite compatible)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Defer video source loading until after first paint and browser is idle
  useEffect(() => {
    if (!isClient) return;

    let idleCallbackId: number | null = null;
    let timeoutId: any = null;

    const initiateVideoLoad = () => {
      if (hasLoadedSrc.current) return;
      setShouldLoadVideo(true);
    };

    // Use requestIdleCallback if available, with a fast setTimeout fallback
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        idleCallbackId = (window as any).requestIdleCallback(() => {
          // Defer a bit more to ensure the thread is completely free
          timeoutId = setTimeout(initiateVideoLoad, 1000);
        }, { timeout: 3000 });
      } else {
        timeoutId = setTimeout(initiateVideoLoad, 1500);
      }
    }

    return () => {
      if (idleCallbackId !== null && 'cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isClient]);

  // Set video properties and handle the source mount exactly once
  useEffect(() => {
    if (shouldLoadVideo && videoRef.current && !hasLoadedSrc.current) {
      hasLoadedSrc.current = true;
      const videoElement = videoRef.current;

      // Programmatically apply source to prevent premature prefetching
      const source = document.createElement('source');
      source.src = src;
      source.type = 'video/mp4';
      videoElement.appendChild(source);

      // Explicitly load the video
      videoElement.load();

      // Trigger autoplay if possible
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay was prevented by the browser policy, waiting for user interaction:", error);
          
          // Fallback: Autoplay again on first user click anywhere on screen
          const playOnInteraction = () => {
            videoElement.play().catch(() => {});
            document.removeEventListener('click', playOnInteraction);
          };
          document.addEventListener('click', playOnInteraction);
        });
      }
    }
  }, [shouldLoadVideo, src]);

  if (!isClient) {
    // Return a solid dark skeleton during server pre-rendering
    return <div className="absolute inset-0 w-full h-full bg-black z-0" />;
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-black">
      {/* 1. High-performance Poster Image - Rendered immediately */}
      <img
        src={videoPoster}
        alt="BubbleBitX AI Core background loading"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out z-10 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        loading="eager"
        referrerPolicy="no-referrer"
      />

      {/* 2. Defer-loaded Background Video */}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          id="bg-video"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out z-0 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onPlaying={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
        />
      )}

      {/* 3. Smooth solid dark gradient backing layer to eliminate layout shifts */}
      <div className="absolute inset-0 bg-black/10 z-20 pointer-events-none" />
    </div>
  );
};

// Prevent any parent-level state updates from causing video re-renders or source re-downloads
export default React.memo(OptimizedVideo);
