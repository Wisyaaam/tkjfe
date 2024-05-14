'use client'
import Link from "next/link";
import React, { useState } from "react";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { useRouter } from "next/navigation";

export default function login() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = async () => {
    console.log(email)
    console.log(password)
    try {
      // Panggil API untuk login
      setIsLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/auth', {
        email,
        password
      });
      setIsLoading(false);
      // Jika berhasil login, arahkan pengguna ke halaman berikutnya
      if (response.data.success === true) {
        console.log('Login Success', response.data)
        setError('')
        localStorage.setItem('token', response.data.token);
        console.log('TOKEN YANG GUWE DAPET : ', localStorage.getItem('token'))
        if(response.data.data.role === 'user'){
          router.push('/home');
        } else {
          router.push('/AdminHome');
        }
      } else {
        // Handle kondisi jika login gagal
        console.log('Login failed : ', response.data.message);
        setError('Invalid Username or Password !');
        setTimeout(() => {
          setError("");
        }, 2000);
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

            <div className="mt-[100px] w-[540px] items-center justify-center shadow-xl">
              <img src="/Login/card.png" alt="" className="w-full h-full" />
            </div>
          {/* <div className="absolute mt-[100px] g-white-100 rounded-3xl w-[540px] items-center shadow-xl">
          </div> */}


          <div className="absolute mt-[100px] ml-[500px] bg-white shadow-xl rounded-3xl w-[620px] items-center">
            <div className="ml-[103px] mt-20">
              <span className="text-[#00ADB5] font-black text-[40px] mr-3 tracking-wider">Welcome</span>
              <span className="font-black text-[40px] tracking-wider">back</span>
            </div>
            <p className="mr-[92px] text-gray-600 text-center">Welcome back! Please enter your details</p>

            <form onSubmit={handleSubmit}>
            <div className="mb-20">
              <div className="mt-10">
                <label className="ml-[130px] text-black text-lg tracking-wide">
                  Email
                </label>
                <label className="ml-[20px] text-red-600 text-sm tracking-wide">
                  {showError}
                </label>
                <input
                  id="username"
                  type="text"
                  className="ml-[100px] mt-2 bg-gray-200 rounded-full h-[60px] w-[400px] text-left p-8"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setUsername(e.target.value)}
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

              <div className="mt-10 mr-[20px] text-center dark:text-black">
                <span>No Account?</span>
                <Link href="/Register" className="text-blue-600 hover:underline text-sm"> <span>Create Now!</span></Link>
              </div>
              <div className="mt-[20px] ml-[100px]">
                {isLoading ? (<button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-[#75babc] text-white font-semibold py-2 px-4 rounded-full w-[400px] h-[50px]"
                >
                  Sign in
                </button>) : (<button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-[#00ADB5] hover:bg-[#00989d] text-white font-semibold py-2 px-4 rounded-full w-[400px] h-[50px]"
                >
                  Sign in
                </button>)}
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