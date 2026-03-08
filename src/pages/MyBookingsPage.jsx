import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { getMyBookings, cancelBooking } from "../api/bookings";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (err) {
      console.log(err);
      alert("Failed to load bookings. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    const ok = confirm("Cancel this booking?");
    if (!ok) return;

    try {
      await cancelBooking(bookingId);
      fetchBookings();
    } catch (err) {
      console.log(err);
      alert("Cancel failed.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">
          My Bookings
        </h1>
        <p className="mt-2 text-gray-400">
          View and manage your bookings.
        </p>

        {loading && (
          <p className="mt-12 text-gray-400">Loading bookings...</p>
        )}

        {!loading && bookings.length === 0 && (
          <p className="mt-12 text-gray-400">
            No bookings found.
          </p>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm text-gray-400">Booking ID</p>
              <p className="mt-1 text-xs break-all text-gray-300">
                {b.id}
              </p>

              <div className="mt-5 flex justify-between text-gray-300">
                <span>Status</span>
                <span className="font-semibold">{b.status}</span>
              </div>

              <div className="mt-3 flex justify-between text-gray-300">
                <span>Date</span>
                <span>{new Date(b.date).toDateString()}</span>
              </div>

              <button
                onClick={() => handleCancel(b.id)}
                className="mt-6 w-full rounded-2xl border border-white/15 py-3 font-semibold hover:bg-white/10 transition"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
