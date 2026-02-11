import { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import { getMyBookings, cancelBooking } from "../api/bookings";
import { getMyPayments } from "../api/payments";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const b = await getMyBookings();
      const p = await getMyPayments();

      setBookings(b);
      setPayments(p);
    } catch (err) {
      console.log(err);
      alert("Failed to load bookings. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const getPaymentStatusForBooking = (bookingId) => {
    const payment = payments.find((p) => p.booking_id === bookingId);
    if (!payment) return "not_paid";
    return payment.status;
  };

  const handleCancel = async (bookingId) => {
    const ok = confirm("Are you sure you want to cancel this booking?");
    if (!ok) return;

    try {
      await cancelBooking(bookingId);
      alert("Booking cancelled ✅");
      fetchAll();
    } catch (err) {
      console.log(err);
      alert("Cancel failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">My Bookings</h1>
        <p className="mt-2 text-gray-400">
          Track your bookings, payment status, and cancel anytime.
        </p>

        {loading && (
          <p className="text-gray-400 text-center mt-16">Loading...</p>
        )}

        {!loading && bookings.length === 0 && (
          <p className="text-gray-400 text-center mt-16">
            No bookings yet. Go book an adventure 😄
          </p>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {bookings.map((b) => {
            const payStatus = getPaymentStatusForBooking(b.id);

            return (
              <div
                key={b.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">
                      Booking ID:{" "}
                      <span className="text-gray-300 font-medium">
                        {b.id.slice(-6)}
                      </span>
                    </h2>

                    <p className="mt-2 text-sm text-gray-300">
                      <span className="text-gray-400">Adventure ID:</span>{" "}
                      {b.adventure_id}
                    </p>

                    <p className="mt-2 text-sm text-gray-300">
                      <span className="text-gray-400">Date:</span>{" "}
                      {new Date(b.date).toDateString()}
                    </p>

                    <p className="mt-2 text-sm text-gray-300">
                      <span className="text-gray-400">Participants:</span>{" "}
                      {b.participants || 1}
                    </p>
                  </div>

                  {/* STATUS */}
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Payment</p>

                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold
                      ${
                        payStatus === "paid"
                          ? "bg-green-500/15 text-green-300 border border-green-500/30"
                          : payStatus === "failed"
                          ? "bg-red-500/15 text-red-300 border border-red-500/30"
                          : "bg-white/10 text-gray-200 border border-white/10"
                      }`}
                    >
                      {payStatus === "paid"
                        ? "PAID"
                        : payStatus === "failed"
                        ? "FAILED"
                        : "NOT PAID"}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-white/10 my-6" />

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    Booking Status:{" "}
                    <span className="text-white font-medium">{b.status}</span>
                  </p>

                  <button
                    onClick={() => handleCancel(b.id)}
                    className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
