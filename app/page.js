"use client";

import { useState, useEffect } from "react";
import Link from "next/link";


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className={`relative min-h-screen text-zinc-300 font-sans overflow-hidden bg-black`}>
      {/* Menu Button Container */}
      <div className="fixed w-full top-6 left-0 z-50 px-4 md:px-10 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block ml-auto border border-zinc-700/50 w-[132px] py-2 rounded-[3rem] text-center bg-black/80 backdrop-blur text-white font-black tracking-widest uppercase transition-colors hover:bg-zinc-800"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Navigation Overlay */}
      <nav
        className={`fixed inset-0 min-h-screen w-full z-40 transition-transform duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{
          background: `radial-gradient(at 60% 31%, rgb(255, 131, 139) 0px, transparent 50%),
            radial-gradient(at 48% 98%, rgba(0, 255, 166, 0.707) 0px, transparent 50%),
            radial-gradient(at 84% 67%, rgb(255, 129, 125) 0px, transparent 50%),
            radial-gradient(at 16% 47%, rgb(255, 90, 112) 0px, transparent 50%),
            radial-gradient(at 73% 11%, rgb(115, 255, 225) 0px, transparent 50%),
            radial-gradient(at 49% 37%, rgba(255, 249, 89, 0.695) 0px, transparent 50%),
            radial-gradient(at 70% 21%, rgba(58, 255, 186, 0.715) 0px, transparent 50%)`,
          backgroundColor: '#ff5e99'
        }}
      >
        <ol className="absolute top-1/2 left-[15%] -translate-y-1/2 list-none space-y-6">
          {["Home", "My Work", "See Blog", "My Skills", "Contact"].map((item, idx) => (
            <li key={idx}>
              <Link
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={() => setIsMenuOpen(false)}
                className="group relative inline-block text-[3rem] font-black text-white no-underline"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      {/* Header Section */}
      <header
        className="relative min-h-[calc(100vh+85px)] flex items-center bg-fixed bg-cover bg-center bg-no-repeat pt-28 pb-10"
        style={{
          backgroundImage: `linear-gradient(#0000008b, #000000e6), url('/hero-bg.webp')`,
        }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 relative z-10">
          <div className="max-w-[745px]">
            <h1 className="text-[2.145rem] sm:text-[2.845rem] md:text-[3.5rem] leading-[1.2] font-black text-white mb-4">
              <span className="block">Hi, We are DRAP AI</span>
              <span className="block">Creative Web Developers</span>
            </h1>

            <p className="text-lg md:text-[1.6rem] leading-[1.4] text-[#989898] mt-4 mb-10 font-light max-w-[745px]">
              We are a team of creative web developers who build beautiful and user-friendly websites for local businesses, startups, organizations and many more.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="#contact"
                className="px-[60px] py-[18px] text-center rounded-[0.5rem] bg-white text-black font-bold text-[1.35rem] transition-shadow hover:shadow-[#ffffff40_0_0_0_0.5rem]"
              >
                Lorem
              </Link>
              <Link
                href="#work"
                className="px-[60px] py-[18px] text-center rounded-[0.5rem] border border-[#c0c0c02f] text-white font-bold text-[1.35rem] transition-colors hover:border-white"
              >
                See my work
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
