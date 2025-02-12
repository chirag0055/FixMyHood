import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    //Footer Container
    <footer className="bg-gray-900 text-white py-6 mt-[5vh]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Copyright text displaying the current year dynamically */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} FixMyHood. All rights reserved.
        </p>

        {/* Navigation links for footer (Raise Complaint, Track Complaint, Admin Login) */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link
            to="/raisecomplaint"
            className="text-gray-400 text-sm hover:underline"
          >
            Raise Complaint
          </Link>
          <Link
            to="/trackcomplaint"
            className="text-gray-400 text-sm hover:underline"
          >
            Track Complaint
          </Link>
          <Link to="/login" className="text-gray-400 text-sm hover:underline">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
