"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

function LandingPageNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full bg-[#0A0A0A] justify-between z-50 px-4 pt-4 ${
        isScrolled ? "top-0" : "top-10"
      }`}
    >
      <div
        className={`container mx-auto max-w-7xl rounded-xl transition-all duration-300 ${
          isScrolled ? " shadow-md py-2" : " backdrop-blur-sm py-4"
        }`}
      >
        <div className="mx-4 flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-2 overflow-hidden">
                  <Image
                    src="/logo.webp"
                    alt="Logo Diamate"
                    width={40}
                    height={40}
                  />
                </div>
                <span className="text-xl font-bold">DiaMate</span>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="hidden md:flex items-center space-x-8"
          >
            <Link href="#features" className="text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-white transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-white transition-colors">
              Testimonials
            </Link>
            <Link href="#faq" className="text-white transition-colors">
              FAQ
            </Link>
          </motion.nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0A]  border-t mt-2 rounded-b-xl"
          >
            <div className="mx-4 py-4 flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-gray-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#faq"
                className="text-gray-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

export default LandingPageNav;
