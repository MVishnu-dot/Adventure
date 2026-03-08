import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import { getAllAdventures } from "../api/adventure";

export default function ToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getAllAdventures();
        setTours(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-semibold tracking-tight">Tours</h1>
        <p className="mt-2 text-gray-400">
          Explore adventures directly from MongoDB.
        </p>

        {loading ? (
          <p className="mt-10 text-gray-400">Loading tours...</p>
        ) : tours.length === 0 ? (
          <p className="mt-10 text-gray-400">No tours found.</p>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={
                      tour.image_url ||
                      "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                    }
                    alt={tour.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-semibold">{tour.title}</h2>
                  <p className="mt-2 text-gray-400 text-sm">
                    📍 {tour.location}
                  </p>

                  <p className="mt-2 text-gray-400 text-sm">
                    💰 ₹{tour.price}
                  </p>

                  <Link
                    to={`/adventure/${tour.id}`}
                    className="mt-5 inline-block rounded-2xl border border-white/15 bg-transparent px-5 py-2 text-sm font-semibold hover:bg-white/10 transition"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
