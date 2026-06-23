export function Closing() {
  return (
    <section className="py-32 px-6" style={{ backgroundColor: '#E8E2D6' }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative top border */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-24 h-px bg-[#1F2A28]"></div>
          <div className="w-2 h-2 bg-[#C6A15B] rotate-45"></div>
          <div className="w-24 h-px bg-[#1F2A28]"></div>
        </div>

        {/* Main message */}
        <h2 
          className="text-4xl md:text-5xl mb-12 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: '#1F2A28' }}
        >
          Thank you for visiting our page.
        </h2>

        {/* Divider */}
        <div className="w-32 h-px bg-[#C6A15B] mx-auto mb-8"></div>

        {/* Signature */}
        <div className="space-y-2">
          <p 
            className="text-3xl tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1F2A28' }}
          >
             Bruna & Michel 
          </p>
          <p className="text-base tracking-[0.2em]" style={{ color: '#2F2F2F' }}>
            Cuiabá — Brazil
          </p>
        </div>

        {/* Year */}
        <p 
          className="text-sm tracking-widest mt-16 opacity-40"
          style={{ color: '#1F2A28' }}
        >
          2026
        </p>
      </div>
    </section>
  );
}
