import { TITLES } from '@/lib/constants';

interface HeroProps {
  className?: string;
}

export default function Hero({ className = '' }: HeroProps) {
  return (
    <section
      role="hero"
      className={`w-full h-[400px] flex items-center bg-hero bg-top bg-cover bg-no-repeat ${className}`}
    >
      <h1 className="max-w-[512px] text-5xl md:text-6xl text-white font-bold">
        {TITLES.HERO}
      </h1>
    </section>
  );
}
