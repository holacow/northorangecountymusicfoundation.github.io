import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Users, ArrowRight } from "lucide-react";

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VolunteerModal({ isOpen, onClose }: VolunteerModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="volunteer-backdrop"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="volunteer-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="px-8 pt-8 pb-6 text-white relative"
                style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #2d1a00 60%, #1A1A1A 100%)" }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users size={18} className="text-primary" />
                  </div>
                  <span className="text-primary font-semibold text-xs tracking-widest uppercase">Get Involved</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-white">Volunteer With Us</h2>
                <p className="text-white/60 text-sm mt-1">Join the team bringing music to our community.</p>
              </div>

              {/* Body */}
              <div className="px-8 py-6 flex flex-col items-center text-center">
                <p className="text-muted-foreground text-sm mb-6">
                  We are always looking for passionate volunteers to help with events, outreach, and operations. Reach out and let us know how you would like to contribute.
                </p>

                {/* Email card */}
                <div className="w-full bg-muted/50 rounded-2xl border border-border/60 p-5 mb-5">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                    <Mail size={16} className="text-primary flex-shrink-0" />
                    <span className="font-medium">Send us an email</span>
                  </div>
                  <a
                    href="mailto:nocmusicfoundation@gmail.com?subject=Volunteer%20With%20NOCMF"
                    className="text-sm font-semibold text-primary hover:underline break-all"
                  >
                    nocmusicfoundation@gmail.com
                  </a>
                </div>

                <a
                  href="mailto:nocmusicfoundation@gmail.com?subject=Volunteer%20With%20NOCMF"
                  className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  Send Email <ArrowRight size={15} />
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-3 mt-3 rounded-xl border border-border text-foreground/70 font-semibold text-sm hover:bg-muted transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
