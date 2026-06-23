import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type PhotoSize = "large" | "medium" | "small" | "wide" | "tall";

interface Photo {
  id: string;
  src: string;
  title: string;
  description: string;
  size: PhotoSize;
}

export function OurLife() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const photos: Photo[] = useMemo(
    () => [
      {
        id: "at-meeting-with-students-bible",
        src: "/photos/IMG_20240908_132524487_BURST000_COVER.jpg",
        title: "Our home city",
        description: "Cuiabá, a warm city in the heart of Brazil.",
        size: "large",
      },
      {
        id: "my-wife-and-me",
        src: "/photos/IMG_20250304_154824283_HDR.jpg",
        title: "Our home city",
        description: "Cuiabá, background: gold extration, In Front: we will looking for precious people.",
        size: "large",
      },
      {
        id: "sharing-bible-hope",
        src: "https://images.unsplash.com/photo-1758526214152-8b9196b74c43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwaGFwcHklMjBtb21lbnQlMjB0b2dldGhlcnxlbnwxfHx8fDE3NzM2OTEyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Sharing Bible hope",
        description: "Moments in our preaching territory.",
        size: "medium",
      },
      {
        id: "daily-bible-study",
        src: "https://images.unsplash.com/photo-1610072175222-14ff9b858f5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHN0dWR5JTIwZmFpdGglMjBib29rfGVufDF8fHx8MTc3MzY5MjA5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Daily Bible study",
        description: "Finding strength and guidance in Scripture.",
        size: "small",
      },
      {
        id: "nature-around-us",
        src: "https://images.unsplash.com/photo-1749391941506-4b258051053f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWwlMjBwYW50YW5hbCUyMG5hdHVyZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzM2OTEyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Nature around us",
        description: "The breathtaking Pantanal region near our home.",
        size: "wide",
      },
      {
        id: "tropical-beauty",
        src: "https://images.unsplash.com/photo-1543576625-404c5d92e40b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMG5hdHVyZSUyMHBhbG0lMjB0cmVlc3xlbnwxfHx8fDE3NzM2OTIxMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Tropical beauty",
        description: "The lush greenery that surrounds our region.",
        size: "tall",
      },
      {
        id: "moments-with-dear-friends",
        src: "https://images.unsplash.com/photo-1773601102552-3179f86e7de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBmcmllbmRzaGlwfGVufDF8fHx8MTc3MzY5MjEwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Moments with dear friends",
        description: "Fellowship and joy with our congregation.",
        size: "medium",
      },
      {
        id: "local-life",
        src: "https://images.unsplash.com/photo-1750601455140-50e1611868a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWwlMjBzdHJlZXQlMjBsaWZlJTIwcGVvcGxlfGVufDF8fHx8MTc3MzY5MjA5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Local life",
        description: "The vibrant spirit of our community.",
        size: "small",
      },
      {
        id: "golden-hour-reflections",
        src: "https://images.unsplash.com/photo-1697179063838-9da1b582ad69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBnb2xkZW4lMjBob3VyJTIwbmF0dXJlfGVufDF8fHx8MTc3MzY5MTIxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Golden hour reflections",
        description: "Peaceful moments at the end of each day.",
        size: "medium",
      },
      {
        id: "cultural-richness",
        src: "https://images.unsplash.com/photo-1675744319797-a724a3faf6d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWwlMjBtYXJrZXQlMjBjdWx0dXJlfGVufDF8fHx8MTc3MzY5MjEwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Cultural richness",
        description: "The colors and flavors of Brazilian culture.",
        size: "small",
      },
    ],
    [],
  );

  const selectedPhoto = photos.find((photo) => photo.id === selectedId) ?? null;
  const isAnyHovered = hoveredId !== null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getGridClass = (size: PhotoSize) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2";
      case "wide":
        return "col-span-2 row-span-1";
      case "tall":
        return "col-span-1 row-span-2";
      case "medium":
      case "small":
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-[#1F2A28]" />
            <p
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: "#C6A15B" }}
            >
              Chapter One
            </p>
            <div className="w-16 h-px bg-[#1F2A28]" />
          </div>

          <h2
            className="text-5xl md:text-6xl tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1F2A28",
            }}
          >
            Our Life
          </h2>
        </div>

        <div className="relative">
          <AnimatePresence>
            {selectedPhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 md:p-10"
                onClick={() => setSelectedId(null)}
                aria-modal="true"
                role="dialog"
              >
                <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="relative w-full max-w-6xl aspect-[16/10] overflow-hidden border border-white/15 shadow-2xl bg-black"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ImageWithFallback
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition hover:bg-white/20"
                    aria-label="Close image"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <motion.h3
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.35 }}
                      className="text-3xl md:text-5xl text-white mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {selectedPhoto.title}
                    </motion.h3>

                    <motion.p
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.22, duration: 0.35 }}
                      className="max-w-2xl text-base md:text-xl text-white/90"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {selectedPhoto.description}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] grid-flow-dense gap-1 md:gap-2">
            {photos.map((photo) => {
              const isHovered = hoveredId === photo.id;
              const isDimmed = isAnyHovered && !isHovered;

              return (
                <motion.div
                  key={photo.id}
                  className={`relative overflow-hidden ${getGridClass(photo.size)}`}
                  animate={{
                    opacity: isDimmed ? 0.55 : 1,
                    scale: isHovered ? 1.02 : 1,
                    y: isHovered ? -2 : 0,
                  }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                >
                  <button
                    type="button"
                    className="group relative w-full h-full overflow-hidden border border-[#1F2A28]/10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F6F2]"
                    onMouseEnter={() => setHoveredId(photo.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(photo.id)}
                    onBlur={() => setHoveredId(null)}
                    onClick={() => setSelectedId(photo.id)}
                    aria-label={`Open photo: ${photo.title}`}
                  >
                    <ImageWithFallback
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />

                    <div
                      className={`absolute inset-0 transition duration-300 ${
                        isHovered
                          ? "bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                          : "bg-gradient-to-t from-black/20 via-transparent to-transparent"
                      }`}
                    />

                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isHovered ? 1 : 0.9,
                          y: isHovered ? 0 : 4,
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        <p
                          className="text-white text-sm md:text-base"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {photo.title}
                        </p>

                        <p
                          className={`mt-1 max-w-md text-white/85 text-xs md:text-sm leading-relaxed transition duration-300 ${
                            isHovered ? "opacity-100" : "opacity-0 md:opacity-0"
                          }`}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {photo.description}
                        </p>
                      </motion.div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm italic" style={{ color: "#2F2F2F" }}>
            Moments that tell our story
          </p>
        </div>
      </div>
    </section>
  );
}
