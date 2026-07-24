import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Maximize2, 
  Minimize2, 
  X, 
  Volume2, 
  VolumeX, 
  Film,
  RotateCcw
} from 'lucide-react';

export const IntroVideoPlayer: React.FC = () => {
  // State management
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  
  // Video playback tracking
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // References
  const miniVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const VIDEO_SRC = "/BubblebitX-Intro.mp4";

  // Format seconds to mm:ss
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Sync state with mini video element
  useEffect(() => {
    if (miniVideoRef.current && !isExpanded) {
      if (isPlaying) {
        miniVideoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        miniVideoRef.current.pause();
      }
    }
  }, [isPlaying, isExpanded]);

  // Sync state when modal opens
  useEffect(() => {
    if (isExpanded) {
      // Pause mini video when modal is open
      if (miniVideoRef.current) miniVideoRef.current.pause();
      
      // Auto-play expanded video (unmuted if user interacted or muted by default)
      if (modalVideoRef.current) {
        modalVideoRef.current.currentTime = currentTime;
        modalVideoRef.current.muted = isMuted;
        modalVideoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }

      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      // Return to mini video
      if (miniVideoRef.current) {
        miniVideoRef.current.currentTime = currentTime;
        if (isPlaying) miniVideoRef.current.play().catch(() => {});
      }
    }
  }, [isExpanded]);

  // Handle ESC key press to close expanded modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  const handleOpenModal = () => {
    setIsExpanded(true);
  };

  const handleCloseModal = () => {
    setIsExpanded(false);
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const activeVideo = isExpanded ? modalVideoRef.current : miniVideoRef.current;
    if (activeVideo) {
      if (isPlaying) {
        activeVideo.pause();
        setIsPlaying(false);
      } else {
        activeVideo.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMuted(prev => !prev);
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    setCurrentTime(video.currentTime);
    if (video.duration) setDuration(video.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    if (modalVideoRef.current) {
      modalVideoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (modalVideoRef.current) {
      modalVideoRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 1. FLOATING MINIMIZED VIDEO PLAYER (BOTTOM-LEFT OF HERO PAGE)   */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {!isDismissed && !isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 group pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Card Container */}
            <div 
              onClick={handleOpenModal}
              className="relative w-44 sm:w-56 h-28 sm:h-36 rounded-2xl overflow-hidden bg-neutral-900/90 border border-white/20 shadow-2xl backdrop-blur-md cursor-pointer transition-all duration-300 hover:border-white/40 hover:shadow-cyan-500/10 hover:shadow-2xl ring-1 ring-black/50"
              role="button"
              aria-label="Open intro video popup"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenModal();
                }
              }}
            >
              {/* Mini Video Element */}
              <video
                ref={miniVideoRef}
                src={VIDEO_SRC}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
              />

              {/* Top Gradient Overlay */}
              <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

              {/* Top Bar Badge: Live Intro */}
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-medium text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Intro Video</span>
                </div>

                {/* Dismiss Pill Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDismissed(true);
                  }}
                  className="pointer-events-auto p-1 rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white/50"
                  aria-label="Dismiss video player"
                  title="Dismiss player"
                >
                  <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>

              {/* Center Action Overlay (Show on hover or always accessible) */}
              <div className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center gap-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-90'}`}>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 sm:p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-transform active:scale-95 focus:outline-none"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal();
                  }}
                  className="p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-neutral-900 transition-transform active:scale-95 focus:outline-none shadow-lg"
                  aria-label="Maximize video"
                  title="Maximize video"
                >
                  <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Bottom Bar: Mute toggle & Duration */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white/80 z-10">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1 rounded-md bg-black/50 hover:bg-black/80 text-white/90 transition-colors focus:outline-none"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </button>
                <span className="font-mono bg-black/50 px-1.5 py-0.5 rounded text-[9px]">
                  {formatTime(currentTime)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* 2. RE-OPEN BUTTON IF DISMISSED BY USER                         */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isDismissed && !isExpanded && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            type="button"
            onClick={() => {
              setIsDismissed(false);
              setIsExpanded(true);
            }}
            className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900/90 border border-white/20 text-white text-xs font-medium shadow-2xl backdrop-blur-md hover:bg-neutral-800 hover:border-white/40 transition-all cursor-pointer pointer-events-auto"
            aria-label="Watch intro video"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Film className="w-3.5 h-3.5 text-blue-400" />
            <span>Watch Intro</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* 3. FULL EXPANDED POPUP MODAL                                  */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 pointer-events-auto"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-4xl bg-neutral-950 border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-neutral-900/80 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Film className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 id="video-modal-title" className="text-sm sm:text-base font-semibold text-white tracking-tight">
                      BubblebitX — Company Intro
                    </h3>
                    <p className="text-[11px] text-white/50 hidden sm:block">
                      AI Employees & Workflow Automation Overview
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-label="Close modal"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Video Viewport */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center group overflow-hidden">
                <video
                  ref={modalVideoRef}
                  src={VIDEO_SRC}
                  className="w-full h-full object-contain"
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  onClick={togglePlay}
                />

                {/* Big Center Play/Pause Flash Overlay */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer focus:outline-none"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  <div className="p-4 sm:p-5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 transform group-hover:scale-105 transition-transform">
                    {isPlaying ? (
                      <Pause className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
                    ) : (
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                    )}
                  </div>
                </button>
              </div>

              {/* Controls Toolbar Bar */}
              <div className="px-4 sm:px-6 py-3.5 bg-neutral-900/90 border-t border-white/10 flex flex-col gap-2.5">
                {/* Timeline Progress Bar */}
                <div 
                  ref={progressRef}
                  onClick={handleSeek}
                  className="relative w-full h-2 bg-white/10 hover:h-2.5 rounded-full cursor-pointer transition-all group/progress"
                  role="slider"
                  aria-label="Video timeline slider"
                  aria-valuenow={currentTime}
                  aria-valuemin={0}
                  aria-valuemax={duration || 100}
                >
                  <div 
                    className="absolute top-0 left-0 bottom-0 bg-blue-500 rounded-full transition-all relative"
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md scale-0 group-hover/progress:scale-100 transition-transform" />
                  </div>
                </div>

                {/* Controls Buttons Row */}
                <div className="flex items-center justify-between gap-4">
                  {/* Left Controls: Play/Pause, Replay, Time Display */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (modalVideoRef.current) {
                          modalVideoRef.current.currentTime = 0;
                          setCurrentTime(0);
                        }
                      }}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors focus:outline-none"
                      aria-label="Replay video"
                      title="Replay from start"
                    >
                      <RotateCcw className="w-4 h-4 sm:w-4 sm:h-4" />
                    </button>

                    <span className="text-xs font-mono text-white/70 tracking-wider">
                      {formatTime(currentTime)} <span className="text-white/30">/</span> {formatTime(duration)}
                    </span>
                  </div>

                  {/* Right Controls: Volume Slider, Mute, Minimize */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors focus:outline-none"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                      </button>

                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 sm:w-24 h-1.5 bg-white/20 accent-blue-500 rounded-lg cursor-pointer"
                        aria-label="Volume slider"
                      />
                    </div>

                    <div className="h-4 w-[1px] bg-white/15 hidden sm:block" />

                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
                      aria-label="Minimize video player"
                    >
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Minimize</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IntroVideoPlayer;
