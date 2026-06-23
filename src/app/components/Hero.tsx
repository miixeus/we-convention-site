import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 md:py-32">
      {/* Large background typography */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.03] pointer-events-none">
        <h1 
          className="text-[40vw] font-bold tracking-tighter whitespace-nowrap"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          CUIABÁ-MT 
          BRAZIL
        </h1>
      </div>
      
      {/* Main content */}
      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center z-10">
        {/* Left - Typography */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="w-16 h-px bg-[#1F2A28]"></div>
            <p className="text-sm tracking-[0.3em] uppercase" style={{ color: '#C6A15B' }}>
              From Cuiabá,MT - Brazil
            </p>
          </div>
          
          <h1 
            className="text-6xl md:text-7xl lg:text-8xl tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1F2A28', lineHeight: '0.95' }}
          >
            Bruna & Michel
          </h1>
          
          <p 
            className="text-xl md:text-2xl italic leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2F2F2F' }}
          >
            "A quiet life, warm friendships and a love for simple things."
          </p>
          
          <div className="w-24 h-px bg-[#C6A15B]"></div>
        </div>
        
        {/* Right - Image */}
        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden border border-[#1F2A28]/10 shadow-2xl">
            <ImageWithFallback
              src="./photos/Ideia-photo-case.png"
              alt="Michel and Bru"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative accent */}
          <div 
            className="absolute -bottom-4 -right-4 w-32 h-32 border border-[#C6A15B] -z-10"
            style={{ transform: 'translate(0, 0)' }}
          ></div>
        </div>
      </div>
    </section>
  );
}
