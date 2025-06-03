import "../globals.css";
import LandingPageNav from "@/components/LandingPageNav";
import { Marquee } from "@/components/magicui/marquee";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export default function LandingPageLayout({ children }) {
  return (
    <>
      <div className="w-full mb-5 bg-yellow-100 text-yellow-900 px-4 text-sm md:text-base text-center flex items-center justify-center gap-5 border-b border-yellow-300">
        <Marquee>
          <strong className="font-medium">Perhatian:</strong> Hasil dari DiaMate
          bersifat prediktif awal dan bukan diagnosis medis.
        </Marquee>
      </div>
      {/* Navbar */}
      <div className="relative z-10">
        <LandingPageNav />
        <main className="px-8 md:px-20 mt-14">{children}</main>
      </div>
      {/* Footer */}
      <Footer />
      <ChatBot />
    </>
  );
}
