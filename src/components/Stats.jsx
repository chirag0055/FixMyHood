import React, { useEffect } from "react";

const Stats = ({ complaints }) => {
  const statusCounts = {
    "Total Complaints": 0,
    "Complaint Raised": 0,
    "In Progress": 0,
    Resolved: 0,
  };

  //Count stats

  complaints.forEach((data) => {
    if (statusCounts.hasOwnProperty(data.status)) {
      statusCounts[data.status] += 1;
      statusCounts["Total Complaints"] += 1;
      console.log(statusCounts["Total Complaints"]);
    }
  });

  return (
    <div className="bg-[#F8F9FA] p-10 m-10 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-5">Overall Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Current Raised Complaints</h3>
          <div className="text-xl font-bold my-3">
            {statusCounts["Complaint Raised"]}
          </div>
          <p className="text-sm text-gray-600">
            Complaints which are not started yet.
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Complaints In Progress</h3>
          <div className="text-xl font-bold my-3">
            {statusCounts["In Progress"]}
          </div>
          <p className="text-sm text-gray-600">
            Complaints that are in progress.
          </p>
        </div>
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
