import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const Return = ({ setShowReturn, token, ID}) => {
  const [formData, setFormData] = useState({
    return_date: "", // Ubah initial state untuk return_date
    username: "",
    password: "",
    email: "",
    role: "user",
    number: null,
    userID: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kirim data yang diperbarui ke server
    axios
      .put(
          `${process.env.NEXT_PUBLIC_API_URL}/booking`,
          {
            "bookingID" : ID,
            "return_date" : formData.return_date
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("clicked", response.data);
        window.location.reload();

        console.log("clicked", ID, formData.return_date);
        setShowReturn(false);
        // Di sini Anda bisa memuat ulang data menggunakan fungsi yang Anda gunakan untuk mengambil data awal
      })
      .catch((error) => {
        console.error("Error saat menambah data   :", error);
      });

    // Tambahkan logika untuk mengirim data ke server di sini
  };

  const handleClose = () => {
    setShowReturn(false);
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
          Return Date :  
        </h5>
        <div>
          <input
            id="return_date"
            type="date" // Ubah tipe input menjadi datetime-local
            name="return_date" // Memberikan nama yang sesuai
            className="bg-gray-50 border border-white ml-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 h-[40px] w-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.return_date}
            onChange={handleInputChange}
          />
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

export default Return;
