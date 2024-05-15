import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const Approve = ({ setShowApprove, token, ID }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ID NYA : ", ID)
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/verify`,
        {
          
            "bookingID" : ID
        
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setShowApprove(false);
        console.log("clicked");
        window.location.reload();

        // Di sini Anda bisa memuat ulang data menggunakan fungsi yang Anda gunakan untuk mengambil data awal
      })
      .catch((error) => {
        console.error("Error saat mengedit data   :", error);
      });

    // Tambahkan logika untuk mengirim data ke server di sini
  };

  const handleClose = () => {
    setShowApprove(false);
  };

  return (
    <div className="w-[900px] max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <p className="text-xl font-medium text-gray-900 dark:text-white">
          Warnig
        </p>
        <p className="text-sm font-light text-gray-900 dark:text-white">
          Apakah anda yakin ingin menerima permintaan ini?
        </p>

        <button
          onClick={handleClose}
          className="w-[80px] text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mb-5"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-[80px] ml-[140px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Yes
        </button>
      </form>
    </div>
  );
};

export default Approve;
