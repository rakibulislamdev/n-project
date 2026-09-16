import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full -z-20">
        <Image
          src="/hero-image.svg"
          alt="Luxury Real Estate"
          fill
          priority
          className="object-cover object-right"
        />
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 w-full h-full -z-10 bg-gradient-to-r from-background via-background/80 to-transparent" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
        <div className="max-w-2xl mt-12 md:mt-24">
          <h1 className="text-5xl md:text-7xl font-sans tracking-tight text-foreground leading-tight">
            <span className="font-bold">Real</span> <span className="italic font-light">People</span>
            <br />
            <span className="italic font-light">Real</span> <span className="font-bold">Experience</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--color-brand-dark)] max-w-lg">
            Honest feedback from clients I've had the privilege of working with.
          </p>
        </div>
      </div>
    </section>
  );
}
