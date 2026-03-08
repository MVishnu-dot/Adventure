import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import api from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // 1) Register user
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // 2) Auto-login after signup (optional but nice)
     const formData = new URLSearchParams();
formData.append("username", email); // backend uses username field
formData.append("password", password);

const loginRes = await api.post("/auth/login", formData, {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});


      // Save token
      localStorage.setItem("token", loginRes.data.access_token);

      // Navigate to main page
      navigate("/main");
    } catch (err) {
  const detail = err?.response?.data?.detail;

  if (Array.isArray(detail)) {
    // FastAPI validation errors
    const msg = detail.map((e) => `${e.loc.join(" -> ")} : ${e.msg}`).join("\n");
    alert(msg);
  } else if (typeof detail === "string") {
    alert(detail);
  } else {
    alert("Signup failed. Try again.");
  }
}
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logo} alt="Store" className="mx-auto h-12 mb-4" />
          <h2 className="text-2xl font-bold text-white">
            Create your account
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Join our premium shopping experience
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
