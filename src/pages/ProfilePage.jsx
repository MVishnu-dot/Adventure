import { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import { getMe } from "../api/auth";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (err) {
        console.log(err);
        alert("Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      <section className="max-w-5xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-2 text-gray-400">Your account from MongoDB.</p>

        {loading ? (
          <p className="mt-10 text-gray-400">Loading profile...</p>
        ) : !user ? (
          <p className="mt-10 text-red-400">User not found.</p>
        ) : (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xl">
                👤
              </div>

              <div>
                <p className="text-xl font-semibold">{user.name}</p>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <p className="text-sm text-gray-400">🆔 User ID</p>
                <p className="mt-2 text-sm text-gray-200 break-all">
                  {user.id}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <p className="text-sm text-gray-400">📅 Joined</p>
                <p className="mt-2 text-gray-200">
                  {user.created_at
                    ? new Date(user.created_at).toDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
