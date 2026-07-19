import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Smartphone } from "lucide-react";
import { useDonation } from "@/contexts/DonationContext";

export function DonationModal() {
  const { isOpen, closeDonation } = useDonation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDonation}
          />

          {/* Modal */}
          <motion.div
            key="modal"
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
                  onClick={closeDonation}
                  className="absolute top-4 right-4 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Heart size={18} className="text-primary" fill="currentColor" />
                  </div>
                  <span className="text-primary font-semibold text-xs tracking-widest uppercase">Support NOCMF</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-white">Donate via Zelle</h2>
                <p className="text-white/60 text-sm mt-1">Help us bring music beyond the classroom.</p>
              </div>

              {/* Body */}
              <div className="px-8 py-6 flex flex-col items-center text-center">
                {/* QR Code */}
                <div className="bg-white rounded-2xl border-2 border-border/60 p-3 mb-5 shadow-sm">
                  <img
                    src={`${import.meta.env.BASE_URL}images/zelle-qr.jpeg`}
                    alt="Zelle QR Code for NOCMF"
                    className="w-48 h-48 object-contain"
                  />
                </div>

                {/* Instructions */}
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <Smartphone size={16} className="text-primary flex-shrink-0" />
                  <span>Scan with your bank or Zelle app to donate</span>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 w-full mb-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">or send manually to</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Email */}
                <a
                  href="mailto:nocmusicfoundation@gmail.com"
                  className="text-sm font-semibold text-primary hover:underline mb-6"
                >
                  nocmusicfoundation@gmail.com
                </a>

                <button
                  onClick={closeDonation}
                  className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  Done
                </button>

                <p className="text-center text-xs text-muted-foreground mt-3">
                  Thank you for supporting music in our community 🎵
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
