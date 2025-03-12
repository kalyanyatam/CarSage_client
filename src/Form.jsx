import React, { useState } from "react";
import { FaCar, FaRupeeSign, FaRoad, FaGasPump, FaStore, FaCogs, FaUser } from "react-icons/fa";
import Navbar from "./components/navbar/Navbar";

const Form = () => {
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    Year: "",
    Present_Price: "",
    Kms_Driven: "",
    Fuel_Type: "",
    Seller_Type: "",
    Transmission: "",
    Owner: "",
  });
  const [result, setResult] = useState("");
  const [showSpan, setShowSpan] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePredictClick = () => {
    const url = "http://localhost:5000/predict";
    setIsloading(true);
  
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        setResult(response.Prediction);
        setIsloading(false);
        setShowSpan(true);
      })
      .catch((error) => {
        console.error("❌ Error fetching prediction:", error);
        setIsloading(false);
      });
  };
  

  return (
    <div>
      <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
          <FaCar /> Car Price Prediction
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold flex items-center gap-2">
              <FaCar /> Year of Purchase
            </label>
            <input
              type="text"
              name="Year"
              value={formData.Year}
              onChange={handleChange}
              placeholder="Enter Year"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold flex items-center gap-2">
              <FaRupeeSign /> Present Price (Lakhs)
            </label>
            <input
              type="text"
              name="Present_Price"
              value={formData.Present_Price}
              onChange={handleChange}
              placeholder="Enter Price"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold flex items-center gap-2">
              <FaRoad /> KMs Driven
            </label>
            <input
              type="text"
              name="Kms_Driven"
              value={formData.Kms_Driven}
              onChange={handleChange}
              placeholder="Enter KMs Driven"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold flex items-center gap-2">
              <FaGasPump /> Fuel Type
            </label>
            <select
              name="Fuel_Type"
              value={formData.Fuel_Type}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select</option>
              <option value="0">Petrol</option>
              <option value="1">Diesel</option>
              <option value="2">CNG</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold flex items-center gap-2">
              <FaStore /> Seller Type
            </label>
            <select
              name="Seller_Type"
              value={formData.Seller_Type}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select</option>
              <option value="0">Dealer</option>
              <option value="1">Individual</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold flex items-center gap-2">
              <FaCogs /> Transmission Type
            </label>
            <select
              name="Transmission"
              value={formData.Transmission}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select</option>
              <option value="0">Manual</option>
              <option value="1">Automatic</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold flex items-center gap-2">
              <FaUser /> Number of Owners
            </label>
            <input
              type="text"
              name="Owner"
              value={formData.Owner}
              onChange={handleChange}
              placeholder="Enter Number of Owners"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={handlePredictClick}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isLoading ? "Predicting..." : "🔮 Predict Selling Price"}
          </button>
        </form>

        {showSpan && (
          <div className="mt-6 text-center">
            {result ? (
              <p className="text-lg font-semibold text-green-600">
                🎯 The Predicted Price is <span className="text-blue-500">{result} Lakhs</span>
              </p>
            ) : (
              <p className="text-red-500 font-semibold">⚠️ Please fill all fields properly.</p>
            )}
          </div>
        )}
      </div>
    </div>
    </div>  
  );
};

export default Form;
