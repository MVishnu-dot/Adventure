import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import heroVideo from "../assets/MainPage.mp4"; // <-- your cinematic video

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
      <section className="relative z-10 px-6 py-24 bg-gradient-to-b from-black to-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-10">
            Featured Experiences
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Desert Rally – Thar",
              "Mountain Trails – Himalayas",
              "Dirt Biking – Coorg",
              "River Rafting – Rishikesh",
              "Sand Dunes – Dubai",
              "Jungle Safari – Northeast",
            ].map((title, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:border-white/20 transition"
              >
                <div className="p-6">
                  <h3 className="text-lg font-medium group-hover:text-indigo-400 transition">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2">
                    Curated premium adventure with expert guides.
                  </p>

                  <button className="mt-4 text-sm font-medium text-indigo-400 hover:text-indigo-300">
                    Explore →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-gray-500">
        © 2026 Adventure Booking. Crafted for explorers.
      </footer>
    </div>
  );
}
