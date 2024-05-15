'use client'
import { useRouter } from "next/navigation"
import NavUser from "../components/NavUser";
import ProductCard from "../components/ProductCard"
import axios from "axios";
import { useEffect, useState } from "react";

export default function home() {
    const route = useRouter();
    const [carData, setCarData] = useState([]);
    const [car, setCar] = useState("");
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let role:any = null
    let token: any = null
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
    }

    useEffect(() =>{
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/bylogin`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                role = response.data.data[0].role;
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
            finally{
                if(role == "admin"){
                    route.push('/AdminHome')
                }
            }
        };
        
        fetchUser()
    }, [])
    useEffect(() => {
        // Memeriksa token saat komponen dimuat
        if (!token) {
            route.push('/Login');
            return;
        }
        
        // Fungsi untuk mengambil data mobil
        const fetchCars = async () => {
            setIsLoading(true);
            try {
                const url = car ? `${process.env.NEXT_PUBLIC_API_URL}/car/${search}` : `${process.env.NEXT_PUBLIC_API_URL}/car`;
                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCarData(response.data.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCars();
    }, [search, route]);

    // Handler untuk input search
    const handleSearchChange = (e: any) => {
        setSearch(e.target.value);
    };
    const handleCarChange = (e: any) => {
        setCar(e.target.value);
    };

    // Handler untuk tombol search
    const handleSearchClick = () => {
        setSearch(car); // Ini sebenarnya tidak perlu, karena setSearch sudah dipanggil di handleSearchChange
    };

    return (
        <>
            <NavUser />
            <div className="mt-[70px]">
                <div>
                    <img src="/home/bghome.png" className="w-[1600px]" alt="Background Home"></img>
                    <div className="flex justify-center mt-[-30px]">
                        <div className="bg-[#00ADB5] p-1 rounded-lg pr-[10px]">
                            <input
                                type="text"
                                placeholder="Cari mobil yang anda inginkan"
                                className="w-[1200px] h-[60px] border border-gray-300 rounded-lg px-4"
                                onChange={handleCarChange}
                            />
                            <button
                                className="ml-[10px] bg-[#00393C] font-bold text-[#00ADB5] px-4 py-2 rounded-md w-[90px] h-[50px]"
                                onClick={handleSearchClick}
                            >
                                {isLoading ? "Loading.." : "Cari"}
                            </button>
                        </div>
                    </div>
                    <section id="service" className="mt-10 ">
                        <div className="flex items-center justify-center h-full">
                            <span className="mb-10 mt-10 font-black text-[40px] tracking-wider">EASY STEP</span>
                            <span className="mb-10 mt-10 text-[#00ADB5] font-black text-[40px] ml-5 tracking-wider">FOR RENT</span>
                        </div>
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
                    <section id="rent">
                        <div className="grid grid-cols-3 mt-[60px]">
                            {carData && carData.length > 0 ? (
                                carData.map((car: any) => (
                                    <ProductCard {...car} />
                                ))
                            ) : (
                                <p>Tidak ada data mobil.</p>
                            )}
                        </div>
                    </section>
                    <section id="contact" className="mt-40 bg-white">
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
                            <p className="text-gray-700">© 2023 MobiGo. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
