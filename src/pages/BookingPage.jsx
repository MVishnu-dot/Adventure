import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";

import NavBar from "../components/NavBar";
import { getAdventureById } from "../api/adventure";
import { createBooking } from "../api/bookings";

export default function BookingPage() {
  const { id } = useParams(); // adventureId
  const navigate = useNavigate();

  const [adventure, setAdventure] = useState(null);
  const [participants, setParticipants] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdventure = async () => {
      const data = await getAdventureById(id);
      setAdventure(data);
    };

    fetchAdventure();
  }, [id]);

  const handleBooking = async () => {
    try {
      setLoading(true);

      const res = await createBooking({
        adventure_id: id,
        date: selectedDate.toISOString(),
        participants: participants,
      });

      navigate(`/payment/${id}`, {
        state: {
          booking: res.booking,
          adventure: adventure,
        },
      });
    } catch (err) {
      console.log(err);
      alert("Booking failed. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  if (!adventure) {
    return (
      <div className="min-h-screen bg-black text-white">
        <NavBar />
        <p className="text-center mt-40 text-gray-400">Loading...</p>
      </div>
    );
  }

  const totalPrice = participants * adventure.price;

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">
          Booking: {adventure.title}
        </h1>

        <p className="mt-3 text-gray-400">
          Choose participants and date, then continue to payment.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 space-y-8">
          {/* DATE PICKER */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Choose Date
            </label>

            <div className="rounded-2xl border border-white/10 bg-black px-4 py-3">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full bg-transparent outline-none text-white"
                placeholderText="Select date"
                minDate={new Date()}
              />
            </div>
          </div>

          {/* PARTICIPANTS */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Participants
            </label>

            <select
              value={participants}
              onChange={(e) => setParticipants(Number(e.target.value))}
              className="w-full rounded-2xl bg-black border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
            >
              {Array.from({ length: adventure.max_participants }, (_, i) => i + 1)
                .slice(0, 20) // safety: don't render 100 options if max huge
                .map((num) => (
                  <option key={num} value={num}>
                    {num} Person{num > 1 ? "s" : ""}
                  </option>
                ))}
            </select>

            {adventure.max_participants > 20 && (
              <p className="mt-2 text-xs text-gray-500">
                (Showing first 20 options — you can increase later)
              </p>
            )}
          </div>

          {/* PRICE SUMMARY */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
            <div className="flex items-center justify-between text-gray-300">
              <span>Price per person</span>
              <span className="text-white">₹{adventure.price}</span>
            </div>

            <div className="flex items-center justify-between text-gray-300 mt-2">
              <span>Participants</span>
              <span className="text-white">{participants}</span>
            </div>

            <div className="h-px bg-white/10 my-4" />

            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-medium">Total</span>
              <span className="text-white text-lg font-semibold">
                ₹{totalPrice}
              </span>
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={!selectedDate || loading}
            className="w-full rounded-2xl bg-white text-black py-3 font-semibold hover:bg-gray-200 transition disabled:opacity-40"
          >
            {loading ? "Booking..." : "Continue to Payment →"}
          </button>
        </div>
      </div>
    </div>
  );
}
