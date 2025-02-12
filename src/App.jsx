import { useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RaiseComplaint from "./pages/RaiseComplaint";
import NavbarComponent from "./components/NavbarComponent";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import { useRef } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./pages/PrivateRoute.jsx";
import TrackComplaint from "./pages/TrackComplaint.jsx";

function App() {
  const aboutRef = useRef(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <NavbarComponent scrollToAbout={scrollToAbout} />
      <div className="pt-[60px] md:pt-[60px]">
        <Routes>
          <Route path="/" element={<Home aboutRef={aboutRef} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/raisecomplaint" element={<RaiseComplaint />} />
          <Route path="/trackcomplaint" element={<TrackComplaint />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <Toaster />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
