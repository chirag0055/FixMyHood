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
  const aboutRef = useRef(null); // Creating a reference for the "About" section

  // Function to scroll to the "About" section smoothly
  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <BrowserRouter>
      {" "}
      {/* Setting up the Router to handle navigation */}
      <NavbarComponent scrollToAbout={scrollToAbout} />{" "}
      {/* Navbar with scroll function */}
      <div className="pt-[60px] md:pt-[60px]">
        {" "}
        {/* Adding padding to prevent content from hiding behind the navbar */}
        <Routes>
          {" "}
          {/* Defining all routes/pages in the app */}
          <Route path="/" element={<Home aboutRef={aboutRef} />} />{" "}
          {/* Home page */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/signup" element={<SignUp />} /> {/* Signup page */}
          <Route path="/raisecomplaint" element={<RaiseComplaint />} />{" "}
          {/* Raise a complaint page */}
          <Route path="/trackcomplaint" element={<TrackComplaint />} />{" "}
          {/* Track complaint page */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                {" "}
                {/* Protecting the Dashboard page */}
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <Toaster /> {/* Component to display notifications */}
      </div>
      <Footer /> {/* Footer at the bottom of the page */}
    </BrowserRouter>
  );
}

export default App;
