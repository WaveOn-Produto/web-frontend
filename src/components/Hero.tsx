// src/components/Hero.tsx
import React from "react";

type HeroProps = {
  lines: string[];
  imageSrc: string;
  imageAlt?: string;
  className?: string;
};

export default function Hero({
  lines,
  imageSrc,
  imageAlt = "Personagem",
  className = "",
}: HeroProps) {
  return (
    <section className={`home-hero ${className}`}>
      <div className="hero-content">
        {lines.map((text, index) => (
          <h2 key={index}>{text}</h2>
        ))}
      </div>

      <div className="hero-image">
        <img src={imageSrc} alt={imageAlt} />
      </div>
    </section>
  );
}
