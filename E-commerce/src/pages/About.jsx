import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-20">
      
      {/* Header */}
      <div className="text-center mb-20">
        <img src={logo} className="mx-auto h-12 mb-6" />
        <h1 className="text-5xl font-bold">About Us</h1>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          We don’t sell trips. We create unforgettable adventures.
        </p>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            We built this platform for people who crave more than just vacations.
            Whether it’s racing across dirt trails, exploring wild deserts, or 
            conquering mountain paths — our goal is to help you experience the 
            world in its rawest and most exciting form.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6">Why We Exist</h2>
          <p className="text-gray-300 leading-relaxed">
            Traditional travel is boring. We wanted to create something bold,
            cinematic and powerful — a place where adventure meets technology.
            With seamless booking, curated experiences, and real-time data,
            we make extreme travel simple, safe and unforgettable.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 text-center gap-12">
        <div>
          <h3 className="text-4xl font-bold text-indigo-400">120+</h3>
          <p className="text-gray-400">Adventures</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-indigo-400">40+</h3>
          <p className="text-gray-400">Locations</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-indigo-400">15k+</h3>
          <p className="text-gray-400">Explorers</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-indigo-400">98%</h3>
          <p className="text-gray-400">Satisfaction</p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-28 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to start your journey?
        </h2>
        <Link
          to="/signup"
          className="inline-block bg-indigo-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-500 transition"
        >
          Join the Adventure
        </Link>
      </div>
    </div>
  );
}
