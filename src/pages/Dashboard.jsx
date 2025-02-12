import React, { useEffect, useState } from "react";
import Complaint from "../components/Complaint";
import Stats from "../components/Stats";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase";
import { Select, SelectItem } from "@heroui/react";

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // To get complainsts from firebase database
  useEffect(() => {
    const unsubscribe = onValue(ref(db, "complaints/"), (complaints) => {
      //Reading values from Database
      const data = complaints.val();
      if (data) {
        const complaintsArray = Object.values(data); //Convert Object into array
        setComplaints(complaintsArray);
      } else setComplaints([]); // If no data, set empty array
    });

    return () => unsubscribe(); // Clean up Firebase listener
  }, []);

  //Initial sorting based on status, Define priority of status
  const statusOrder = {
    "Complaint Raised": 1,
    "In Progress": 2,
    Resolved: 3,
  };

  // Extract unique statuses
  const uniqueStatuses = [
    ...new Set(complaints.map((data) => data.status)),
  ].sort();

  //Extract Unique States from complaints
  const uniqueStates = [
    ...new Set(complaints.map((data) => data.state)),
  ].sort();

  //Extract Unique cities as per Selected state
  const uniqueCities =
    selectedState === "All"
      ? []
      : [
          ...new Set(
            complaints
              .filter((data) => data.state === selectedState)
              .map((data) => data.city)
          ),
        ].sort();

  //Apply Filter
  const filteredComplaints = complaints.filter(
    (data) =>
      (selectedState === "All" || data.state === selectedState) &&
      (selectedCity === "All" || data.city === selectedCity) &&
      (selectedStatus === "All" || data.status === selectedStatus)
  );
  //Sort By Status
  filteredComplaints.sort(
    (a, b) => statusOrder[a.status] - statusOrder[b.status]
  );

  return (
    <div>
      {/* Stats Section */}
      <Stats complaints={complaints} />

      {/* Filter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-10 py-4 bg-[#F8F9FA] items-center  m-10 gap-8 rounded-lg shadow-lg">
        {/* State Filter */}
        <div className="flex bg-[#ffad42] rounded-lg justify-center items-center h-[56px] mx-3 ">
          <div className=" text-lg font-bold">Filter by</div>
        </div>
        <Select
          className="text-black-500 p-2 rounded"
          color="warning"
          label="States"
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("All"); // Reset city Selection when state changes
          }}
          value={selectedState}
        >
          <SelectItem key="All" value="All">
            All States
          </SelectItem>
          {uniqueStates.map((state) => (
            <SelectItem key={state} value={state}>
              {state}
            </SelectItem>
          ))}
        </Select>

        {/* City Filter - Only enabled when a state is Selected */}
        <Select
          className="  p-2 rounded"
          color="warning"
          onChange={(e) => setSelectedCity(e.target.value)}
          label="Cities"
          value={selectedCity}
          isDisabled={selectedState === "All"} // Disable until state is Selected
        >
          <SelectItem key="All" value="All">
            All Cities
          </SelectItem>
          {uniqueCities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </Select>

        {/* Status Filter */}
        <Select
          className="  p-2 rounded"
          color="warning"
          onChange={(e) => setSelectedStatus(e.target.value)}
          label="Status"
          value={selectedStatus}
        >
          <SelectItem key="All" value="All">
            All Status
          </SelectItem>
          {uniqueStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Complaints Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  p-10 bg-[#F8F9FA]  m-10 gap-8 rounded-lg shadow-lg">
        {filteredComplaints.length === 0
          ? "No Complaints found"
          : filteredComplaints.map((singleComplaint) => (
              <Complaint
                key={singleComplaint.complaintId}
                formData={singleComplaint}
              />
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
