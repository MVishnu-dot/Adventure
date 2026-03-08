import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import { getAdventureById } from "../api/adventure";

export default function AdventureDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [adventure, setAdventure] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdventure = async () => {
      try {
        const data = await getAdventureById(id);
        setAdventure(data);
      } catch (err) {
        console.log("Error loading adventure:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventure();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <NavBar />
        <div className="max-w-6xl mx-auto px-6 py-20 text-gray-400">
          Loading adventure details...
        </div>
      </div>
    );
  }

  if (!adventure) {
    return (
      <div className="min-h-screen bg-black text-white">
        <NavBar />
        <div className="max-w-6xl mx-auto px-6 py-20 text-red-400">
          Adventure not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      {/* HERO */}
      <section className="relative h-[65vh] w-full overflow-hidden">
        <img
  src={
    adventure.image_url ||
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  }
  alt={adventure.title}
  className="w-full h-full object-cover"
/>

<p className="mt-4 text-gray-300 leading-relaxed">
  {adventure.description}
</p>

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-end pb-14">
          <div className="max-w-3xl">
            <p className="text-sm text-gray-300 mb-2">
              📍 {adventure.location} • 🗓️{" "}
              {new Date(adventure.date).toDateString()}
            </p>

            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
              {adventure.title}
            </h1>

            <p className="mt-4 text-gray-300 text-lg leading-relaxed">
              {adventure.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-3">
                💰 <span className="text-gray-300">Price:</span>{" "}
                <span className="font-semibold">₹{adventure.price}</span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-3">
                👥 <span className="text-gray-300">Max:</span>{" "}
                <span className="font-semibold">
                  {adventure.max_participants} people
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-3">
                🧑‍💼 <span className="text-gray-300">Created by:</span>{" "}
                <span className="font-semibold">{adventure.created_by}</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/booking/${adventure.id}`)}
              className="mt-10 text-white font-semibold hover:text-gray-300 transition"

            >
              Book This Adventure →
            </button>
          </div>
        </div>
      </section>

      {/* EXTRA DETAILS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left: Highlights */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-6">
              What you’ll experience ✨
            </h2>

            <ul className="space-y-4 text-gray-300 leading-relaxed">
             {adventure.description}
            </ul>

            <p className="mt-8 text-gray-400 text-sm">
              Note: The final itinerary depends on weather and local conditions.
            </p>
          </div>

          {/* Right: Quick Summary */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
            <h3 className="text-xl font-semibold mb-6">Quick Summary</h3>

            <div className="space-y-4 text-gray-300">
              <div className="flex justify-between">
                <span>📍 Location</span>
                <span className="font-medium">{adventure.location}</span>
              </div>

              <div className="flex justify-between">
                <span>🗓️ Date</span>
                <span className="font-medium">
                  {new Date(adventure.date).toDateString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>💰 Price</span>
                <span className="font-medium">₹{adventure.price}</span>
              </div>

              <div className="flex justify-between">
                <span>👥 Max</span>
                <span className="font-medium">{adventure.max_participants}</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/booking/${adventure.id}`)}
              className="mt-10 w-full rounded-2xl bg-white text-black py-4 font-semibold hover:bg-gray-200 transition"
            >
              Continue →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
