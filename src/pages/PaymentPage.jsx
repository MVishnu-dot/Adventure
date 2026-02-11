import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import NavBar from "../components/NavBar";
import { createFakeOrder, fakePaymentSuccess, fakePaymentFail } from "../api/payments";

export default function PaymentPage() {
  const { adventureId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { booking, adventure } = location.state || {};

  const [loading, setLoading] = useState(false);

  if (!booking || !adventure) {
    return (
      <div className="min-h-screen bg-black text-white">
        <NavBar />
        <p className="text-center mt-40 text-red-400">
          Payment page opened without booking data.
        </p>
      </div>
    );
  }

  const participants = booking.participants || 1;
  const totalAmount = participants * adventure.price;

  const handleCreateOrder = async () => {
    try {
      setLoading(true);

      await createFakeOrder({
        booking_id: booking.id,
        amount: totalAmount,
      });

      alert("Fake Order Created ✅");
    } catch (err) {
      console.log(err);
      alert("Order creation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = async () => {
    try {
      setLoading(true);

      await fakePaymentSuccess({
        booking_id: booking.id,
        payment_id: "FAKE_" + Date.now(),
      });

      navigate(`/confirmation/${adventureId}`, {
        state: { booking, adventure, paymentStatus: "paid" },
      });
    } catch (err) {
      console.log(err);
      alert("Payment success update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleFail = async () => {
    try {
      setLoading(true);

      await fakePaymentFail({
        booking_id: booking.id,
      });

      navigate(`/confirmation/${adventureId}`, {
        state: { booking, adventure, paymentStatus: "failed" },
      });
    } catch (err) {
      console.log(err);
      alert("Payment failed update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Payment</h1>
        <p className="mt-2 text-gray-400">
          Complete your booking payment (fake payment gateway for project).
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          {/* SUMMARY */}
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-6 space-y-3 text-gray-300">
            <p>
              <span className="text-gray-400">Adventure:</span>{" "}
              <span className="text-white">{adventure.title}</span>
            </p>

            <p>
              <span className="text-gray-400">Location:</span>{" "}
              <span className="text-white">{adventure.location}</span>
            </p>

            <p>
              <span className="text-gray-400">Participants:</span>{" "}
              <span className="text-white">{participants}</span>
            </p>

            <p>
              <span className="text-gray-400">Price per person:</span>{" "}
              <span className="text-white">₹{adventure.price}</span>
            </p>
          </div>

          <div className="h-px bg-white/10 my-6" />

          <div className="flex items-center justify-between">
            <span className="text-gray-300 font-medium">Total Amount</span>
            <span className="text-white text-lg font-semibold">
              ₹{totalAmount}
            </span>
          </div>

          {/* BUTTONS */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <button
              onClick={handleCreateOrder}
              disabled={loading}
              className="rounded-2xl border border-white/10 bg-transparent py-3 font-semibold hover:bg-white/5 transition disabled:opacity-40"
            >
              Create Order
            </button>

            <button
              onClick={handleSuccess}
              disabled={loading}
              className="rounded-2xl bg-white text-black py-3 font-semibold hover:bg-gray-200 transition disabled:opacity-40"
            >
              Pay Success
            </button>

            <button
              onClick={handleFail}
              disabled={loading}
              className="rounded-2xl border border-red-500/40 bg-red-500/10 py-3 font-semibold text-red-300 hover:bg-red-500/20 transition disabled:opacity-40"
            >
              Pay Fail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
