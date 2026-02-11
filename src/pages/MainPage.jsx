import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import heroVideo from "../assets/MainPage.mp4";

import { getAllAdventures } from "../api/adventure";

export default function MainPage() {
  const [adventures, setAdventures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const data = await getAllAdventures();
        setAdventures(data);
      } catch (err) {
        console.log("Error fetching adventures:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventures();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* NAVBAR */}
      <NavBar />

      {/* HERO WITH VIDEO BACKGROUND */}
      <section className="relative h-[50vh] lg:h-[60vh] flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

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

          {/* LOADING */}
          {loading && (
            <p className="text-gray-400 text-center">Loading adventures...</p>
          )}

          {/* GRID */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {adventures.map((item) => (
              <Link
                key={item.id}
                to={`/adventure/${item.id}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/20 transition"
              >
                {/* IMAGE */}
                <img
                  src={
                    item.image_url ||
                    "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                  }
                  alt={item.title}
                  className="h-56 w-full object-cover group-hover:scale-105 transition duration-500"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-0 p-5">
                  <h3 className="text-lg font-medium tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-300">
                    {item.location} • ₹{item.price}
                  </p>

                  <button className="mt-3 text-sm font-medium text-indigo-400 hover:text-indigo-300">
                    Explore →
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black px-6 py-16">
        <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Adventure Booking</h3>
            <p className="text-sm text-gray-400 max-w-xs">
              Premium adventure experiences crafted for explorers who seek more
              than ordinary travel.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">
                Desert Adventures
              </li>
              <li className="hover:text-white cursor-pointer">
                Mountain Trails
              </li>
              <li className="hover:text-white cursor-pointer">Water Sports</li>
              <li className="hover:text-white cursor-pointer">
                Luxury Safaris
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
              <li className="hover:text-white cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Follow</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Instagram</li>
              <li className="hover:text-white cursor-pointer">YouTube</li>
              <li className="hover:text-white cursor-pointer">X (Twitter)</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          © 2026 Adventure Booking. Designed for explorers.
        </div>
      </footer>
    </div>
  );
}
