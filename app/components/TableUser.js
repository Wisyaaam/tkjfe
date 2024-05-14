import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import EditForm from "./EditForm"

const TableUser = ({ userData }) => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const [displayLimit, setDisplayLimit] = useState(25); // Default display limit
  const [showEditForm, setShowEditForm] = useState(false);
  const [user, setUser] = useState([])

  const handleDisplayLimitChange = (e) => {
    setDisplayLimit(parseInt(e.target.value)); // Update display limit when user selects a new value
  };

  const handleDelete = (carID) => {
    // Panggil API untuk menghapus data dengan ID yang diberikan
    axios
      .delete(`http://127.0.0.1:8000/user/${carID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Lakukan sesuatu setelah data dihapus, misalnya muat ulang data
        console.log("Data berhasil dihapus");
        window.location.reload();
        // Di sini Anda bisa memuat ulang data menggunakan fungsi yang Anda gunakan untuk mengambil data awal
      })
      .catch((error) => {
        console.error("Error saat menghapus data:", error);
      });
  };

  const handleEdit = (userData) => {
    // Set state untuk menampilkan form edit
    setUser(userData.data);
    setShowEditForm(true);
  };

  

  return (
    <div className="relative">
      {/* Kondisi untuk menampilkan form edit */}
      {showEditForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
      )}
      {/* Kondisi untuk menampilkan form edit */}
      {showEditForm && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 z-50">
          {/* Component EditForm di sini */}
          <EditForm data={user} setShowEditForm={setShowEditForm} token={token} />
        </div>
      )}
      <div className="justify-start flex text-start content-center rounded-[10px] text-white mb-1">
        <div>
          <select
            id="displayLimit"
            className="mr-[80px] bg-gray-50 border border-white ml-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 h-[40px] w-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={displayLimit}
            onChange={handleDisplayLimitChange}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        {/* <div className="ml-[500px]">
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="content-center block h-[40px] pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-[200px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="Cari User"
            />
          </div>
        </div> */}
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-20">
        <div className="justify-center text-center content-center rounded-[3px] bg-gray-50 dark:bg-gray-800 text-white h-[50px] w-full">
          <h1 htmlFor="displayLimit" className="text-center text-[15px]">
            Data User
          </h1>
        </div>
        <table className="mt-[-10px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {userData.slice(0, displayLimit).map((user) => (
            <tr
              key={user.userID}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.username}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.number}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">
                  <button
                    className="mr-3 font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-red-500"
                    onClick={() => handleEdit({
                      data : {
                        username: user.username,
                        email: user.email,
                        number: user.number,
                        role: user.role,
                        userID: user.userID
                      }
                    })} // Panggil fungsi handleDelete saat tombol "Hapus" ditekan
                  >
                    Edit
                  </button>
                  <button
                    className="ml-1 font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-red-500"
                    onClick={() => handleDelete(user.userID)} // Panggil fungsi handleDelete saat tombol "Hapus" ditekan
                  >
                    Hapus
                  </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default TableUser;
