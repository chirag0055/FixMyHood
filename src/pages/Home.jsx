import React from "react";
import { Button } from "@heroui/react";
import banner from "../assets/banner.png";
import aboutUs from "../assets/about.png";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ aboutRef }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* Banner Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[70vh] items-center px-4 md:px-16 lg:px-32">
        {/* Left Content */}
        <div className="text-center md:text-left">
          <div className="text-3xl md:text-5xl lg:text-7xl font-bold">
            Fix My Hood
          </div>
          <div className="text-lg md:text-xl lg:text-2xl mt-4 md:mt-6 text-justify">
            Empower your community by reporting and tracking local issues like
            potholes, garbage, and streetlights for a cleaner, safer
            neighborhood.
          </div>
          <Button
            color="primary"
            variant="ghost"
            className="mt-6 text-sm md:text-lg px-4 py-2"
            onClick={() => navigate("/RaiseComplaint")}
          >
            Raise Complaint
          </Button>
        </div>

        {/* Right Content */}
        <div className="flex justify-center">
          <img
            src={banner}
            className="object-cover w-full max-w-md md:max-w-lg h-auto"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-16 lg:px-32 py-10 bg-[#e9ecef]">
        <FeatureCard
          title="Easy Issue Reporting"
          description="Residents can quickly report problems like potholes, garbage overflow, broken streetlights, or water leaks using an intuitive form with images and location tagging."
          icon="📍"
        />
        <FeatureCard
          title="Real-time Issue Tracking"
          description="Users can track the status of their reports, receive updates from municipal authorities, and see whether issues are pending, in progress, or resolved."
          icon="🔄"
        />
        <FeatureCard
          title="Data-Driven Insights"
          description="Authorities and residents can access detailed statistics on the most common issues, response times, and trends to improve city maintenance and planning."
          icon="📊"
        />
        <FeatureCard
          title="Instant Alerts"
          description="Users get email or in-app alerts when their issue is addressed, when similar reports are made nearby, or when officials take action on community concerns."
          icon="🔔"
        />
      </div>

      {/* About Section */}
      <div
        ref={aboutRef}
        className="flex flex-col md:flex-row items-center h-auto md:h-[70vh] px-4 md:px-16 lg:px-32 py-10"
      >
        {/* Left Content */}
        <div className="flex justify-center w-full md:w-1/2">
          <img
            src={aboutUs}
            className="object-cover w-2/3 max-w-md md:max-w-lg h-auto"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-3/4 lg:w-1/2 mt-6 md:mt-0">
          <h2 className="text-2xl md:text-3xl font-bold">About FixMyHood</h2>
          <div className="text-base md:text-base lg:text-lg mt-4 leading-relaxed text-justify space-y-4">
            <p>
              Neighborhood Watch Portal is a community-driven platform designed
              to empower residents in reporting and tracking local issues such
              as potholes, garbage collection, and streetlight outages.
            </p>
            <p>
              By providing an easy-to-use interface, we ensure that concerns
              reach the right municipal authorities efficiently. Our platform
              fosters transparency by allowing users to monitor the progress of
              their complaints in real time.
            </p>
            <p>
              With a focus on user experience, we integrate modern web
              technologies to deliver a seamless experience. Join us in making a
              difference—one report at a time! 🚀
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
    </>
  );
};

// Feature Card Component
function FeatureCard({ title, description, icon }) {
  return (
    <div className="flex flex-col items-center p-6 shadow-lg rounded-xl bg-white ">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2 text-center text-sm md:text-base text-justify">
        {description}
      </p>
    </div>
  );
}

export default Home;
