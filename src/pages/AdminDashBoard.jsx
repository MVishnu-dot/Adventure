import { useState } from "react";
import NavBar from "../components/NavBar";

const demoAdventures = [
  {
    id: "698ac76843973614a0a353aa",
    title: "Coorg Trek",
    location: "Coorg, Karnataka",
    date: "2026-02-10",
    price: 10000,
    max_participants: 10,
  },
  {
    id: "698ac76843973614a0a353bb",
    title: "Desert Rally – Thar",
    location: "Rajasthan",
    date: "2026-03-01",
    price: 15000,
    max_participants: 20,
  },
];

const demoBookings = [
  {
    id: "BK001",
    user: "vishnu@gmail.com",
    adventure: "Coorg Trek",
    date: "2026-02-10",
    status: "confirmed",
  },
  {
    id: "BK002",
    user: "test@gmail.com",
    adventure: "Desert Rally – Thar",
    date: "2026-03-01",
    status: "pending",
  },
];

const demoPayments = [
  {
    id: "PAY001",
    user: "vishnu@gmail.com",
    booking: "BK001",
    amount: 20000,
    status: "paid",
  },
  {
    id: "PAY002",
    user: "test@gmail.com",
    booking: "BK002",
    amount: 15000,
    status: "created",
  },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState("adventures");

  const [newAdventure, setNewAdventure] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    price: "",
    max_participants: "",
    created_by: "admin",
  });

  const handleChange = (e) => {
    setNewAdventure({ ...newAdventure, [e.target.name]: e.target.value });
  };

  const handleAddAdventure = (e) => {
    e.preventDefault();
    alert("Adventure Added (demo). Backend connect later.");
    setNewAdventure({
      title: "",
      description: "",
      location: "",
      date: "",
      price: "",
      max_participants: "",
      created_by: "admin",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-400 text-sm max-w-xl">
              Manage adventures, bookings, and payments in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300">
            Logged in as: <span className="text-white font-semibold">Admin</span>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-12 flex flex-wrap gap-3">
          {[
            { key: "adventures", label: "Adventures" },
            { key: "add", label: "Add Adventure" },
            { key: "bookings", label: "Bookings" },
            { key: "payments", label: "Payments" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                tab === t.key
                  ? "bg-white text-black"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="mt-10">
          {/* ----------------- ADVENTURES LIST ----------------- */}
          {tab === "adventures" && (
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold">All Adventures</h2>
                <p className="text-sm text-gray-400 mt-1">
                  View, edit, or delete adventures.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 border-b border-white/10">
                    <tr>
                      <th className="text-left p-4">Title</th>
                      <th className="text-left p-4">Location</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Max</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoAdventures.map((a) => (
                      <tr
                        key={a.id}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="p-4 font-medium">{a.title}</td>
                        <td className="p-4 text-gray-300">{a.location}</td>
                        <td className="p-4 text-gray-300">{a.date}</td>
                        <td className="p-4 font-semibold">₹{a.price}</td>
                        <td className="p-4 text-gray-300">
                          {a.max_participants}
                        </td>
                        <td className="p-4 flex gap-2">
                          <button className="rounded-xl px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 transition">
                            Edit
                          </button>
                          <button className="rounded-xl px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 transition">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ----------------- ADD ADVENTURE ----------------- */}
          {tab === "add" && (
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
              <h2 className="text-xl font-semibold">Add New Adventure</h2>
              <p className="text-sm text-gray-400 mt-1">
                Create a premium adventure listing.
              </p>

              <form
                onSubmit={handleAddAdventure}
                className="mt-8 grid gap-6 md:grid-cols-2"
              >
                <input
                  name="title"
                  value={newAdventure.title}
                  onChange={handleChange}
                  placeholder="Adventure Title"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm outline-none focus:border-white/20"
                  required
                />

                <input
                  name="location"
                  value={newAdventure.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm outline-none focus:border-white/20"
                  required
                />

                <input
                  name="date"
                  value={newAdventure.date}
                  onChange={handleChange}
                  type="date"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm outline-none focus:border-white/20"
                  required
                />

                <input
                  name="price"
                  value={newAdventure.price}
                  onChange={handleChange}
                  placeholder="Price (₹)"
                  type="number"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm outline-none focus:border-white/20"
                  required
                />

                <input
                  name="max_participants"
                  value={newAdventure.max_participants}
                  onChange={handleChange}
                  placeholder="Max Participants"
                  type="number"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm outline-none focus:border-white/20"
                  required
                />

                <textarea
                  name="description"
                  value={newAdventure.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm outline-none focus:border-white/20 min-h-[120px]"
                  required
                />

                <button
                  type="submit"
                  className="md:col-span-2 rounded-2xl bg-white text-black px-6 py-4 font-semibold hover:bg-gray-200 transition"
                >
                  Add Adventure
                </button>
              </form>
            </div>
          )}

          {/* ----------------- BOOKINGS ----------------- */}
          {tab === "bookings" && (
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold">All Bookings</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Track customer bookings and status.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 border-b border-white/10">
                    <tr>
                      <th className="text-left p-4">Booking ID</th>
                      <th className="text-left p-4">User</th>
                      <th className="text-left p-4">Adventure</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoBookings.map((b) => (
                      <tr
                        key={b.id}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="p-4 font-semibold">{b.id}</td>
                        <td className="p-4 text-gray-300">{b.user}</td>
                        <td className="p-4 text-gray-300">{b.adventure}</td>
                        <td className="p-4 text-gray-300">{b.date}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                              b.status === "confirmed"
                                ? "bg-green-500/15 text-green-300 border-green-500/30"
                                : "bg-yellow-500/15 text-yellow-300 border-yellow-500/30"
                            }`}
                          >
                            {b.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ----------------- PAYMENTS ----------------- */}
          {tab === "payments" && (
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold">All Payments</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Monitor payment records.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 border-b border-white/10">
                    <tr>
                      <th className="text-left p-4">Payment ID</th>
                      <th className="text-left p-4">User</th>
                      <th className="text-left p-4">Booking</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoPayments.map((p) => (
                      <tr
                        key={p.id}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="p-4 font-semibold">{p.id}</td>
                        <td className="p-4 text-gray-300">{p.user}</td>
                        <td className="p-4 text-gray-300">{p.booking}</td>
                        <td className="p-4 font-semibold">₹{p.amount}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                              p.status === "paid"
                                ? "bg-green-500/15 text-green-300 border-green-500/30"
                                : "bg-white/5 text-gray-300 border-white/10"
                            }`}
                          >
                            {p.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
