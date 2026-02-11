import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 later: API call to FastAPI
    // if success:
    navigate("/main"); // MainPage route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logo} alt="Store" className="mx-auto h-18 mb-6" />
          <h2 className="text-2xl font-bold text-white">
            Sign in to your account
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back to your premium store
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
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
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-400">
              <input type="checkbox" className="mr-2 accent-indigo-500" />
              Remember me
            </label>
            <Link to="/forgot" className="text-indigo-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-semibold transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
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
