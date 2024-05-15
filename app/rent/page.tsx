"use client"
import NavPesan from "../components/NavPesan";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import numeral from "numeral";  
import Error from "../components/Error"
import Link from "next/link";
import { NextPageContext } from "next";


function Rent() {
    let carID:any = null
    console.log("My carID:", carID);
    console.log(carID)
    const [car, setCar] = useState([])
    const [date, setDate] = useState('')
    const [date1, setDate1] = useState('')
    const [type, setType] = useState('text')
    const [type1, setType1] = useState('text')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loding, setLoading] = useState(true)
    let hari = 0;
    const [total, setTotal] = useState(0)
    // const searchParams = useSearchParams()
    // const search = searchParams.get('carID')
    let token: any = null
    if (typeof window !== 'undefined') {
        // Code that uses localStorage
        const urlParams = new URLSearchParams(window.location.search);
         carID = urlParams.get('carID');
        token = localStorage.getItem('token')
    }
        useEffect(() => {
            (async () => {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/car/${carID}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    })
                    setCar(response.data.data); // Menyimpan data mobil ke state
                    setLoading(false)
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            })();
    
        },[carID])

    const calculateDateDifference = () => {
        const price = car.map((car: any) => car.price)
        const prices = price[0]
        // Pastikan kedua tanggal telah diisi sebelum melakukan perhitungan
        if (date && date1) {
            if (date1 < date) {
                setError(true)
                console.log("ini lebih kecil")
                setDate1('')
                console.log('sekarang udh di perbarui', date1)
            } else {
                setError(false)
            }
            // Buat objek Date dari tanggal yang diberikan
            const startDate = new Date(date);
            const endDate = new Date(date1);

            // Hitung selisih dalam milidetik
            const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

            // Ubah selisih milidetik ke hari
            const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

            // Set nilai total ke state total
            const hari = Math.abs(Math.round(differenceInDays));

            setTotal(prices * hari);
        } else {
            // Jika salah satu tanggal belum diisi, atur total ke 0
            setTotal(0);
        }
    };


    useEffect(() => {
        calculateDateDifference();
    }, [date, date1]);

    
    const handleSewa = () => {
        if(date && date1){
            try {
                axios.post(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
                    "car_id": carID,
                    "date": [
                        {
                            "booking_date": date,
                            "end_date": date1
                        }
                    ]
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        console.log(res)
                        setSuccess(true)
                    })
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log("kosong anu nya")
        }
        
    }

    return (
        <>
            {loding ?
                (<>
                    <div className="ml-[700px] mt-[250px]"><Loading /></div>
                </>) :
                (<>
                    {success ? (
                        <div className="justify-center items-center text-center">
                            <div className="justify-center items-center text-center mt-[200px]">
                                <h1 className="font-bold text-[50px]">Pesanan <span className="text-[#00ADB5]">Berhasil</span></h1>
                            </div>
                            <img src="/Success.png" alt="success" className="mt-10 ml-[700px]" />
                            <div className="text-[#8B8E93]">Segera lakukan pelunasan pembayaran dan <p></p>
                                ambil pesanan anda di toko offline kami.</div>
                            <div className="mt-4">
                                <Link href="https://maps.google.com/" className="font-semibold underline text-[#00ADB5]">Google Maps</Link>
                            </div>
                            <button
                                type="button"
                                className="bg-[#00ADB5] hover:bg-[#00989d] text-white font-semibold py-2 px-4 rounded-full w-[180px] mt-10 h-[50px]"
                            >
                                <Link href="/home">Selesai</Link>
                            </button>
                        </div>
                    ) : (
                        <div>

                            <NavPesan />
                            {car && car.length > 0 ? (
                                car.map((car: any) => (
                                    <div className="mt-[130px]">
                                        {error ? <Error error="Kesalahan pengisian tanggal!" error1="Tanggal kembali invalid" error2="silahkan isi kembali." /> : <></>}

                                        <div className="flex ml-[200px] bg-white border border-gray-400 shadow-md rounded-sm p-1 w-[1100px] h-[500px] overflow-hidden">
                                            <img src={`${process.env.NEXT_PUBLIC_API_URL}/${car.image}`} className="w-[538px] h-[250px] object-cover rounded-lg mt-8 ml-20" alt="car" />
                                            <div className="mt-[70px] ml-[80px]">
                                                <div className=" font-bold text-[20px]">{car.name}</div>
                                                <div className="flex mt-5">
                                                    <div className="flex">
                                                        <img src="/home/model.png" alt="model" className="mr-1 h-[17px] w-[20px]" />
                                                        <div className="text-[15px] w-[57px]">{car.model}</div>
                                                    </div>
                                                    <div className="ml-20 flex">
                                                        <img
                                                            src="/home/am.png"
                                                            alt="Logo"
                                                            className="mt-1 mr-1 h-[17px] w-[19]"
                                                        />
                                                        <div className=" text-[15px]">{car.am}</div>
                                                    </div>
                                                </div>
                                                <div className="flex mt-5">
                                                    <div className="flex">
                                                        <img
                                                            src="/people.png"
                                                            alt="Logo"
                                                            className="mt-[2px] mr-1 h-[17px] w-[19]"
                                                        />
                                                        <div className="text-[15px] w-[57px]">{car.capacity} Orang</div>
                                                    </div>

                                                    <div className="ml-[85px] flex">
                                                        <img
                                                            src="/gradient.png"
                                                            alt="Logo"
                                                            className="mt-[2px] mr-1 h-[17px] w-[19]"
                                                        />
                                                        <div className="text-[15px]">{car.color}</div>
                                                    </div>
                                                </div>
                                                <div className="justify-center">
                                                    <p className="text-center text-[20px] ml-[50px] mt-10">Rp.{numeral(car.price).format("0,0")} / Hari</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-[-170px]">
                                            <div className="bg-[#D3D3D3] p-[5px] rounded-lg pr-[5px]">
                                                <div className="flex">
                                                    <div className="relative ml-2">
                                                        {
                                                            type === "text" ? (
                                                                <img
                                                                    src="/date.png"
                                                                    alt="Logo"
                                                                    className="absolute mt-4 ml-3"
                                                                />
                                                            ) : (
                                                                <></>
                                                            )
                                                        }
                                                        <input type={type} onFocus={(e) => setType('datetime-local')} value={date} onChange={(e) => setDate(e.target.value)} className="date-input w-[266px] h-[60px] border bg-gray-50 border-gray-300 text-sm rounded-lg block ps-10 p-2.5" placeholder="Tanggal & jam kembali" />
                                                    </div>
                                                    <div className="relative ml-2">
                                                        {
                                                            type1 === "text" ? (
                                                                <img
                                                                    src="/date.png"
                                                                    alt="Logo"
                                                                    className="absolute mt-4 ml-3"
                                                                />
                                                            ) : (
                                                                <></>
                                                            )
                                                        }
                                                        <input type={type1} onFocus={(e) => setType1('datetime-local')} value={date1} onChange={(e) => setDate1(e.target.value)} className="date-input w-[266px] h-[60px] border bg-gray-50 border-gray-300 text-sm rounded-lg block ps-10 p-2.5" placeholder="Tanggal & jam kembali" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Total pembayaran "
                                                        className="ml-2 w-[418px] h-[60px] border border-gray-300 rounded-lg px-4"
                                                        value={(numeral(total).format("0,0"))}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="justify-center items-center text-center mt-7">
                                            <button
                                                onClick={handleSewa}
                                                type="submit"
                                                className="bg-[#00ADB5] hover:bg-[#00989d] text-white font-semibold py-2 px-4 rounded-full w-[200px] h-[50px]"
                                            >
                                                Sewa Sekarang
                                            </button>
                                        </div>
                                        {/* button */}

                                    </div>


                                ))
                            ) : (
                                <div className="ml-[700px] mt-[250px]"><Loading /></div>
                            )}
                        </div>
                    )}
                </>)}

        </>

    )
}

export default Rent;