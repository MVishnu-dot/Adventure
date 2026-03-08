import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { loginUser } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.access_token);

      navigate("/main");
    } catch (err) {
      console.log("LOGIN ERROR FULL:", err);
      console.log("LOGIN ERROR RESPONSE:", err?.response);
      console.log("LOGIN ERROR DATA:", err?.response?.data);

      alert(err?.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <img src={logo} alt="Store" className="mx-auto h-18 mb-6" />
          <h2 className="text-2xl font-bold text-white">
            Sign in to your account
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back to your premium store
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
