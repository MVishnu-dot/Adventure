import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { booking, adventure, paymentStatus } = location.state || {};

  if (!booking || !adventure) {
    return (
      <div className="min-h-screen bg-black text-white">
        <NavBar />
        <p className="text-center mt-40 text-red-400">
          Confirmation page opened without booking data.
        </p>
      </div>
    );
  }

  const participants = booking.participants || 1;
  const totalAmount = participants * adventure.price;

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            {paymentStatus === "paid"
              ? "Booking Confirmed ✅"
              : "Payment Failed ❌"}
          </h1>

          <p className="mt-4 text-gray-300">
            {paymentStatus === "paid"
              ? "Your adventure booking is confirmed. You can view it in My Bookings."
              : "Your booking is created but payment failed. Try again."}
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
            <h2 className="text-lg font-semibold">Booking Details</h2>

            <div className="mt-5 space-y-2 text-gray-300 text-sm">
              <p>
                <span className="text-gray-400">Adventure:</span>{" "}
                <span className="text-white">{adventure.title}</span>
              </p>

              <p>
                <span className="text-gray-400">Location:</span>{" "}
                <span className="text-white">{adventure.location}</span>
              </p>

              <p>
                <span className="text-gray-400">Date:</span>{" "}
                <span className="text-white">
                  {new Date(booking.date).toDateString()}
                </span>
              </p>

              <p>
                <span className="text-gray-400">Participants:</span>{" "}
                <span className="text-white">{participants}</span>
              </p>

              <p>
                <span className="text-gray-400">Total Paid:</span>{" "}
                <span className="text-white font-semibold">₹{totalAmount}</span>
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => navigate("/main")}
              className="rounded-2xl border border-white/10 bg-transparent py-3 font-semibold hover:bg-white/5 transition"
            >
              Back to Main Page
            </button>

            <button
              onClick={() => navigate("/my-bookings")}
              className="rounded-2xl bg-white text-black py-3 font-semibold hover:bg-gray-200 transition"
            >
              View My Bookings →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
