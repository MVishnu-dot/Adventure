import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import NavBar from "../components/NavBar";
import {
  createFakeOrder,
  fakePaymentSuccess,
  fakePaymentFail,
} from "../api/payments";

export default function PaymentPage() {
  const { bookingId } = useParams(); // route must be: /payment/:bookingId
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  // Fake card fields (demo UI only)
  const [cardName, setCardName] = useState("Vishnu");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvv, setCvv] = useState("123");

  const adventure = location.state?.adventure;
  const booking = location.state?.booking;
  const participants = location.state?.participants || 1;

  // ❌ if opened directly (no state)
  if (!bookingId || !adventure || !booking) {
    return (
      <div className="min-h-screen bg-black text-white">
        <NavBar />
        <div className="max-w-5xl mx-auto px-6 py-20 text-red-400">
          Payment page opened incorrectly. Please book again.
        </div>
      </div>
    );
  }

  const totalAmount = useMemo(() => {
    return Number(adventure.price) * Number(participants);
  }, [adventure.price, participants]);

  const handlePaySuccess = async () => {
    setLoading(true);

    try {
      // 1) Create Order
      await createFakeOrder({
        booking_id: bookingId,
        amount: totalAmount,
      });

      // 2) Generate fake payment id
      const fakePaymentId =
        "PAY_" + Math.random().toString(36).substring(2, 10).toUpperCase();

      // 3) Mark success
      await fakePaymentSuccess({
        booking_id: bookingId,
        payment_id: fakePaymentId,
      });

      // 4) Go confirmation
      navigate(`/confirmation/${bookingId}`, {
        state: {
          adventure,
          booking,
          participants,
          amount: totalAmount,
          paymentId: fakePaymentId,
        },
      });
    } catch (err) {
      console.log("PAYMENT SUCCESS ERROR:", err);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayFail = async () => {
    setLoading(true);

    try {
      await fakePaymentFail({
        booking_id: bookingId,
      });

      alert("Payment failed (fake). Booking marked as failed.");
      navigate("/my-bookings");
    } catch (err) {
      console.log("PAYMENT FAIL ERROR:", err);
      alert("Fail payment API crashed. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      {/* HERO IMAGE */}
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/75 to-black" />
        <img
          src={adventure.image_url}
          alt={adventure.title}
          className="h-[320px] w-full object-cover"
        />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto w-full px-6 pb-10">
            <p className="text-sm text-white/70">{adventure.location}</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">
              Payment Gateway
            </h1>
            <p className="mt-3 max-w-2xl text-white/70">
              Final Steps
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.85fr]">
          {/* LEFT: PAYMENT FORM */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold">Card Details</h2>
            <p className="mt-2 text-gray-400 text-sm">
             
            </p>

            {/* Fake card preview */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-black/30 p-7">
              <p className="text-xs text-white/60">DEMO VISA</p>

              <p className="mt-4 text-2xl tracking-widest font-semibold">
                {cardNumber || "•••• •••• •••• ••••"}
              </p>

              <div className="mt-6 flex items-center justify-between text-sm text-white/70">
                <div>
                  <p className="text-xs text-white/50">Card Holder</p>
                  <p className="font-semibold text-white">
                    {cardName || "YOUR NAME"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/50">Expiry</p>
                  <p className="font-semibold text-white">{expiry || "MM/YY"}</p>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="mt-10 space-y-6">
              <div>
                <label className="text-sm text-gray-400">Card Holder Name</label>
                <input
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="mt-2 w-full rounded-2xl bg-black/60 border border-white/10 px-4 py-3 outline-none focus:border-white/25 transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Card Number</label>
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="mt-2 w-full rounded-2xl bg-black/60 border border-white/10 px-4 py-3 outline-none focus:border-white/25 transition"
                  placeholder="4242 4242 4242 4242"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-gray-400">Expiry</label>
                  <input
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="mt-2 w-full rounded-2xl bg-black/60 border border-white/10 px-4 py-3 outline-none focus:border-white/25 transition"
                    placeholder="MM/YY"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">CVV</label>
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="mt-2 w-full rounded-2xl bg-black/60 border border-white/10 px-4 py-3 outline-none focus:border-white/25 transition"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <button
                onClick={handlePaySuccess}
                disabled={loading}
                className="w-full rounded-2xl bg-white text-black py-4 font-semibold hover:bg-gray-200 transition disabled:opacity-60"
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>

              <button
                onClick={handlePayFail}
                disabled={loading}
                className="w-full rounded-2xl border border-white/15 bg-transparent py-4 font-semibold hover:bg-white/10 transition disabled:opacity-60"
              >
                {loading ? "Processing..." : "Fail Payment"}
              </button>
            </div>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="lg:sticky lg:top-24 h-fit rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="mt-6 space-y-4 text-gray-300">
              <div className="flex justify-between">
                <span>Adventure</span>
                <span className="font-semibold text-white">
                  {adventure.title}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Participants</span>
                <span className="font-semibold">{participants}</span>
              </div>

              <div className="flex justify-between">
                <span>Price per person</span>
                <span className="font-semibold">₹{adventure.price}</span>
              </div>

              <div className="h-px bg-white/10 my-2" />

              <div className="flex justify-between text-lg">
                <span>Total</span>
                <span className="font-semibold text-white">₹{totalAmount}</span>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-gray-300">
              <p className="font-semibold text-white">Checkout</p>
              <p className="mt-2 text-gray-400">
               Need to add RazorPay Gateway
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
