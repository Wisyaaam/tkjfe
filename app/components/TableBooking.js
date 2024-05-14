import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios library
import EditCar from "./EditCar";
import Approve from "./Approve"
import Return from "./Return"

const TableBooking = ({ carData }) => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  } 
  const [id, setID] = useState(0); // Default display limit
  const [showApprove, setShowApprove] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [user, setUser] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(25); // Default display limit

  const handleDisplayLimitChange = (e) => {
    setDisplayLimit(parseInt(e.target.value)); // Update display limit when user selects a new value
  };

  const handleDelete = (carID) => {
    console.log(carID)
    // Panggil API untuk menghapus data dengan ID yang diberikan
    axios
      .put(
        `http://127.0.0.1:8000/booking/cancel`,
        {
          
            "bookingID" : carID
        
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        window.location.reload();

        // Lakukan sesuatu setelah data dihapus, misalnya muat ulang data
        console.log("Data berhasil dihapus", response.data);
        // window.location.reload();
        // Di sini Anda bisa memuat ulang data menggunakan fungsi yang Anda gunakan untuk mengambil data awal
      })
      .catch((error) => {
        console.error("Error saat menghapus data:", error);
      });
  };
  const [booking, setBooking] = useState(null)
  const handleReturn = (carID) => {
    // Panggil API untuk menghapus data dengan ID yang diberikan
    setBooking(carID)
    console.log(carID)
    setShowReturn(true)
  };

  const handleYes = () => {
    console.log(id)
    setShowApprove(true)
  };

  return (
    <div className="relative">
      {/* Kondisi untuk menampilkan form edit */}
            {showApprove && (
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
            )}
            {/* Kondisi untuk menampilkan form edit */}
            {showApprove && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 z-50">
                    {/* Component EditForm di sini */}
                    <Approve setShowApprove={setShowApprove} token={token} ID={id} />
                </div>
            )}
            {booking && showReturn && (
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
            )}
            {/* Kondisi untuk menampilkan form edit */}
            {booking && showReturn && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 z-50">
                    {/* Component EditForm di sini */}
                    <Return setShowReturn={setShowReturn} token={token} ID={booking} />
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
      </div>

      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <div className="justify-center text-center content-center rounded-[3px] bg-gray-50 dark:bg-gray-800 text-white h-[50px] w-full">
          <h1 htmlFor="displayLimit" className="text-center text-[15px]">
            Data Booking
          </h1>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Mobil
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {carData.slice(0, displayLimit).map((car) => (
            <tr
              key={car.bookingID}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              {car.booking_status == 1 || car.booking_status == 0 ? (
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {car.User.username}
                </td>
              ) : (
                <></>
              )}
              {car.booking_status == 1 || car.booking_status == 0 ? (
                <td className="px-6 py-4">{car.Detail.Car.name}</td>
              ) : (
                <></>
              )}
              {car.booking_status == 1 || car.booking_status == 0 ? (
                <td className="px-6 py-4">{car.Detail.total}</td>
              ) : (
                <></>
              )}
              {car.booking_status == 1 || car.booking_status == 0 ? (
                <td className="px-6 py-4">
                  {car.booking_date} - {car.end_date}
                </td>
              ) : (
                <></>
              )}
              {/* {car.booking_status == 1 || car.booking_status == 0 ? (
                <td className="px-6 py-4">{car.return_date}</td>
              ) : (
                <></>
              )} */}
              {car.booking_status == 1 || car.booking_status == 0 ? (
                car.booking_status == 0 ? (
                  <td className="px-6 py-4">
                    <button
                      className="mr-3 font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-red-500"
                      onClick={() => {
                        setID(car.bookingID)
                        handleYes()
                      }}
                    >
                      Yes
                    </button>
                    <button
                      className="ml-1 font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-red-500"
                      onClick={() => handleDelete(car.bookingID)}
                    >
                      No
                    </button>
                  </td>
                ) : (
                  <td className="px-6 py-4">
                    <button
                      className="ml-1 font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-red-500"
                      onClick={() => handleReturn(car.bookingID)}
                    >
                      Return
                    </button>
                  </td>
                )
              ) : null}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default TableBooking;
