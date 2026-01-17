import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import heroVideo from "../assets/MainPage.mp4"; // <-- your cinematic video
import { FocusCards } from "@/components/ui/focus-cards";


const featuredExperiences = [
  {
    title: "Desert Rally – Thar",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    title: "Mountain Trails – Himalayas",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  },
  {
    title: "Dirt Biking – Coorg",
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
  },
  {
    title: "River Rafting – Rishikesh",
    src: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190",
  },
  {
    title: "Sand Dunes – Dubai",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    title: "Jungle Safari – Northeast",
    src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084",
  },
];

export default function MainPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      
      {/* NAVBAR */}
      <NavBar />
  
      {/* HERO WITH VIDEO BACKGROUND */}
            <section className="relative h-[50vh] lg:h-[60vh] flex items-center justify-center">
        
        {/* VIDEO */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-6xl px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
            Adventure,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Re-imagined
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Premium off-road experiences, desert rallies and extreme adventures —
            curated for explorers.
          </p>

          {/* SEARCH */}
          <div className="mt-12 flex justify-center">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* FEATURED ADVENTURES */}
<section className="relative z-10 px-6 py-28 bg-gradient-to-b from-black to-slate-950">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-semibold tracking-tight mb-4">
      Featured Experiences
    </h2>

    <p className="text-gray-400 mb-14 max-w-2xl">
      Hand-picked adventures designed for thrill-seekers who demand premium
      experiences.
    </p>

    <FocusCards cards={featuredExperiences} />
  </div>
</section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-gray-500">
        © 2026 Adventure Booking. Crafted for explorers.
      </footer>
    </div>
  );
}
