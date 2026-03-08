import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function ConfirmationPage() {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const adventure = location.state?.adventure;
  const participants = location.state?.participants;
  const amount = location.state?.amount;
  const paymentId = location.state?.paymentId;

  if (!adventure) {
    return (
      <div className="min-h-screen bg-black text-white">
        <NavBar />
        <div className="max-w-4xl mx-auto px-6 py-20 text-red-400">
          Confirmation page opened incorrectly.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">
          Booking Confirmed ✅
        </h1>

        <p className="mt-2 text-gray-400">
          Your payment is successful and booking is confirmed.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 space-y-4">
          <p className="text-lg font-semibold">{adventure.title}</p>
          <p className="text-gray-400">{adventure.location}</p>

          <div className="pt-4 space-y-2 text-gray-300">
            <p>
              <span className="text-gray-400">Booking ID:</span> {bookingId}
            </p>
            <p>
              <span className="text-gray-400">Participants:</span>{" "}
              {participants}
            </p>
            <p>
              <span className="text-gray-400">Amount Paid:</span> ₹{amount}
            </p>
            <p>
              <span className="text-gray-400">Payment ID:</span> {paymentId}
            </p>
          </div>

          <button
            onClick={() => navigate("/my-bookings")}
            className="mt-8 w-full rounded-2xl bg-white text-black py-4 font-semibold hover:bg-gray-200 transition"
          >
            Go to My Bookings
          </button>
        </div>
      </section>
    </div>
  );
}
