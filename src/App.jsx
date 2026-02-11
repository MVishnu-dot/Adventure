import { Routes, Route } from "react-router-dom";

import StartingPage from "./pages/StartingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import About from "./pages/About";
import AdventureDetails from "./pages/AdventureDetails";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConformationPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import AdminDashboard from "./pages/AdminDashboard";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/adventure/:id" element={<AdventureDetails />} />
      <Route path="/booking/:id" element={<BookingPage />} />
      <Route path="/payment/:adventureId" element={<PaymentPage />} />
      <Route path="/confirmation/:adventureId" element={<ConfirmationPage />} />
      <Route path="/my-bookings" element={<MyBookingsPage />} />
      <Route path="/admin" element={<AdminDashboard />} />



    </Routes>
  );
}
