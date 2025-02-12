import { Form, Input, Button } from "@heroui/react";
import { get, ref } from "firebase/database";
import React, { useState } from "react";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";

const TrackComplaint = () => {
  const [data, setData] = useState(""); // Stores the user-entered complaint ID
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Controls the modal visibility

  // State to store complaint details fetched from Firebase
  const [complaintDetails, setComplaintDetails] = useState({
    complaintId: "",
    fullName: "",
    email: "",
    category: "",
    description: "",
    fulladdress: "",
    city: "",
    state: "",
    pincode: "",
    date: "",
    status: "",
    phone: "",
    image: null,
  });

  // Handles form submission to fetch complaint details
  const onSubmit = async (e) => {
    e.preventDefault();

    const complaintSnap = await get(ref(db, `complaints/${data}`)); // Fetches complaint from Firebase using the entered complaint ID

    if (complaintSnap.exists()) {
      onOpen(); // Opens the modal if complaint exists
      const complaintData = complaintSnap.val();
      toast.success("Data Fetched Successfully");

      // Updates state with fetched complaint details
      setComplaintDetails({
        complaintId: complaintData.complaintId,
        fullName: complaintData.fullName,
        email: complaintData.email,
        category: complaintData.category,
        description: complaintData.description,
        fulladdress: complaintData.fulladdress,
        city: complaintData.city,
        state: complaintData.state,
        pincode: complaintData.pincode,
        date: complaintData.date,
        phone: complaintData.phone,
        status: complaintData.status,
        image: complaintData.image,
      });
    } else {
      toast.error("Incorrect complaint ID"); // Shows error if complaint ID is invalid
    }
  };

  // Updates the state when the user types in the input field
  const handleOnChange = (e) => {
    setData(e.target.value);
  };

  return (
    <>
      {/* Main container with heading and form */}
      <div className="flex flex-col h-[71dvh] items-center mt-20">
        <h1 className="font-bold text-3xl mb-7">Track Complaint</h1>

        {/* Form to enter complaint ID */}
         <Form className="flex flex-col md:flex-row justify-center items-center gap-4 w-full"
              validationBehavior="native"
              onSubmit={onSubmit}
              >
              <Input
                className="w-full sm:max-w-xs"
                label="Enter Complaint ID"
                labelPlacement="inside"
                name="data"
                radius="sm"
                required
                onChange={handleOnChange}
                type="text"
              />
  
              <Button
                type="submit"
                variant="ghost"
                color="success"
                className="max-w-sm text-success mt-2 sm:mt-0"
              >
            Submit
          </Button>
        </Form>


        {/* Modal to display complaint details if available */}
        {complaintDetails.complaintId ? (
          <Modal
            backdrop="opaque"
            classNames={{
              backdrop:
                "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
            }}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="flex items-center justify-center"
          >
            <ModalContent className="overflow-y-auto p-4 max-w-3xl w-full">
              {(onClose) => (
                <>
                  {/* Modal Header - Displays Complaint Category */}
                  <ModalHeader className="flex items-center justify-between gap-4 text-3xl font-bold">
                    {complaintDetails.category}
                  </ModalHeader>

                  {/* Modal Body - Displays Complaint Details */}
                  <ModalBody className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    {/* Left Section - Complaint Image */}
                    <div className="w-full md:w-[45%] mt-[5vh] flex justify-center items-center">
                      {complaintDetails.image && (
                        <img
                          src={complaintDetails.image}
                          alt="Complaint"
                          className="w-full max-h-[350px] object-cover rounded-lg"
                        />
                      )}
                    </div>

                    {/* Right Section - Complaint Details */}
                    <div className="w-full md:w-[55%] space-y-3">
                      {/* Complaint Status */}
                      <div className="flex items-center justify-between">
                        <Button
                          className={`capitalize border ${
                            complaintDetails.status === "Complaint Raised"
                              ? "text-red-500 border-red-500"
                              : complaintDetails.status === "In Progress"
                              ? "text-yellow-500 border-yellow-500"
                              : complaintDetails.status === "Resolved"
                              ? "text-green-500 border-green-500"
                              : "text-gray-500 border-gray-500"
                          }`}
                          variant="bordered"
                        >
                          {complaintDetails.status}
                        </Button>
                      </div>

                      {/* Complaint Description */}
                      <p className="text-sm">
                        <strong>Description:</strong> <br />
                        {complaintDetails.description}
                      </p>

                      {/* Address Details */}
                      <div>
                        <p className="font-bold">Address</p>
                        <p className="text-sm">
                          {complaintDetails.fulladdress} <br />
                          {complaintDetails.city}, {complaintDetails.state},{" "}
                          {complaintDetails.pincode}
                        </p>
                      </div>

                      {/* User and Date Information */}
                      <p className="text-sm">
                        <b>By:</b> {complaintDetails.fullName} <br />
                        <b>Contact Number:</b> {complaintDetails.phone} <br />
                        <b>Date:</b> {complaintDetails.date}
                      </p>
                    </div>
                  </ModalBody>

                  {/* Modal Footer - Close Button */}
                  <ModalFooter>
                    <Button color="danger" variant="ghost" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        ) : null}
      </div>
    </>
  );
};

export default TrackComplaint;
