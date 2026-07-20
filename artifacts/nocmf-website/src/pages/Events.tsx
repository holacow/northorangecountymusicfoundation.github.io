import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Calendar, MapPin, Clock, Star, ChevronDown, ChevronUp,
  History, Images,
} from "lucide-react";

type EventType = "recital" | "museum" | "senior";

export interface Event {
  id: number;
  title: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  description: string;
  featured?: boolean;
  images?: string[];
}

export const STORAGE_KEY_EVENTS = "nocmf-events-v2";

const DEFAULT_UPCOMING: Event[] = [
  {
    id: 2,
    title: "Winter Recital 2026",
    type: "recital",
    date: "December 13, 2026",
    time: "4:00 PM – 6:00 PM",
    location: "El Dorado High School Recital Hall, Yorba Linda, CA",
    description:
      "Ring in the holiday season with our beloved Winter Recital — a heartwarming evening of performances from NOCMF's young musicians. A perfect way to share the gift of music with the whole community.",
    featured: true,
  },
];

const DEFAULT_PAST: Event[] = [
  {
    id: 1,
    title: "Summer Recital 2026",
    type: "recital",
    date: "June 4, 2026",
    time: "3:00 PM – 5:00 PM",
    location: "El Dorado High School Recital Hall, Yorba Linda, CA",
    description:
      "Our signature annual Summer Recital showcased the incredible progress of NOCMF student musicians. Families, friends, and community members came together to celebrate a season of hard work and artistic growth.",
    featured: true,
  },
  {
    id: 101,
    title: "Summer Recital 2025",
    type: "recital",
    date: "July 2025",
    time: "3:00 PM – 5:00 PM",
    location: "El Dorado High School Recital Hall, Yorba Linda, CA",
    description:
      "Our 2025 Summer Recital brought together NOCMF's young musicians for an unforgettable afternoon of music, celebrating a season of growth and dedication.",
    featured: true,
  },
  {
    id: 102,
    title: "Winter Recital 2025",
    type: "recital",
    date: "December 2025",
    time: "4:00 PM – 6:00 PM",
    location: "El Dorado High School Recital Hall, Yorba Linda, CA",
    description:
      "A heartwarming Winter Recital filled with the sounds of the season, performed by our talented young musicians.",
    featured: true,
  },
  {
    id: 105,
    title: "Summer Recital 2024",
    type: "recital",
    date: "July 2024",
    time: "3:00 PM – 5:00 PM",
    location: "El Dorado High School Recital Hall, Yorba Linda, CA",
    description:
      "Our 2024 Summer Recital brought together NOCMF's young musicians for a wonderful afternoon of music, celebrating the dedication and growth of each performer.",
    featured: true,
  },
  {
    id: 106,
    title: "Winter Recital 2024",
    type: "recital",
    date: "December 2024",
    time: "4:00 PM – 6:00 PM",
    location: "El Dorado High School Recital Hall, Yorba Linda, CA",
    description:
      "A festive Winter Recital that brought the community together to celebrate the holiday season through the talent and hard work of NOCMF's student musicians.",
    featured: true,
  },
  {
    id: 103,
    title: "Bowers Museum Performance",
    type: "museum",
    date: "April 5, 2026",
    time: "1:00 PM – 2:30 PM",
    location: "Bowers Museum, Santa Ana, CA",
    description:
      "NOCMF students performed a curated program of classical and contemporary pieces inside the historic Bowers Museum, pairing beautifully with the museum's world-class exhibits.",
  },
  {
    id: 104,
    title: "Senior Center Performance",
    type: "senior",
    date: "Spring 2025",
    time: "2:00 PM – 3:00 PM",
    location: "North Orange County Senior Center",
    description:
      "Our young musicians brought joy and warmth to local seniors with a program of beloved classics and uplifting pieces, creating lasting cross-generational connections.",
  },
];

export function loadEvents(): { upcoming: Event[]; past: Event[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { upcoming: DEFAULT_UPCOMING, past: DEFAULT_PAST };
}

export function saveEvents(upcoming: Event[], past: Event[]) {
  localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify({ upcoming, past }));
}

const typeConfig: Record<EventType, { label: string; color: string; bg: string }> = {
  recital: { label: "Recital",       color: "hsl(26 80% 42%)",  bg: "hsl(26 80% 52% / 0.12)" },
  museum:  { label: "Museum",        color: "hsl(44 55% 38%)",  bg: "hsl(44 55% 54% / 0.15)" },
  senior:  { label: "Senior Center", color: "hsl(140 50% 35%)", bg: "hsl(140 50% 50% / 0.12)" },
};

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: "easeOut" },
};

function EventCard({
  event,
  index,
  past = false,
}: {
  event: Event;
  index: number;
  past?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const cfg = typeConfig[event.type];

  return (
    <motion.div
      {...fadeIn}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className={`relative bg-card rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${
        past
          ? "opacity-90 border-border/40"
          : event.featured
          ? "border-primary/40 ring-1 ring-primary/20"
          : "border-border/50"
      }`}
    >
      {/* Featured badge (upcoming only) */}
      {event.featured && !past && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-white">
          <Star size={11} fill="white" />
          Annual Recital
        </div>
      )}
      {past && event.featured && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border/60">
          <Star size={11} />
          Annual Recital
        </div>
      )}

      {/* Top accent bar */}
      <div className="h-1.5 w-full" style={{ background: past ? "hsl(0 0% 80%)" : cfg.color }} />

      <div className="p-6 md:p-7">
        {/* Type badge */}
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={past ? { background: "hsl(0 0% 95%)", color: "hsl(0 0% 50%)" } : { background: cfg.bg, color: cfg.color }}
        >
          {cfg.label}
        </span>

        {/* Title */}
        <h3 className={`text-xl md:text-2xl font-serif font-bold mb-4 pr-24 ${past ? "text-foreground/70" : "text-foreground"}`}>
          {event.title}
        </h3>

        {/* Date / Time / Location */}
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={15} className="flex-shrink-0" style={{ color: past ? "hsl(0 0% 60%)" : cfg.color }} />
            <span className={`font-medium ${past ? "text-foreground/60" : "text-foreground/80"}`}>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={15} className="flex-shrink-0" style={{ color: past ? "hsl(0 0% 60%)" : cfg.color }} />
            <span>{event.time}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin size={15} className="flex-shrink-0 mt-0.5" style={{ color: past ? "hsl(0 0% 60%)" : cfg.color }} />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Description */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm font-medium mt-2 transition-colors text-muted-foreground hover:text-foreground"
        >
          {expanded ? "Show less" : "Details"}
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
        {expanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 text-muted-foreground text-sm leading-relaxed"
          >
            {event.description}
          </motion.p>
        )}
        <Link
          href={`/events/${event.id}`}
          className="mt-4 flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: cfg.color }}
        >
          <Images size={15} />
          View Photos
        </Link>
      </div>
    </motion.div>
  );
}

export default function Events() {
  const [upcoming, setUpcoming] = useState<Event[]>([]);
  const [past, setPast] = useState<Event[]>([]);

  useEffect(() => {
    const { upcoming: u, past: p } = loadEvents();
    setUpcoming(u);
    setPast(p);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />

      {/* PAGE HERO */}
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
          <p className="text-sm font-bold tracking-widest text-primary uppercase mb-4">2026 Season</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">Events</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Our annual Summer and Winter Recitals, plus community performances throughout the year.
          </p>
          <div className="w-16 h-1 bg-secondary rounded-full mx-auto mt-8" />
        </motion.div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div {...fadeIn} className="mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">Upcoming Events</h2>
            <p className="text-muted-foreground">Mark your calendars for the 2026 season.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {upcoming.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PAST EVENTS */}
      <section className="py-20 bg-muted/40 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div {...fadeIn} className="mb-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
              <History size={18} className="text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground/80">Past Events</h2>
              <p className="text-muted-foreground mt-1">A look back at our performances.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {past.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                past
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground text-white text-center">
        <motion.div {...fadeIn} className="max-w-xl mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold mb-4">Want to Host a Performance?</h3>
          <p className="text-white/70 mb-8">
            We'd love to bring NOCMF musicians to your school, museum, or community center. Reach out to get started.
          </p>
          <a
            href="mailto:hello@nocmf.org"
            className="inline-block px-8 py-4 rounded-full text-base font-semibold bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg"
          >
            Contact Us
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
