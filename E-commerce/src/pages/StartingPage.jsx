import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import About from "./About";

import logo from "../assets/logo.png";
import heroVideo from "../assets/hero.mp4";

export default function StartingPage() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About/>}/>
    </Routes>
  );
}

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* HEADER */}
        <header className="flex items-center justify-between p-6 lg:px-10">
          <img src={logo} className="h-9" alt="Logo" />

          <div className="flex lg:hidden">
            <button onClick={() => setMobileMenuOpen(true)}>
              <Bars3Icon className="h-7 w-7 text-white" />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <Link to="/about" className="text-gray-300 hover:text-white">
              About
            </Link>
          </div>
        </header>

        {/* MOBILE MENU */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 bg-black/70 z-40" />
          <Dialog.Panel className="fixed inset-y-0 right-0 w-64 bg-gray-900 p-6 z-50">
            <button onClick={() => setMobileMenuOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>

            <div className="mt-8 space-y-4">
              <Link to="/login" className="block text-white text-lg">
                Login
              </Link>
              <Link to="/signup" className="block text-indigo-400 text-lg">
                Get Started
              </Link>
            </div>
          </Dialog.Panel>
        </Dialog>

        {/* HERO SECTION */}
        <main className="flex-grow flex items-center justify-center px-6 text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white">
              Book Your Next
              <span className="block bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                Extreme Adventure
              </span>
            </h1>

            <p className="mt-8 text-lg text-gray-300">
              Off-road rides, desert safaris, dirt tracks and mountain trails — all in one powerful adventure platform.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/signup"
                className="px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
              >
                Start Your Journey
              </Link>

              <Link
                to="/login"
                className="px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
              >
                Login
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
