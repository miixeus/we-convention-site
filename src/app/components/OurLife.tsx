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
        title: "Our meetings",
        description: "One of our meeting.",
        size: "large",
      },
      {
        id: "my-wife-and-me",
        src: "/photos/IMG_20250304_154824283_HDR.jpg",
        title: "Our territory",
        description:
          "Cuiabá, background: gold extration, In Front: we will looking for precious people.",
        size: "large",
      },
      {
        id: "sharing-bible-hope",
        src: "/photos/Nossa Congregação.jpeg",
        title: "Our Congregation",
        description: "We serve in a Haitian Creole congregation.",
        size: "medium",
      },
      {
        id: "daily-bible-study",
        src: "/photos/Preaching.jpg",
        title: "Preaching",
        description: "We in the sunny territory",
        size: "small",
      },
      {
        id: "nature-around-us",
        src: "/photos/natureza.jpg",
        title: "Nature around us",
        description: "The breathtaking Pantanal region near our home.",
        size: "wide",
      },
      {
        id: "tropical-beauty",
        src: "/photos/saide-de-campo.jpg",
        title: "Meeting for Field Service",
        description: "Sunday afternoon field service meetings at the home of a family of sisters",
        size: "tall",
      },
      {
        id: "moments-with-dear-friends",
        src: "/photos/saida-de-campo-em-casa.jpg",
        title: "Meeting for Field Service",
        description: "Meeting at our home",
        size: "medium",
      },
      {
        id: "local-life",
        src: "/photos/saida-de-campo-sr.jpg",
        title: "Meeting for Field Service",
        description: "At Kingdom Hall.",
        size: "small",
      },
      {
        id: "golden-hour-reflections",
        src: "/photos/carrinho.jpg",
        description: "Cart Witnessing",
        size: "medium",
      },
      {
        id: "cultural-richness",
        src: "/photos/Recreação.jpeg",
        title: "Recreation",
        description: "Congregation get-together after the visit",
        size: "small",
      },
            {
        id: "at-meeting-with-students-bible",
        src: "/photos/saida-campo-viajante.jpeg",
        title: "Our meetings",
        description: "One of our meeting.",
        size: "large",
      },
      {
        id: "moments-with-dear-friends",
        src: "/photos/our work.jpeg",
        title: "our group",
        description: "Preaching in a territory with many Haitian addresses",
        size: "medium",
      },
        {
        id: "cultural-richness",
        src: "/photos/preaching-at-night.jpg",
        title: "Preaching",
        description: "preaching in the evening to find people at home",
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
            Moments that tell our story at Cuiabá, MT - Brazil
          </p>
        </div>
      </div>
    </section>
  );
}
