'use client'

import Image from "next/image";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LandingHome() {

  const route = useRouter()
  const [loading, setLoadin] = useState(true)

  if (typeof window !== 'undefined') {
    // Code that uses localStorage
    const token = localStorage.getItem('token')
    let role: any = null
    useEffect(() => {
      const fetchUser = async () => {
        setLoadin(true)
        try {
          const response = await axios.get('http://127.0.0.1:8000/user/bylogin', {
            headers: { Authorization: `Bearer ${token}` },
          });
          role = response.data.data[0].role;
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
        finally {
          if(token){
            if(role == "admin") {
              route.push('/AdminHome')
            } else {
              route.push('/home')
            }
          }
          setLoadin(false)
        }
      };

      fetchUser()
    }, [])
  }

  if (loading == true) {
    return (<div></div>)
  } else {
    return (
      <>
        <Navbar />

        <section id="home">
          <div className="grid grid-cols-2">
            <div className="mt-60 ml-40">
              <span className="text-[#00ADB5] font-black text-[48px] mr-3 tracking-wider">Looking </span>
              <span className="font-black text-[48px] tracking-wider">to rent a <p>reliable car</p></span>
              <p className="mt-3 text-[20px] tracking-wide">Penyewaan mobil yang terpercaya <br /> khusus daerah Malang dan sekitarnya</p>
              <Link href="/Login">
                <button className="mt-7 ml-3 bg-gray-800 text-white py-2 px-7 rounded-full shadow-md font-bold" >Rent Now!</button>
              </Link>
            </div>
            <div className="mt-40 ml-10 ">
              <div className="background-container">
                <div className="car-container">
                  <div className="car-image"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* section about */}

        <section id="about" className="mt-80 bg-gray-200">
          <div className="grid grid-cols-2 gap-10">
            <div className="mt-16 ml-20 background-containers">
              <div className="car-containers">
                <Image src="/about_car.png" alt="Car" width="1000" height="900" className="tw-rounded-lg" />
              </div>
            </div>
            <div className="mt-16 mb-20">
              <span className="font-black text-[48px] tracking-wider">ABOUT</span>
              <span className="text-[#00ADB5] font-black text-[48px] ml-5 tracking-wider">US</span>
              <p className="mt-3  text-[24px] tracking-wide ">
                Website ini dibuat untuk memenuhi tugas akhir siswa SMK Telkom Malang Yang dikerjakan secara kelompok
                <br /><br />
                Kami membuat website ini agar memudahkan warna Malang dan sekitarnya untuk menyewa mobil dengan senang dan mudah. Dengan menyewa mobil dari MobiGo!
                <br /><br />
                perjalanan mudik, liburan, dan study tour anda terasa aman dan menyenangkan.
                <br />
                Kami menjamin kelayakan mesin mobil yang kami sewakan agar para pengguna merasa aman ketika
                <br />
                menggunakannya.
              </p>
            </div>
          </div>
        </section>

        <section id="service" className="mt-40 ">
          {/* Text Easy Step For Rent */}
          <div className="flex items-center justify-center h-full">
            <span className="mb-10 mt-10 font-black text-[40px] tracking-wider">EASY STEP</span>
            <span className="mb-10 mt-10 text-[#00ADB5] font-black text-[40px] ml-5 tracking-wider">FOR RENT</span>
          </div>

          {/* Card service */}
          <div className="ml-40 mr-20 grid grid-cols-3">
            <div className="bg-white-100 rounded-lg w-80 items-center">
              <div className="flex items-center justify-center p-5">
                <img src="/Vector.png" alt="" className="" />
              </div>
              <p className="text-gray-600 text-center">Kunjungi halaman website MobiGo! segera login jika anda sudah memiliki akun, jika belum memiliki akun segera lakukan sign up agar memudahkan proses penyewaan mobil.</p>
            </div>

            <div className="bg-white-100 rounded-lg w-80 items-center">
              <div className="flex items-center justify-center p-5">
                <img src="/ez1.png" alt="" className="" />
              </div>
              <p className="text-gray-600 text-center">Jika sudah melewati step sign in atau sign up anda harus mengisi keterangan rinci mengenai penyewaan mobil. Setelah itu anda dapat memilih mobil sesuai kebutuhan.</p>
            </div>

            <div className="bg-white-100 rounded-lg w-80 items-center">
              <div className="flex items-center justify-center p-5">
                <img src="/ez2.png" alt="" className="" />
              </div>
              <p className="text-gray-600 text-center">Setelah  verifikasi pemesanan anda dapat menuju ke alamat yang sudah kami terakan di contact. Anda dapat melakukan pembayaran di offline store, serta dapat mengambil mobil yang sudah terverifikasi.</p>
            </div>
          </div>
        </section>


        {/* Section Contact */}
        <section id="contact" className="mt-40 bg-gray-200">
          <div className="flex items-center justify-center h-full">
            <span className="mb-10 mt-10 font-black text-[40px] tracking-wider">CONTACT</span>
            <span className="mb-10 mt-10 text-[#00ADB5] font-black text-[40px] ml-5 tracking-wider">US</span>
          </div>
          <div className="mb-10 ml-40 mr-20 grid grid-cols-3">
            <div className="bg-white-100 rounded-lg w-80 items-center">
              <div className="flex items-center justify-center p-5">
                <img src="/call.png" alt="" className="" />
              </div>
              <p className="text-gray-500 font-bold text-[20px] text-center">BY PHONE</p>
              <p className="mt-4 text-dark text-center">(0341) 676732 (Office)</p>
              <p className="mt-4 text-dark text-center">+62 812 345 678 (Susi Ana)</p>
              <p className="mt-4 text-dark text-center">+62 902 777 234 (Makhrus)</p>
            </div>

            <div className="bg-white-100 rounded-lg w-80 items-center">
              <div className="flex items-center justify-center p-5">
                <img src="/chat.png" alt="" className="" />
              </div>
              <p className="text-gray-500 font-bold text-[20px] text-center">BY CHAT</p>
              <p className="mt-4 text-dark text-center">+62 991 234 567 (Andini)</p>
              <p className="mt-4 text-dark text-center">+62 231 193 567 (Tejo)</p>
            </div>

            <div className="bg-white-100 rounded-lg w-80 items-center">
              <div className="flex items-center justify-center p-5">
                <img src="/loc.png" alt="" className="" />
              </div>
              <p className="text-gray-500 font-bold text-[20px] text-center">OFFLINE STORE</p>
              <p className="mt-4 text-dark text-center">Senin s.d Minggu, 07.00 s.d 20.00</p>
              <p className="mt-4 text-dark text-center">Jalan Gunung Hatta, Kaliasih,
                Kecamatan Ampel Gading, Kota
                Malang, Jawa Timur 65138 </p>
            </div>
          </div>
          <div className="h-10" />
        </section>

        <footer className="bg-gray-300 py-4">
          <div className="container mx-auto text-center">
            <p className="text-gray-600">© 2023 MobiGo. All rights reserved.</p>
          </div>
        </footer>
      </>
    );
  }

}