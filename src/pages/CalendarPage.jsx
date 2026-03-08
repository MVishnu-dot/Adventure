import { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import { getMyBookings } from "../api/bookings";

export default function CalendarPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // sort by date
  const sorted = [...bookings].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      <section className="max-w-6xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-semibold tracking-tight">EXCITEDDD</h1>
        <p className="mt-2 text-gray-400">
          YOUUU UPPPPP!!!!
        </p>

        {loading ? (
          <p className="mt-10 text-gray-400">Loading calendar...</p>
        ) : sorted.length === 0 ? (
          <p className="mt-10 text-gray-400">
            No bookings yet. Book a tour first.
          </p>
        ) : (
          <div className="mt-10 space-y-6">
            {sorted.map((b) => (
              <div
                key={b.id}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xl font-semibold">
                      🗓️ {new Date(b.date).toDateString()}
                    </p>

                    <p className="mt-2 text-gray-400 text-sm">
                      👥 Participants: {b.participants}
                    </p>

                    <p className="mt-2 text-gray-400 text-sm">
                      🧭 Adventure ID: {b.adventure_id}
                    </p>
                  </div>

                  <span className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm">
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
