import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const EditForm = ({ data, setShowEditForm, token }) => {
  const [formData, setFormData] = useState({
    username: data.username,
    email: data.email,
    role: data.role,
    number: data.number,
    userID: data.userID,
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
        `http://127.0.0.1:8000/user/edit/${formData.userID}`,
        {
          username: formData.username,
          email: formData.email,
          number: formData.number,
          role: formData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setShowEditForm(false);
        window.location.reload();
        console.log("clicked");
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
          Edit akun sesuai keperluan
        </h5>
        <div>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              placeholder="Username"
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
              Number
            </label>
            <input
              type="number"
              name="number"
              id="number"
              value={formData.number}
              placeholder="Contact Phone"
              className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={handleInputChange}
              required
            />
          </div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            onChange={handleInputChange}
            required
          />
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            className=" bg-gray-50 border border-white ml-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 h-[40px] w-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
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

export default EditForm;
