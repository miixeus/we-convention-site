import { ImageWithFallback } from './figma/ImageWithFallback';

export function MilwaukeeMemory() {
  const photos = [
    {
      src: "https://images.unsplash.com/photo-1658605710099-051be37e52c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWx3YXVrZWUlMjBza3lsaW5lJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MzY5MTIwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      caption: "Milwaukee skyline, 2026"
    },
    {
      src: "https://images.unsplash.com/photo-1560439514-4e9645039924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb252ZW50aW9uJTIwZ2F0aGVyaW5nJTIwcGVvcGxlJTIwbWVldGluZ3xlbnwxfHx8fDE3NzM2OTEyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      caption: "United in faith and friendship"
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-[#1F2A28]"></div>
            <p className="text-sm tracking-[0.3em] uppercase" style={{ color: '#C6A15B' }}>
              Chapter Three
            </p>
            <div className="w-16 h-px bg-[#1F2A28]"></div>
          </div>
          <h2 
            className="text-5xl md:text-6xl tracking-tight mb-8"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1F2A28' }}
          >
            Milwaukee 2026
          </h2>
        </div>

        {/* Reflective text */}
        <div className="max-w-3xl mx-auto mb-16">
          <p 
            className="text-xl md:text-2xl leading-relaxed text-center italic mb-8"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2F2F2F' }}
          >
            What a profound joy it was to gather with brothers and sisters from every corner of the earth. 
            In Milwaukee, we witnessed the beautiful tapestry of our global brotherhood—different languages, 
            cultures, and stories, yet united by the same hope and love.
          </p>
          
          <p 
            className="text-lg leading-relaxed text-center"
            style={{ color: '#2F2F2F' }}
          >
            These moments remind us that distance is merely geographic. The bonds of faith and friendship 
            transcend borders, creating a family that spans continents and generations.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {photos.map((photo, index) => (
            <div key={index} className="space-y-4">
              <div className="aspect-[4/3] overflow-hidden border border-[#1F2A28]/10 shadow-lg">
                <ImageWithFallback
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#C6A15B]"></div>
                <p 
                  className="text-sm tracking-wide italic"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2F2F2F' }}
                >
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing quote */}
        <div className="text-center">
          <div className="w-24 h-px bg-[#C6A15B] mx-auto mb-6"></div>
          <p 
            className="text-lg italic"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2F2F2F' }}
          >
            "A memory we'll cherish forever"
          </p>
        </div>
      </div>
    </section>
  );
}
