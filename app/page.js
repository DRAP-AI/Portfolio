import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import Work from "@/components/Work.jsx";

export default function Home() {
  return (
    <div className={`relative min-h-screen text-zinc-300 font-sans overflow-hidden bg-transparent`}>
      <MobileMenu />

      {/* Header Section */}
      <header
        className="min-h-[calc(100vh+85px)] flex items-center bg-fixed bg-cover bg-center pt-28 pb-10"
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
      
      {/* Work Section */}
      <Work id='work'/>
    </div>
  );
}
