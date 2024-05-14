import React from 'react';;
import SidebarAdmin from './SidebarAdmin'; // Import the Sidebar component

const NavAdmin = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-start mx-auto p-4">
        <button className="text-black hover:text-black-600 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
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
      <SidebarAdmin isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default NavAdmin;
