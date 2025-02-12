import React, { useEffect } from "react";

const Stats = ({ complaints }) => {
  // Initialize an object to store complaint counts based on status
  const statusCounts = {
    "Total Complaints": 0, // Total number of complaints
    "Complaint Raised": 0, // Complaints that have been reported but not yet addressed
    "In Progress": 0, // Complaints that are currently being worked on
    Resolved: 0, // Complaints that have been resolved
  };

  // Iterate through complaints and count occurrences for each status
  complaints.forEach((data) => {
    if (statusCounts.hasOwnProperty(data.status)) {
      statusCounts[data.status] += 1; // Increment count for the specific status
      statusCounts["Total Complaints"] += 1; // Increment total complaints count
    }
  });

  return (
    <div className="bg-[#F8F9FA] p-10 m-10 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-5">Overall Stats</h2>

      {/* Grid layout for displaying statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Card for Total Complaints */}
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Total Complaints</h3>
          <div className="text-xl font-bold my-3">
            {statusCounts["Total Complaints"]}
          </div>
          <p className="text-sm text-gray-600">
            These are the total number of complaints registered on this
            platform.
          </p>
        </div>

        {/* Card for Complaints Raised */}
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Current Raised Complaints</h3>
          <div className="text-xl font-bold my-3">
            {statusCounts["Complaint Raised"]}
          </div>
          <p className="text-sm text-gray-600">
            Complaints which are not started yet.
          </p>
        </div>

        {/* Card for Complaints In Progress */}
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Complaints In Progress</h3>
          <div className="text-xl font-bold my-3">
            {statusCounts["In Progress"]}
          </div>
          <p className="text-sm text-gray-600">
            Complaints that are in progress.
          </p>
        </div>

        {/* Card for Resolved Complaints */}
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Resolved Complaints</h3>
          <div className="text-xl font-bold my-3">
            {statusCounts["Resolved"]}
          </div>
          <p className="text-sm text-gray-600">Complaints that are resolved.</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
