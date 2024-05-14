import React from 'react';
import Link from 'next/link';
import Sidebar from './Sidebar'; // Import the Sidebar component

const NavUser = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <button className="text-black hover:text-black-600 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            {/* <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg> */}
          </button>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="space-x-3">
            <Link href="/home">
              <img src="/Back.png">
              </img>
            </Link>
          </div>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <Link
              href="#home"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Pesanan <span className='text-[#00ADB5]'>Saya</span>
              </span>
            </Link>
          </ul>
        </div>
        <div className="flex md:hidden">
          <button className="text-gray-500 hover:text-gray-600 focus:outline-none">
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
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavUser;
