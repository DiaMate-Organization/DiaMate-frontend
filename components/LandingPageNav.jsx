"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import { Ghost, Menu, X, User } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { navItemLanding } from "@/lib/data";
import { isAuthenticated, logout, getAuthToken } from "@/lib/auth-actions"; // Import fungsi auth

function LandingPageNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Cek status login dan ambil data user
  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = isAuthenticated();
      setIsLoggedIn(loggedIn);
      
      if (loggedIn) {
        try {
          const token = getAuthToken();
          // Jika Anda ingin menampilkan data user, bisa fetch profile di sini
          // const profile = await getProfile();
          // setUserData(profile);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          logout(); // Auto logout jika token invalid
        }
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsLoggedIn(false);
  };

  return (
    <header
      className={`fixed w-full rounded-md justify-between z-50 px-4 pt-4 ${
        isScrolled ? "top-0 md:top-2" : "top-10"
      }`}
    >
      <div
        className={`container mx-auto max-w-7xl backdrop-blur-lg rounded-xl transition-all duration-300 ${
          isScrolled
            ? "shadow-md py-2 bg-background/50"
            : "py-4 bg-transparent"
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
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center mr-2 overflow-hidden">
                  <Image
                    src="/logo.webp"
                    alt="Logo Diamate"
                    width={40}
                    height={40}
                  />
                </div>
                <span className="text-md md:text-xl font-bold">DiaMate</span>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="hidden lg:flex items-center space-x-8"
          >
            {navItemLanding.map((data, index) => (
              <Link
                key={index}
                href={data.link}
                className="text-foreground hover:text-muted-foreground transition-colors"
              >
                {data.name}
              </Link>
            ))}
            <ThemeToggle />
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button className="gap-2 hover:bg-secondary">
                    <User className="h-4 w-4" />
                    {userData?.name || 'Dashboard'}
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="hover:bg-destructive hover:text-destructive-foreground"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button className="hover:bg-secondary">Sign In</Button>
              </Link>
            )}
          </motion.nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex gap-3">
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
            className="lg:hidden backdrop-blur-lg border-t mt-2 rounded-b-xl"
          >
            <div className="mx-4 py-4 flex flex-col space-y-4">
              {navItemLanding.map((data, index) => (
                <Link
                  key={index}
                  href={data.link}
                  className="text-foreground hover:text-muted-foreground transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {data.name}
                </Link>
              ))}

              {isLoggedIn ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="w-full sm:w-auto"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant={"primary"}
                      className={"bg-primary hover:bg-secondary w-full gap-2"}
                    >
                      <User className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant={"outline"}
                    className={"w-full hover:bg-destructive hover:text-destructive-foreground"}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link 
                  href="/login" 
                  className="w-full sm:w-auto"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant={"primary"}
                    className={"bg-primary hover:bg-secondary w-full"}
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

export default LandingPageNav;