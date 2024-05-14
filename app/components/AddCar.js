import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const AddCar = ({ setShowEditForm, token }) => {
  const [formData, setFormData] = useState({
    name : "",
    price: null,
    capacity: null,
    am : "",
    color : "",
    model : "",
    carID : "",
    image : null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("capacity", formData.capacity);
    formDataToSend.append("am", formData.am);
    formDataToSend.append("color", formData.color);
    formDataToSend.append("model", formData.model);
    formDataToSend.append("carID", formData.carID);
    // formDataToSend.append("image", formData.image);
    // Kirim data yang diperbarui ke server
    axios
      .post(
        `http://127.0.0.1:8000/car/`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        }
      )
      .then((response) => {
        setShowEditForm(false);
        // Di sini Anda bisa memuat ulang data menggunakan fungsi yang Anda gunakan untuk mengambil data awal
      })
      .catch((error) => {
        console.error("Error saat mengedit data   :", error);
      });

    // Tambahkan logika untuk mengirim data ke server di sini
  };

  const handleClose = () => {
    setShowEditForm(false);
  };

  return (
    <div className="w-[900px] max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <button
        onClick={handleClose}
        className="w-[80px] text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mb-5"
      >
        Back
      </button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Edit Mobil sesuai keperluan
        </h5>
        <div>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              placeholder="Name"
              className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="number"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              placeholder="Price"
              className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={handleInputChange}
              required
            />
          </div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            capacity
          </label>
          <input
            type="number"
            name="capacity"
            id="capacity"
            value={formData.capacity}
            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="1"
            onChange={handleInputChange}
            required
          />
          
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Color
          </label>
          <input
            type="text"
            name="color"
            id="color"
            value={formData.color}
            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Warna mobil"
            onChange={handleInputChange}
            required
          />
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Model
          </label>
          <input
            type="text"
            name="model"
            id="model"
            value={formData.model}
            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="20244-5"
            onChange={handleInputChange}
            required
          />
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Auto / Manual
          </label>
          <select
            id="am"
            name="am"
            className=" bg-gray-50 border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 h-[40px] w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.am}
            onChange={handleInputChange}
          >
            <option value="AUTOMATIC">Automatic</option>
            <option value="MANUAL">Manual</option>
          </select>
            <label
              htmlFor="image"
              className="block mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Image:
            </label>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={formData.image}
              disabled
            />
            <input
              type="file"
              name="image"
              id="image"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
            <label
              htmlFor="image"
              className="ml-3 w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
            >
              Upload
            </label>
          </div>
        </div>

        <button
        type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCar;
