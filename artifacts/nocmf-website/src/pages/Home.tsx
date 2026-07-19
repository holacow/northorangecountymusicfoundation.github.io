import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useDonation } from "@/contexts/DonationContext";
import { VolunteerModal } from "@/components/VolunteerModal";
import {
  HeartHandshake,
  Library,
  GraduationCap,
  Users,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const { openDonation } = useDonation();
  const [volunteerOpen, setVolunteerOpen] = React.useState(false);
  const openVolunteer = () => setVolunteerOpen(true);
  const closeVolunteer = () => setVolunteerOpen(false);

  const handleAction = (action: string) => {
    toast({
      title: `${action} initiated`,
      description: `Thank you for your interest! The ${action.toLowerCase()} process will be available soon.`,
    });
  };

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/piano-hero.png`}
            alt="Grand piano on stage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
              <Sparkles size={16} className="text-secondary" />
              <span>North Orange County Music Foundation</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-lg">
              Bringing Music <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Beyond the Classroom
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed drop-shadow">
              We inspire young musicians and uplift communities by creating meaningful performance experiences in the heart of everyday life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={openDonation} className="text-base">
                Support Our Mission
              </Button>
              <Button size="lg" variant="white" onClick={() => {
                document.getElementById('what-we-do')?.scrollIntoView({ behavior: 'smooth' });
              }} className="text-base group">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70"
        >
          <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* MISSION SECTION */}
      <section id="mission" className="py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-8">Our Mission</p>
            <p className="font-serif text-3xl md:text-5xl leading-snug text-foreground/90">
              "To inspire young musicians and uplift communities by creating{" "}
              <span className="text-primary italic">meaningful performance experiences</span>{" "}
              that bring music beyond the classroom and into the heart of everyday life."
            </p>
            <div className="w-24 h-1 bg-secondary mx-auto mt-12 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section id="what-we-do" className="py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div {...fadeIn} className="text-center mb-14">
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-4">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Where We Perform</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We connect passionate young musicians with our local community through live, enriching performances.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-border/40 flex flex-col items-center text-center group hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Library size={38} className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-foreground">Museums</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Engaging cultural audiences with live student performances that bring art and history exhibits to life through sound.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-border/40 flex flex-col items-center text-center group hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 rounded-2xl bg-secondary/15 flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors duration-300">
                <GraduationCap size={38} className="text-secondary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-foreground">Schools</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Bringing music directly to students and school communities to inspire the next generation of musicians and music lovers.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-border/40 flex flex-col items-center text-center group hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Users size={38} className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-foreground">Senior Centers</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Brightening the days of seniors through the joy of live music, creating cross-generational connections and lasting memories.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section id="impact" className="py-24 bg-foreground text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              {...fadeIn}
              className="w-full lg:w-1/2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10"></div>
                <img 
                  src={`${import.meta.env.BASE_URL}images/impact.png`}
                  alt="Happy students with instruments" 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              className="w-full lg:w-1/2 space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                Why Music Matters
              </h2>
              <div className="w-16 h-1 bg-secondary rounded-full"></div>
              <p className="text-white/80 text-lg leading-relaxed pt-4">
                We believe that music is meant to be shared. While classroom practice is essential for building skill, performing for a live audience builds confidence, character, and community.
              </p>
              <p className="text-white/80 text-lg leading-relaxed">
                By taking young musicians out of the practice room and into local venues, we give them a platform to shine while simultaneously enriching the cultural fabric of North Orange County.
              </p>
              
              {/* Stats/Highlight row */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 mt-8">
                <div>
                  <h4 className="text-4xl font-bold text-secondary mb-2">100+</h4>
                  <p className="text-white/70">Student Performers</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-primary mb-2">30+</h4>
                  <p className="text-white/70">Community Venues</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PIANO GALLERY SECTION */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            {...fadeIn}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">The Music</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Every performance begins with a single note.
            </p>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              {...fadeIn}
              className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/piano-keys.png`}
                alt="Piano keys close-up"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/piano-gallery.png`}
                alt="Piano in sunlit room"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SUPPORT SECTION */}
      <section id="support" className="py-24 relative overflow-hidden">
        {/* Abstract background using generated image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/abstract-music.png`} 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary/80"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div 
            {...fadeIn}
            className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 p-10 md:p-16 rounded-3xl shadow-2xl"
          >
            <HeartHandshake size={60} className="text-secondary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Join Our Symphony of Support
            </h2>
            <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
              Whether you're a young musician ready to perform, a venue looking to host, or a community member wanting to support our cause—we need you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                variant="white" 
                onClick={openDonation}
                className="text-lg px-8 h-14"
              >
                Make a Donation
              </Button>
              <Button
                size="lg"
                className="text-lg px-8 h-14 bg-black text-white hover:bg-black/80 hover:shadow-lg border-none"
                onClick={openVolunteer}
              >
                Volunteer With Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <VolunteerModal isOpen={volunteerOpen} onClose={closeVolunteer} />
      <Footer />
    </div>
  );
}
