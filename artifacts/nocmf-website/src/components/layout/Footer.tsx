import React, { useState } from "react";
import { Music, Mail, MapPin, Phone, Instagram, Facebook, Link as LinkIcon } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="md:col-span-2 space-y-4 max-w-sm">
            <div className="flex items-center gap-2">
              {!logoError ? (
                <img
                  src={`${import.meta.env.BASE_URL}images/logo.png`}
                  alt="NOCMF Logo"
                  className="h-10 w-auto object-contain brightness-0 invert"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <>
                  <div className="bg-primary text-white p-2 rounded-lg">
                    <Music size={20} />
                  </div>
                  <span className="font-serif font-bold text-2xl tracking-tight">NOCMF</span>
                </>
              )}
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              North Orange County Music Foundation — bringing music beyond the classroom and into the heart of everyday life since 2024.
            </p>
            <div className="flex gap-3 pt-1">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold mb-5 text-white/90">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-white/60 hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/#mission" className="text-white/60 hover:text-secondary transition-colors">Our Mission</Link></li>
              <li><Link href="/events" className="text-white/60 hover:text-secondary transition-colors">Events</Link></li>
              <li><Link href="/members" className="text-white/60 hover:text-secondary transition-colors">Members</Link></li>
              <li><Link href="/supporters" className="text-white/60 hover:text-secondary transition-colors">Supporters</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold mb-5 text-white/90">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-white/60">
                <Phone className="mt-0.5 flex-shrink-0 text-primary" size={16} />
                <span>(714) 746-6115</span>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <Mail className="mt-0.5 flex-shrink-0 text-primary" size={16} />
                <a href="mailto:nocmusicfoundation@gmail.com" className="hover:text-secondary transition-colors">nocmusicfoundation@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="mt-0.5 flex-shrink-0 text-primary" size={16} />
                <span>
                  3890 Prospect Ave, Suite J<br />
                  Yorba Linda, CA 92886
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} North Orange County Music Foundation. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
