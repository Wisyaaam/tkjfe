'use client'
import Link from "next/link";
import React, { useState } from "react";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { useRouter } from "next/navigation";

export default function register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setError] = useState('');

  const router = useRouter();
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      // Panggil API untuk login
      const response = await axios.post('http://127.0.0.1:8000/user/signup', {
        username,
        email,
        password,
        number
      });

      // Jika berhasil login, arahkan pengguna ke halaman berikutnya
      if (response.data.status === true) {
        console.log('Login Success', response.data.message)
        setError('')
        router.push('/Login');
      } else {
        // Handle kondisi jika login gagal
        console.log('Login failed : ', response.data.message);
        setError('Invalid Username or Password !');
      }
    } catch (error) {
      // Tangani kesalahan jika gagal memanggil API
      console.error('Error:', error);
    }
  };

  return (
    <>
      <main className="h-screen bg-gray-200">
        <div className="ml-40 mr-20 flex">

            <div className="mt-[100px] w-[610px] items-center justify-center shadow-xl">
              <img src="/Login/card.png" alt="" className="w-full h-full" />
            </div>
          {/* <div className="absolute mt-[100px] g-white-100 rounded-3xl w-[540px] items-center shadow-xl">
          </div> */}


          <div className="absolute mt-[100px] ml-[500px] bg-white shadow-xl rounded-3xl w-[620px] items-center">
            <div className="ml-[60px] mt-[30px]">
              <span className="text-[#00ADB5] font-black text-[40px] mr-3 tracking-wider">Welcome to</span>
              <span className="font-black text-[40px] tracking-wider">MobiGO!</span>
            </div>
            <p className="ml-[68px] text-gray-600 text-left">Welcome and please enter your details</p>

            <form onSubmit={handleSubmit}>
            <div className="mb-10">
              <div className="mt-4">
                <label className="ml-[130px] text-black text-lg tracking-wide">
                  Username
                </label>
                <label className="ml-[20px] text-red-600 text-sm tracking-wide">
                  {showError}
                </label>
                <input
                  id="username"
                  type="text"
                  className="ml-[100px] mt-2 bg-gray-200 rounded-full h-[60px] w-[400px] text-left p-8"
                  placeholder="Enter your Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="ml-[130px] text-black text-lg tracking-wide">
                  Email
                </label>
                <label className="ml-[20px] text-red-600 text-sm tracking-wide">
                  {showError}
                </label>
                <input
                  id="username"
                  type="email"
                  className="ml-[100px] mt-2 bg-gray-200 rounded-full h-[60px] w-[400px] text-left p-8"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="ml-[130px] text-black text-lg tracking-wide">
                  Phone
                </label>
                <label className="ml-[20px] text-red-600 text-sm tracking-wide">
                  {showError}
                </label>
                <input
                  id="username"
                  type="number"
                  className="ml-[100px] mt-2 bg-gray-200 rounded-full h-[60px] w-[400px] text-left p-8"
                  placeholder="Enter your Phone"
                  value={number}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4 relative">
                <label className="ml-[130px] text-black text-lg tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="ml-[100px] mt-2 bg-gray-200 rounded-full h-[60px] w-[400px] text-left p-8"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="ml-[450px] mt-[-42px]">
                    <label htmlFor="show-password" className="cursor-pointer">
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="text-[#00ADB5] hover:text-[#00898C] duration-200 text-xl"
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-[50px] ml-[100px]">
                <button
                  type="submit"
                  className="bg-[#00ADB5] hover:bg-[#00989d] text-white font-semibold py-2 px-4 rounded-full w-[400px] h-[50px]"
                >
                  Sign in
                </button>
              </div>
            </div>
            </form>
            

          </div>

        </div>
        <footer className="bg-gray-200 py-4 h-[90px]">
          <div className="container mx-auto text-center">
            <p className="text-gray-200">© 2023 MobiGo. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}