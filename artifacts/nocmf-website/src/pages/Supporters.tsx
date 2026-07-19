import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Heart } from "lucide-react";

const supporters = [
  {
    name: "Trader Joe's",
    logo: `${import.meta.env.BASE_URL}images/logo-traderjoes.png`,
    color: "#c0392b",
    initials: "TJ",
  },
  {
    name: "Costco",
    logo: `${import.meta.env.BASE_URL}images/logo-costco.png`,
    color: "#003DA5",
    initials: "C",
  },
  {
    name: "Starbucks",
    logo: `${import.meta.env.BASE_URL}images/logo-starbucks.png`,
    color: "#00704A",
    initials: "S",
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

function LogoTile({ supporter: s, index: i }: { supporter: typeof supporters[0]; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-border/40 flex items-center justify-center p-8 hover:shadow-md transition-shadow duration-300"
      style={{ minHeight: "180px" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
    >
      {!imgError ? (
        <img
          src={s.logo}
          alt={`${s.name} logo`}
          className="max-h-28 max-w-full w-auto object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <span
            className="font-serif font-bold text-5xl tracking-tight"
            style={{ color: s.color }}
          >
            {s.initials}
          </span>
          <span className="text-sm font-medium text-muted-foreground">{s.name}</span>
        </div>
      )}
    </motion.div>
  );
}

export default function Supporters() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />

      {/* PAGE HERO */}
      <section
        className="relative pt-40 pb-24 flex items-center justify-center text-center"
        style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #2d1a00 50%, #1A1A1A 100%)" }}
      >
        <div className="container mx-auto px-4">
          <motion.p
            className="text-primary font-semibold text-sm tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            With Gratitude
          </motion.p>
          <motion.h1
            className="font-serif text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Supporters
          </motion.h1>
          <motion.p
            className="text-white/60 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            None of this would be possible without the generosity of our community partners and sponsors.
          </motion.p>
          <motion.div
            className="w-16 h-0.5 bg-secondary mx-auto mt-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
        </div>
      </section>

      {/* LOGO GRID */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div className="text-center mb-16" {...fadeIn}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Thank You to Our Sponsors
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These organizations believe in the power of music to transform lives and strengthen communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supporters.map((s, i) => (
              <LogoTile key={s.name} supporter={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* BECOME A SUPPORTER CTA */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div {...fadeIn}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
              <Heart className="text-primary" size={26} />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join Our Circle of Support
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Your business or organization can help us inspire the next generation of musicians. Reach out to learn about partnership opportunities.
            </p>
            <a
              href="mailto:hello@nocmf.org"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
