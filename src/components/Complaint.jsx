import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { ref, set, update } from "firebase/database";

import React from "react";
import { db } from "../../firebase";

export default function Complaint({ formData }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set([formData.status])
  );

  //To update setSelectedKeys and to update my database
  const handleStatusChange = (keys) => {
    const newStatus = Array.from(keys)[0]; // Convert Set to string
    setSelectedKeys(new Set([newStatus])); // Update UI state

    // Update in Firebase
    update(ref(db, "complaints/" + formData.complaintId), { status: newStatus })
      .then(() => {
        console.log(`Status updated to ${newStatus}`);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <>
      {/* Wrapping the Card inside a div to make it fully clickable */}

      <div className="w-full cursor-pointer" onClick={onOpen}>
        <Card
          className={`h-[300px] flex flex-col justify-between ${
            Array.from(selectedKeys)[0] === "Complaint Raised"
              ? "bg-red-200 border-red-500"
              : Array.from(selectedKeys)[0] === "In Progress"
              ? "bg-yellow-200 border-yellow-500"
              : Array.from(selectedKeys)[0] === "Resolved"
              ? "bg-green-200 border-green-500"
              : "bg-gray-200 border-gray-500"
          }`}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start mt-2">
            <p className="text-tiny uppercase font-bold">
              {formData.city}, {formData.state}
            </p>
            <small className="text-default-500">{formData.date}</small>
            <h4 className="font-bold text-large">{formData.category}</h4>
          </CardHeader>

          <CardBody className="py-2 flex-grow">
            <div className="h-[200px] w-full">
              <Image
                alt="Card background"
                className="object-cover w-full h-full rounded-xl"
                src={formData.image}
                width={270}
                height={200} // Ensures correct scaling
              />
            </div>
          </CardBody>
        </Card>
      </div>

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
        <ModalContent className=" overflow-y-auto p-4 max-w-3xl w-full">
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-between gap-4 text-3xl font-bold">
                {formData.category}
              </ModalHeader>
              <ModalBody className="flex flex-col md:flex-row gap-6 justify-center items-center">
                {/* Left Section - Image */}
                <div className="w-full md:w-[45%] mt-[5vh] flex justify-center items-center ">
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Complaint"
                      className="w-full max-h-[350px] object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* Right Section - Text Content */}
                <div className="w-full md:w-[55%] space-y-3">
                  {/* Status & Description */}
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Description</span>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          className={`capitalize border ${
                            Array.from(selectedKeys)[0] === "Complaint Raised"
                              ? "text-red-500 border-red-500"
                              : Array.from(selectedKeys)[0] === "In Progress"
                              ? "text-yellow-500 border-yellow-500"
                              : Array.from(selectedKeys)[0] === "Resolved"
                              ? "text-green-500 border-green-500"
                              : "text-gray-500 border-gray-500"
                          }`}
                          variant="bordered"
                        >
                          {Array.from(selectedKeys)[0] || "Select Status"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        disallowEmptySelection
                        aria-label="Select Status"
                        selectedKeys={selectedKeys}
                        selectionMode="single"
                        variant="flat"
                        onSelectionChange={(keys) => handleStatusChange(keys)}
                      >
                        <DropdownItem
                          key="Complaint Raised"
                          className="text-red-500 font-medium"
                        >
                          Complaint Raised
                        </DropdownItem>
                        <DropdownItem
                          key="In Progress"
                          className="text-yellow-500 font-medium"
                        >
                          In Progress
                        </DropdownItem>
                        <DropdownItem
                          key="Resolved"
                          className="text-green-500 font-medium"
                        >
                          Resolved
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  <p className="text-sm">{formData.description}</p>

                  {/* Address */}
                  <div>
                    <p className="font-bold">Address</p>
                    <p className="text-sm">
                      {formData.fulladdress} <br /> {formData.city},{" "}
                      {formData.state}, {formData.pincode}
                    </p>
                  </div>

                  {/* User & Date */}
                  <p className="text-sm">
                    <b>By:</b> {formData.fullName} <br />
                    <b>Contact Number: </b> {formData.phone} <br />
                    <b>Date: </b>
                    {formData.date}
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
