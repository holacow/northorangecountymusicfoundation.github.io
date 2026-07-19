import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useDonation } from "@/contexts/DonationContext";
import { Library, GraduationCap, Users, Music2, Heart, Star } from "lucide-react";

export default function About() {
  const { openDonation } = useDonation();

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: "easeOut" },
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section
        className="relative pt-40 pb-24 flex items-center justify-center text-center"
        style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #2d1a00 50%, #1A1A1A 100%)" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-orange-500 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-yellow-600 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl mx-auto px-4"
        >
          <p className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Est. 2024</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">About Us</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            A nonprofit born in North Orange County with a simple belief — every young musician deserves an audience.
          </p>
          <div className="w-16 h-1 bg-secondary rounded-full mx-auto mt-8" />
        </motion.div>
      </section>

      {/* OUR STORY */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <p className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Our Story</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                How It All Began
              </h2>
              <div className="w-16 h-1 bg-secondary rounded-full mb-8" />
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                The North Orange County Music Foundation was founded in 2024 by a group of music educators and community advocates who saw a gap — talented young musicians were mastering their craft in studios and classrooms, but had no meaningful platform to share it.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                We started with a single recital at a local school and quickly realized how transformative a live performance could be — not just for the musicians, but for the audience. Seniors lit up. Children leaned in. Communities connected.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Based in Yorba Linda, CA, NOCMF has grown to partner with museums, schools, and senior centers across North Orange County, creating performance opportunities that benefit musicians and communities alike.
              </p>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  src={`${import.meta.env.BASE_URL}images/piano-hero.png`}
                  alt="Grand piano on stage"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white rounded-2xl px-6 py-5 shadow-xl">
                <p className="text-3xl font-bold font-serif">2024</p>
                <p className="text-white/80 text-sm mt-1">Year Founded</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-8">Our Mission</p>
            <p className="font-serif text-3xl md:text-5xl leading-tight text-foreground/90">
              "To inspire young musicians and uplift communities by creating{" "}
              <span className="text-primary italic">meaningful performance experiences</span>{" "}
              that bring music beyond the classroom and into the heart of everyday life."
            </p>
            <div className="w-24 h-1 bg-secondary mx-auto mt-12 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div {...fadeIn} className="text-center mb-14">
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-4">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Where We Perform
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We bring live music to the places in our community that need it most.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-muted rounded-2xl p-8 border border-border/50 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Library size={40} className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">Museums</h3>
              <p className="text-muted-foreground leading-relaxed">
                Engaging cultural audiences with live student performances that bring art and history exhibits to life through sound.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-muted rounded-2xl p-8 border border-border/50 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-2xl bg-secondary/15 flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors duration-300">
                <GraduationCap size={40} className="text-secondary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">Schools</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bringing music directly to students and school communities to inspire the next generation of musicians and music lovers.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-muted rounded-2xl p-8 border border-border/50 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Users size={40} className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">Senior Centers</h3>
              <p className="text-muted-foreground leading-relaxed">
                Brightening the days of seniors through the joy of live music, creating cross-generational connections and lasting memories.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-foreground text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div {...fadeIn} className="text-center mb-14">
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-4">What Drives Us</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Our Values</h2>
            <div className="w-16 h-1 bg-secondary rounded-full mx-auto mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Music2 size={32} />,
                title: "Artistic Excellence",
                desc: "We hold our young performers to the highest standard, helping them grow into confident, accomplished musicians.",
              },
              {
                icon: <Heart size={32} />,
                title: "Community First",
                desc: "Every performance is designed to give back — to the audience as much as the performer. Music is a gift meant to be shared.",
              },
              {
                icon: <Star size={32} />,
                title: "Opportunity for All",
                desc: "We believe every talented young musician, regardless of background, deserves a stage and an audience.",
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-5 text-secondary">
                  {v.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-3">{v.title}</h3>
                <p className="text-white/70 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div {...fadeIn} className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Be Part of Our Story
            </h2>
            <p className="text-white/85 text-lg mb-8">
              Since 2024 we've been building something special in North Orange County. Help us grow.
            </p>
            <Button
              size="lg"
              variant="white"
              onClick={openDonation}
              className="text-base px-8"
            >
              Support NOCMF
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
