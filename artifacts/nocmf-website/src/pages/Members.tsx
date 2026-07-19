import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Music, Crown, DollarSign, CalendarDays, FileText, Megaphone, Users } from "lucide-react";
import { volunteers } from "@/data/volunteers";

const members = [
  {
    name: "Dr. Wenjin Liu",
    roles: ["Founder"],
    icons: [Music],
    tenure: "2024 – 2026",
    bio: "Dr. Wenjin Liu founded the North Orange County Music Foundation with a deep belief that every young musician deserves the chance to share their gift with the world. Her vision — bringing live music into the everyday fabric of community life — is the heart of everything NOCMF does.",
    accent: "secondary" as const,
  },
  {
    name: "Ethan Zhang",
    roles: ["President", "Treasurer"],
    icons: [Crown, DollarSign],
    tenure: "2024 – 2026",
    bio: "Ethan Zhang leads NOCMF as both President and Treasurer, driving the organization's growth and ensuring its financial health. He is committed to expanding performance opportunities for young musicians across North Orange County's schools, museums, and senior centers.",
    accent: "primary" as const,
  },
  {
    name: "Claire Chen",
    roles: ["Event Coordinator"],
    icons: [CalendarDays],
    tenure: "2024 – 2026",
    bio: "Claire Chen brings organization and passion to every NOCMF performance. As Event Coordinator, she ensures each recital and community engagement runs smoothly — from venue logistics to day-of coordination — so musicians and audiences can focus on the music.",
    accent: "secondary" as const,
  },
  {
    name: "Benjamin Zhang",
    roles: ["Secretary"],
    icons: [FileText],
    tenure: "2024 – 2026",
    bio: "Benjamin Zhang keeps NOCMF running smoothly behind the scenes. As Secretary, he manages meeting records, handles organizational correspondence, and ensures clear communication across the team — so every decision and plan is captured and acted on.",
    accent: "primary" as const,
  },
  {
    name: "Uma Zhou",
    roles: ["Outreach Coordinator"],
    icons: [Megaphone],
    tenure: "2024 – 2026",
    bio: "Uma Zhou connects NOCMF with the broader community. As Outreach Coordinator, she builds relationships with schools, venues, and local organizations, spreading awareness of the foundation's mission and bringing new audiences to every performance.",
    accent: "secondary" as const,
  },
];

const COLORS = {
  primary: { bg: "hsl(26 80% 52%)", light: "hsl(26 80% 52% / 0.12)", text: "hsl(26 80% 40%)" },
  secondary: { bg: "hsl(44 55% 54%)", light: "hsl(44 55% 54% / 0.15)", text: "hsl(44 55% 36%)" },
};

export default function Members() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />

      {/* PAGE HERO */}
      <section
        className="relative pt-40 pb-28 flex items-center justify-center text-center"
        style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #2d1a00 50%, #1A1A1A 100%)" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orange-500 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-yellow-600 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl mx-auto px-4"
        >
          <p className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Our Team</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Meet the Members
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            The dedicated individuals who make NOCMF's mission possible.
          </p>
          <div className="w-16 h-1 bg-secondary rounded-full mx-auto mt-8" />
        </motion.div>
      </section>

      {/* MEMBERS GRID */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {members.map((member, i) => {
              const color = COLORS[member.accent];
              const initials = member.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="bg-white rounded-3xl shadow-md border border-border/40 overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Top accent */}
                  <div className="h-1.5 w-full" style={{ background: color.bg }} />

                  <div className="p-8 flex flex-col flex-1 items-center text-center">
                    {/* Avatar */}
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-serif font-bold mb-5 shadow-lg ring-4 ring-white"
                      style={{ background: color.bg }}
                    >
                      {initials}
                    </div>

                    {/* Name */}
                    <h2 className="text-xl font-serif font-bold text-foreground mb-3 leading-tight">
                      {member.name}
                    </h2>

                    {/* Role badges */}
                    <div className="flex flex-wrap gap-2 mb-5 justify-center">
                      {member.roles.map((role, ri) => {
                        const Icon = member.icons[ri];
                        return (
                          <span
                            key={role}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                            style={{ background: color.light, color: color.text }}
                          >
                            {Icon && <Icon size={12} />}
                            {role}
                          </span>
                        );
                      })}
                    </div>

                    {/* Tenure */}
                    <p className="text-xs text-muted-foreground mb-4 font-medium tracking-wide">
                      Member since {member.tenure}
                    </p>

                    {/* Divider */}
                    <div className="w-8 h-0.5 rounded-full mb-5" style={{ background: color.bg }} />

                    {/* Bio */}
                    <p className="text-muted-foreground leading-relaxed text-sm flex-1">{member.bio}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VOLUNTEERS SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
                <Users size={18} className="text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Volunteers</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Our volunteers help support performances, event preparation, community outreach, and other North Orange County Music Foundation activities.
            </p>
            <div className="w-16 h-1 bg-secondary rounded-full mx-auto mt-6" />
          </motion.div>

          {volunteers.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center text-muted-foreground/70 text-sm"
            >
              Volunteer names will be added soon.
            </motion.p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {volunteers.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-muted rounded-2xl border border-border/40 px-6 py-5 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <p className="font-serif font-semibold text-foreground">{name}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
