import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import { getAdventureById } from "../api/adventure";
import { createBooking } from "../api/bookings";

export default function BookingPage() {
  const { id } = useParams(); // adventure id
  const navigate = useNavigate();

  const [adventure, setAdventure] = useState(null);
  const [participants, setParticipants] = useState(1);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdventure = async () => {
      try {
        const data = await getAdventureById(id);
        setAdventure(data);
      } catch (err) {
        console.log("Error fetching adventure:", err);
      }
    };

    fetchAdventure();
  }, [id]);

  const totalAmount = useMemo(() => {
    if (!adventure) return 0;
    return Number(adventure.price) * Number(participants || 1);
  }, [adventure, participants]);

  const handleBooking = async () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    if (!adventure) return;

    setLoading(true);

    try {
      const payload = {
        adventure_id: adventure.id,
        date,
        participants: Number(participants),
      };

      const res = await createBooking(payload);

      console.log("BOOKING RESPONSE FULL:", res);

      const bookingId = res.id || res._id || res.booking?.id || res.booking?._id;
      const bookingObj = res.booking || res;

      if (!bookingId) {
        alert("Booking created but bookingId missing. Check backend response.");
        return;
      }

      navigate(`/payment/${bookingId}`, {
        state: {
          adventure,
          booking: bookingObj,
          participants,
        },
      });
    } catch (err) {
      console.log("Booking error:", err);
      alert("Booking failed. Please login and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!adventure) {
    return (
      <div className="min-h-screen bg-black text-white">
        <NavBar />
        <div className="max-w-6xl mx-auto px-6 py-20 text-gray-400">
          Loading adventure...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      {/* HERO IMAGE */}
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        <img
          src={adventure.image_url}
          alt={adventure.title}
          className="h-[340px] w-full object-cover"
        />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto w-full px-6 pb-10">
            <p className="text-sm text-white/70">{adventure.location}</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">
              {adventure.title}
            </h1>
            <p className="mt-3 max-w-2xl text-white/70">
              Pick your date, select participants, and lock in the vibe.
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
          {/* LEFT */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold">Booking Details</h2>
            <p className="mt-2 text-gray-400 text-sm">
              Choose your schedule and group size. This booking is only confirmed
              after payment.
            </p>

            {/* Inputs */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {/* Date */}
              <div>
                <label className="text-sm text-gray-400">Select Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-2 w-full rounded-2xl bg-black/60 border border-white/10 px-4 py-3 outline-none focus:border-white/25 transition"
                />
              </div>

              {/* Participants */}
              <div>
                <label className="text-sm text-gray-400">Participants</label>
                <input
                  type="number"
                  min={1}
                  max={adventure.max_participants || 20}
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  className="mt-2 w-full rounded-2xl bg-black/60 border border-white/10 px-4 py-3 outline-none focus:border-white/25 transition"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Max allowed: {adventure.max_participants || 20}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold">What you’ll get</h3>
              <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                <li>Check the selected date carefully before confirming.</li>
<li>Read what’s included (gear, food, transport, guide, tickets).</li>
<li>Make sure your fitness level matches the activity difficulty.</li>
<li>Verify the exact location and meeting point in advance.</li>
<li>Arrive early — late arrival may cancel your slot.</li>
<li>Carry valid ID proof (Aadhaar / Passport / Driving License).</li>
<li>Follow all safety instructions strictly (helmet, harness, life jacket).</li>
<li>Avoid booking if you have medical conditions like heart/asthma/back issues.</li>
<li>Weather conditions may cause rescheduling or cancellation.</li>
<li>Understand cancellation and refund rules before payment.</li>
<li>Avoid carrying valuables (risk of loss or damage).</li>
<li>Do not consume alcohol/drugs before the adventure.</li>

              </ul>
            </div>

            {/* CTA */}
            <button
              onClick={handleBooking}
              disabled={loading}
              className="mt-10 w-full rounded-2xl bg-white text-black py-4 font-semibold hover:bg-gray-200 transition disabled:opacity-60"
            >
              {loading ? "Creating Booking..." : "Proceed to Payment"}
            </button>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="lg:sticky lg:top-24 h-fit rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="mt-6 space-y-4 text-gray-300">
              <div className="flex justify-between">
                <span>Price per person</span>
                <span className="font-semibold">₹{adventure.price}</span>
              </div>

              <div className="flex justify-between">
                <span>Participants</span>
                <span className="font-semibold">{participants}</span>
              </div>

              <div className="flex justify-between">
                <span>Date</span>
                <span className="font-semibold">
                  {date ? date : "Not selected"}
                </span>
              </div>

              <div className="h-px bg-white/10 my-2" />

              <div className="flex justify-between text-lg">
                <span>Total</span>
                <span className="font-semibold">₹{totalAmount}</span>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-gray-300">
              <p className="font-semibold text-white">ENJOYY THE ADVENTUREE</p>
              <p className="mt-2 text-gray-400">
                
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
