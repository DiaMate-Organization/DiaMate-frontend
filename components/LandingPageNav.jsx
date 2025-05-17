"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import { Ghost, Menu, X } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { navItemLanding } from "@/lib/data";

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
      className={`fixed w-full rounded-md justify-between z-50 px-4 pt-4 ${
        isScrolled ? "top-0 md:top-2" : "top-10"
      }`}
    >
      <div
        className={`container mx-auto max-w-7xl backdrop-blur-lg rounded-xl bg-background/50 transition-all duration-300 ${
          isScrolled ? " shadow-md py-2" : " py-4"
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
            {navItemLanding.map((data, index) => (
              <Link
                key={index}
                href={data.link}
                className="text-foreground hover:text-primary transition-colors"
              >
                {data.name}
              </Link>
            ))}
            <ThemeToggle />
          </motion.nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex gap-3">
            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="hover:bg-primary"
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
            className="md:hidden backdrop-blur-lg  border-t mt-2 rounded-b-xl"
          >
            <div className="mx-4 py-4 flex flex-col space-y-4">
              {navItemLanding.map((data, index) => (
                <Link
                  key={index}
                  href={data.link}
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {data.name}
                </Link>
              ))}

              <Button
                variant={"primary"}
                className={"bg-primary hover:bg-secondary"}
              >
                Login
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

export default LandingPageNav;
