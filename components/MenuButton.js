export default function MenuButton({ isOpen, onToggle }) {
  return (
    <div className="fixed w-full top-6 left-0 z-50 px-4 md:px-10 lg:px-20">
      <div className="max-w-[1280px] mx-auto">
        <button
          type="button"
          onClick={onToggle}
          className="block ml-auto border border-zinc-700/50 w-[132px] py-2 rounded-[3rem] text-center bg-black/80 backdrop-blur text-white font-black tracking-widest uppercase transition-colors hover:bg-zinc-800"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>
    </div>
  );
}
