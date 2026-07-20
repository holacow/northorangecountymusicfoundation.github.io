import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, Clock, MapPin, ArrowLeft, Plus, Trash2, X, ImageOff } from "lucide-react";
import { loadEvents, saveEvents, type Event } from "./Events";

const SESSION_KEY = "nocmf-admin";

function findEvent(id: number): { event: Event | null; section: "upcoming" | "past" | null } {
  const { upcoming, past } = loadEvents();
  const u = upcoming.find((e) => e.id === id);
  if (u) return { event: u, section: "upcoming" };
  const p = past.find((e) => e.id === id);
  if (p) return { event: p, section: "past" };
  return { event: null, section: null };
}

function updateEventImages(id: number, images: string[]) {
  const { upcoming, past } = loadEvents();
  const newUpcoming = upcoming.map((e) => e.id === id ? { ...e, images } : e);
  const newPast = past.map((e) => e.id === id ? { ...e, images } : e);
  saveEvents(newUpcoming, newPast);
}

export default function EventDetail({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const [event, setEvent] = useState<Event | null>(null);
  const [isAdmin] = useState(() => sessionStorage.getItem(SESSION_KEY) === "true");
  const [newUrl, setNewUrl] = useState("");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [addingUrl, setAddingUrl] = useState(false);

  useEffect(() => {
    const { event: ev } = findEvent(id);
    setEvent(ev);
  }, [id]);

  const images = event?.images ?? [];

  const addImage = () => {
    const trimmed = newUrl.trim();
    if (!trimmed || !event) return;
    const updated = [...images, trimmed];
    updateEventImages(event.id, updated);
    setEvent({ ...event, images: updated });
    setNewUrl("");
    setAddingUrl(false);
  };

  const removeImage = (index: number) => {
    if (!event) return;
    const updated = images.filter((_, i) => i !== index);
    updateEventImages(event.id, updated);
    setEvent({ ...event, images: updated });
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-muted-foreground text-lg mb-4">Event not found.</p>
            <Link href="/events" className="text-primary hover:underline font-medium">← Back to Events</Link>
          </div>
        </div>
      </div>
    );
  }

  const typeColors: Record<string, string> = {
    recital: "hsl(26 80% 52%)",
    museum: "hsl(44 55% 54%)",
    senior: "hsl(140 50% 45%)",
  };
  const accentColor = typeColors[event.type] ?? typeColors.recital;

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
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-yellow-600 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto px-4"
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> Back to Events
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            {event.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Calendar size={14} style={{ color: accentColor }} />{event.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} style={{ color: accentColor }} />{event.time}</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} style={{ color: accentColor }} />{event.location}</span>
          </div>
          <div className="w-16 h-1 rounded-full mx-auto mt-8" style={{ background: accentColor }} />
        </motion.div>
      </section>

      {/* DESCRIPTION */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg leading-relaxed text-center"
          >
            {event.description}
          </motion.p>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-10 max-w-5xl mx-auto">
            <div>
              <p className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Gallery</p>
              <h2 className="text-3xl font-serif font-bold text-foreground">Event Photos</h2>
            </div>
            {isAdmin && (
              <button
                onClick={() => setAddingUrl(true)}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <Plus size={15} /> Add Photo
              </button>
            )}
          </div>

          {/* Add URL input */}
          {isAdmin && addingUrl && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto mb-8 bg-white rounded-2xl border border-border p-5 flex gap-3"
            >
              <input
                type="url"
                autoFocus
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addImage()}
                placeholder="Paste image URL (https://...)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button onClick={addImage} className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors">
                Add
              </button>
              <button onClick={() => { setAddingUrl(false); setNewUrl(""); }} className="p-2.5 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-colors">
                <X size={16} />
              </button>
            </motion.div>
          )}

          {/* Gallery grid */}
          {images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {images.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="relative group rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-white cursor-pointer"
                  onClick={() => setLightbox(src)}
                >
                  <img
                    src={src}
                    alt={`${event.title} photo ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {isAdmin && (
                    <button
                      onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="max-w-5xl mx-auto flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-border/50">
              <ImageOff size={48} className="text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground font-medium mb-2">No photos yet</p>
              {isAdmin ? (
                <p className="text-muted-foreground/70 text-sm">Click "Add Photo" above to upload image URLs for this event.</p>
              ) : (
                <p className="text-muted-foreground/70 text-sm">Photos from this event will appear here.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X size={22} />
          </button>
          <img
            src={lightbox}
            alt="Event photo"
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
