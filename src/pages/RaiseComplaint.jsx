import { useState, useEffect, useRef } from "react";
import { Select, SelectItem, Input } from "@heroui/react";
import imageCompression from "browser-image-compression";
import { Textarea } from "@heroui/input";
import { db } from "../../firebase";
import { set, ref } from "firebase/database";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

export default function RaiseComplaint() {
  const [complaintId, setComplaintId] = useState(null);

  //Reference of Image Upload
  const fileInputRef = useRef(null);

  // Initial state for the form
  const initialFormState = {
    fullName: "",
    email: "",
    phone: "",
    category: "",
    description: "",
    fulladdress: "",
    city: "",
    state: "",
    pincode: "",
    date: new Date().toLocaleDateString("en-GB"), // Set current date in dd/mm/yyyy format
    image: null,
  };

  // State to store form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    description: "",
    fulladdress: "",
    city: "",
    state: "",
    pincode: "",
    date: new Date().toLocaleDateString("en-GB"), // Set current date in dd/mm/yyyy format
    image: null,
  });

  // Function to convert file to Base64 format
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to handle image upload and compression
  const handleImageUpload = async (file) => {
    const options = {
      maxSizeMB: 0.2, // Compress image to a maximum size of 200KB
      maxWidthOrHeight: 800, // Resize the image to a max width or height of 800px
      useWebWorker: true, // Optimize performance
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const base64 = await convertToBase64(compressedFile); // Now the function is defined

      return base64;
    } catch (error) {
      console.error("Image compression error:", error);
      return null;
    }
  };

  // Function to handle input changes
  const handleChange = async (e) => {
    const { name, type, value, files } = e.target;

    // Handle file input separately
    if (type === "file" && files.length > 0) {
      try {
        const base64 = await handleImageUpload(files[0]); // Convert file to Base64

        if (base64) {
          setFormData((prevData) => ({
            ...prevData, // Keep previous form data
            [name]: base64, // Store Base64-encoded image
          }));
        }
      } catch (error) {
        console.error("Error converting file to Base64:", error); // Log any errors
      }
    } else {
      // Handle text input normally
      setFormData((prevData) => ({
        ...prevData, // Keep previous form data
        [name]: value, // Store text input value
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newcomplaintId = nanoid();

    // Save complaint data to Firebase
    set(ref(db, "complaints/" + newcomplaintId), {
      complaintId: newcomplaintId,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      category: formData.category,
      description: formData.description,
      fulladdress: formData.fulladdress,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      date: formData.date,
      image: formData.image,
      isValid: "no",
      status: "Complaint Raised",
    })
      .then(() => {
        toast.success("Complaint raised successfully");
        setComplaintId(newcomplaintId);

        // Reset file input field
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        setFormData(initialFormState); //Reset Form fields
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
        toast.error("Error Occured");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8">
      <h2 className="text-2xl font-bold text-center mb-6">Raise a Complaint</h2>

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
        {/* Full Name & Email */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full">
          <Input
            className="w-full md:w-1/2"
            key="fullName"
            label="Full Name"
            labelPlacement="inside"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <Input
            className="w-full md:w-1/2"
            key="email"
            label="Email"
            labelPlacement="inside"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone & Category */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full">
          <Input
            className="w-full md:w-1/2"
            key="phone"
            label="Phone (Optional)"
            labelPlacement="inside"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full md:w-1/2"
            label="Choose Category"
          >
            <SelectItem key="Potholes" value="Potholes">
              Potholes
            </SelectItem>
            <SelectItem key="Garbage" value="Garbage">
              Garbage
            </SelectItem>
            <SelectItem key="Streetlights" value="Street Lights">
              Street Lights
            </SelectItem>
            <SelectItem key="Water leakage" value="Water Leakage">
              Water Leakage
            </SelectItem>
            <SelectItem key="Illegal dumping" value="Illegal Dumping">
              Illegal Dumping
            </SelectItem>
          </Select>
        </div>

        {/* Description */}
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full"
          label="Description"
          labelPlacement="inside"
          key="description"
        />

        {/* Address */}
        <Input
          className="w-full"
          key="fulladdress"
          label="Full Address"
          labelPlacement="inside"
          name="fulladdress"
          value={formData.address}
          onChange={handleChange}
          required
        />

        {/* City & State */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full">
          <Input
            className="w-full md:w-1/2"
            key="city"
            label="City"
            labelPlacement="inside"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <Input
            className="w-full md:w-1/2"
            key="state"
            label="State"
            labelPlacement="inside"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        {/* Pincode & Image Upload */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full">
          <Input
            className="w-full md:w-1/2"
            key="pincode"
            label="Pincode"
            labelPlacement="inside"
            name="pincode"
            type="text"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
          <Input
            ref={fileInputRef}
            className="w-full md:w-1/2"
            key="image"
            label="Upload Image"
            labelPlacement="inside"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Complaint
        </button>
        {/* Display Complaint ID Below the Form */}
        {complaintId && (
          <div className="my-4 p-3 border border-gray-300 rounded-lg bg-gray-50 text-center">
            <p className="font-semibold text-lg">
              Complaint Registered Successfully!
            </p>
            <p className="text-gray-700">
              <b>Your Complaint ID:</b>{" "}
              <span className="text-blue-600">{complaintId}</span>
            </p>
            <p className="text-sm text-gray-500">
              Keep this ID for tracking your complaint.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
