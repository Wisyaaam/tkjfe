import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <div
      className="fixed inset-y-0 left-0 z-30 w-[300px] overflow-y-auto bg-[#444444] shadow-xl transform transition-transform duration-300 ease-in-out"
      style={{ transform: `translateX(${isOpen ? "0" : "-100%"})` }}
    >
      <div className="flex items-center justify-end p-4">
        <button
          className="text-white hover:text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <ul className="flex flex-col ml-10 p-4 mt-4 font-medium text-white rounded-lg bg-[#444444]">
        <li className="py-2">
          <Link href="/home" legacyBehavior>
            <a className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/homew.png" className="h-8 w-auto" alt="User Icon" />
              <span className="self-center text-lg font-semibold whitespace-nowrap">
                Beranda
              </span>
            </a>
          </Link>
        </li>
        <li className="py-2">
          <Link href="/account" legacyBehavior>
            <a className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/accw.png" className="h-8 w-auto" alt="User Icon" />
              <span className="self-center text-lg font-semibold whitespace-nowrap">
                Akun
              </span>
            </a>
          </Link>
        </li>
        <li className="py-2">
          <Link href="/booking" legacyBehavior>
            <a className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/actw.png" className="h-8 w-auto" alt="User Icon" />
              <span className="self-center text-lg font-semibold whitespace-nowrap">
                Pesanan saya
              </span>
            </a>
          </Link>
        </li>
        <li className="py-2">
          <Link href="/history" legacyBehavior>
            <a className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/orderw.png" className="h-8 w-auto" alt="User Icon" />
              <span className="self-center text-lg font-semibold whitespace-nowrap">
                Riwayat
              </span>
            </a>
          </Link>
        </li>
        <li className="py-3">
          <button href="/" onClick={handleLogout}>
            <a className="flex ml-[45px] items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-sm font-semibold whitespace-nowrap">
                Logout
              </span>
            </a>
          </button>
        </li>
        {/* Add more menu items here */}
      </ul>
    </div>
  );
};

export default Sidebar;
