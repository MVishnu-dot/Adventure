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
        console.log("Error:", err);
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
        <p className="text-center mt-40 text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!adventure) {
    return (
      <div className="min-h-screen bg-black text-white">
        <NavBar />
        <p className="text-center mt-40 text-red-400">Adventure not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* TOP */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* IMAGE */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <img
              src={
                adventure.image_url ||
                "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
              }
              alt={adventure.title}
              className="w-full h-[420px] object-cover"
            />
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              {adventure.title}
            </h1>

            <p className="mt-3 text-gray-300 text-lg">
              {adventure.location} •{" "}
              <span className="text-white font-semibold">₹{adventure.price}</span>
            </p>

            {/* QUICK STATS */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-gray-400">Date</p>
                <p className="mt-1 font-medium">
                  {new Date(adventure.date).toDateString()}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-gray-400">Max Participants</p>
                <p className="mt-1 font-medium">{adventure.max_participants}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-gray-400">Difficulty</p>
                <p className="mt-1 font-medium">Moderate</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-gray-400">Duration</p>
                <p className="mt-1 font-medium">1–2 Days</p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate(`/booking/${adventure.id}`)}
              className="mt-10 w-full rounded-2xl bg-white text-black py-3 font-semibold hover:bg-gray-200 transition"
            >
              Book Now →
            </button>
          </div>
        </div>

        {/* DESCRIPTION SECTION */}
        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {/* ABOUT */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-xl font-semibold tracking-tight">
              About this adventure
            </h2>

            <p className="mt-4 text-gray-300 leading-relaxed">
              {adventure.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="font-medium">✔ Premium experience</p>
                <p className="text-sm text-gray-400 mt-1">
                  Curated routes, safe planning, and best locations.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="font-medium">✔ Verified guides</p>
                <p className="text-sm text-gray-400 mt-1">
                  Expert local team & route support.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="font-medium">✔ Safety first</p>
                <p className="text-sm text-gray-400 mt-1">
                  Medical kit + planned checkpoints.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="font-medium">✔ Flexible booking</p>
                <p className="text-sm text-gray-400 mt-1">
                  Cancel anytime before start.
                </p>
              </div>
            </div>
          </div>

          {/* SIDE CARD */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-lg font-semibold tracking-tight">
              Booking Summary
            </h3>

            <div className="mt-6 space-y-3 text-gray-300 text-sm">
              <p>
                <span className="text-gray-400">Location:</span>{" "}
                <span className="text-white">{adventure.location}</span>
              </p>
              <p>
                <span className="text-gray-400">Price per person:</span>{" "}
                <span className="text-white">₹{adventure.price}</span>
              </p>
              <p>
                <span className="text-gray-400">Seats available:</span>{" "}
                <span className="text-white">{adventure.max_participants}</span>
              </p>
            </div>

            <button
              onClick={() => navigate(`/booking/${adventure.id}`)}
              className="mt-8 w-full rounded-2xl border border-white/10 bg-transparent py-3 font-semibold text-white hover:bg-white/5 transition"
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
