import { Routes, Route } from "react-router-dom";

import StartingPage from "./pages/StartingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import About from "./pages/About";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
