import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="#home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://svgshare.com/i/14gc.svg" className="h-8" alt="Mobigo Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">MobiGO</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <div className="space-x-3">
            <button type="button" className="text-black bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
              <Link href="/Login">
                Sign in
                {/* <a className="hover:underline">Sign in</a> */}
              </Link>
            </button>
            <button type="button" className="text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center ">
              <Link href="/Register">
                Sign Up
                {/* <a className="hover:underline">Sign up</a> */}
              </Link>
            </button>
          </div>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link href="#home" className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent">Home</Link>
              {/* <a href="/" className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent" aria-current="page">Home</a> */}
            </li>
            <li>
              <a href="#about" className="block py-2 px-3 text-black rounded hover:bg-black md:hover:bg-transparent">About</a>
            </li>
            <li>
              <a href="#service" className="block py-2 px-3 text-black rounded hover:bg-black md:hover:bg-transparent">Services</a>
            </li>
            <li>
              <a href="#contact" className="block py-2 px-3 text-black rounded hover:bg-black md:hover:bg-transparent">Contact</a>
            </li>
          </ul>
        </div>
        <div className="flex md:hidden">
          <button className="text-gray-500 hover:text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
