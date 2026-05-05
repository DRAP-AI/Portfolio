import Link from "next/link";

export default function NavigationOverlay({ isOpen, onClose }) {
  const menuItems = ["Home", "Our Works", "Our Toolkit", "Contact"];

  return (
    <nav
      className={`fixed inset-0 min-h-screen w-full z-40 transition-transform duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{
        background: `radial-gradient(at 60% 31%, rgb(255, 131, 139) 0px, transparent 50%),
          radial-gradient(at 48% 98%, rgba(0, 255, 166, 0.707) 0px, transparent 50%),
          radial-gradient(at 84% 67%, rgb(255, 129, 125) 0px, transparent 50%),
          radial-gradient(at 16% 47%, rgb(255, 90, 112) 0px, transparent 50%),
          radial-gradient(at 73% 11%, rgb(115, 255, 225) 0px, transparent 50%),
          radial-gradient(at 49% 37%, rgba(255, 249, 89, 0.695) 0px, transparent 50%),
          radial-gradient(at 70% 21%, rgba(58, 255, 186, 0.715) 0px, transparent 50%)`,
        backgroundColor: "#ff5e99",
      }}
    >
      <ol className="absolute top-1/2 left-[15%] -translate-y-1/2 list-none space-y-6">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <Link
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              onClick={onClose}
              className="group relative inline-block text-[3rem] font-black text-white no-underline"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
