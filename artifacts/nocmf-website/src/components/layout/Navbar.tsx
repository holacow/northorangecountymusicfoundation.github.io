import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Music, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useDonation } from "@/contexts/DonationContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { openDonation } = useDonation();
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", page: true },
    { name: "About Us", href: "/about", page: true },
    { name: "Events", href: "/events", page: true },
    { name: "Members", href: "/members", page: true },
    { name: "Supporters", href: "/supporters", page: true },
  ];


  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-4"
          : "bg-black/30 backdrop-blur-sm py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          {!logoError ? (
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="NOCMF Logo"
              className="h-10 w-auto object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <>
              <div className="bg-primary text-white p-2 rounded-lg group-hover:bg-secondary group-hover:text-black transition-colors duration-300">
                <Music size={24} />
              </div>
              <span className={cn(
                "font-serif font-bold text-2xl tracking-tight transition-colors duration-300",
                scrolled ? "text-foreground" : "text-white drop-shadow-md"
              )}>
                NOCMF
              </span>
            </>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.page ? (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors",
                  scrolled ? "text-foreground/80" : "text-white/90 hover:text-white drop-shadow-sm",
                  location === link.href && "text-primary"
                )}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={isHome ? link.href : `/${link.href}`}
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors",
                  scrolled ? "text-foreground/80" : "text-white/90 hover:text-white drop-shadow-sm"
                )}
              >
                {link.name}
              </a>
            )
          )}
          <Button
            onClick={openDonation}
            variant={scrolled ? "default" : "white"}
            className="ml-4"
          >
            Support Us
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={cn("md:hidden p-2", scrolled ? "text-foreground" : "text-white")}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background shadow-xl p-6 flex flex-col gap-4 border-t md:hidden"
          >
            {navLinks.map((link) =>
              link.page ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium text-foreground p-2 hover:bg-muted rounded-md",
                    location === link.href && "text-primary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={isHome ? link.href : `/${link.href}`}
                  className="text-lg font-medium text-foreground p-2 hover:bg-muted rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            )}
            <Button onClick={() => {
              openDonation();
              setMobileMenuOpen(false);
            }} className="w-full mt-4" size="lg">
              Support Us
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
