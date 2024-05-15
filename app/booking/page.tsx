'use client'
import axios from "axios"
import NavHistory from "../components/NavHistory"
import { useState, useEffect } from "react"
import numeral from "numeral"

const calculateDaysDifference = (startDate:any, endDate:any) => {
    // Parsing tanggal
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Menghitung selisih dalam milidetik
    const timeDifference = end.getTime() - start.getTime();

    // Mengonversi selisih milidetik menjadi hari
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
};

const formatDate = (bookingDate:any, endDate: any) => {
    // Parsing tanggal
    const start = new Date(bookingDate);
    const end = new Date(endDate);

    // Mendapatkan hari, bulan, dan tahun dari tanggal akhir
    const startDay = start.getDate();
    const endDay = end.getDate();
    const endMonth = end.toLocaleString('default', { month: 'long' });
    const year = end.getFullYear();

    // Menggabungkan dalam format yang diinginkan
    const formattedDate = `${startDay} - ${endDay} ${endMonth} ${year}`;

    return formattedDate;
};

export default function Booking() {
    const [car, setCar] = useState([])
    let token: any = null
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/booking/historyUser`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setCar(response.data.data);
                console.log(car)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        })();

    }, [])


    return (
        <div>
            <NavHistory judul='Pesanan' judul1='Saya' />
            <section className="mt-40 ml-[460px]">
                {car && car.length > 0 ? (
                    car.map((car: any) => (
                        <div className="mt-10 justify-center text-center">
                            <div className="text-[20px] w-[610px] h-[56px] bg-[#00ADB5] border border-gray-400 rounded-md text-white font-semibold">
                                <p className="mt-[10px]">{formatDate(car.booking_date, car.end_date)}</p>
                            </div>
                            <div className="w-[610px] h-[275px] bg-white border border-gray-400 rounded-sm font-semibold">
                                <div className="flex">
                                    <img
                                        src='/home/Civic.png'
                                        alt='image'
                                        className="w-[269px] h-[152px] object-cover ml-10"
                                    />
                                    <div className="mt-5">
                                        <span className="text-[20px] font-bold">{car.Detail.Car.name}</span>
                                        <div className="flex mt-3">
                                            <div className="flex">
                                                <img src="/home/model.png" alt="model" className="mr-1 h-[17px] w-[20px]" />
                                                <div className="text-[16px] w-[50px]">{car.Detail.Car.model}</div>
                                            </div>
                                            <div className="ml-10 flex">
                                                <img
                                                    src="/home/am.png"
                                                    alt="Logo"
                                                    className="mt-1 mr-1 h-[17px] w-[19]"
                                                />
                                                <div className=" text-[15px]">{car.Detail.Car.am}</div>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex">
                                            <img
                                                src="/gradient.png"
                                                alt="Logo"
                                                className="mt-[2px] mr-1 h-[17px] w-[19]"
                                            />
                                            <div className="text-[15px]">{car.Detail.Car.color}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <div className="ml-[200px] flex">
                                        <span className="text-[#908F8F]">Harga</span>
                                        <span className="ml-20 text-[#908F8F]">Hari</span>
                                        <span className="ml-20 text-[#908F8F]">Total Harga</span>
                                    </div>
                                    <div className="ml-[177px] flex">
                                        <span >Rp.{numeral(car.Detail.Car.price).format("0,0")}</span>
                                        <span className="ml-20">{calculateDaysDifference(car.booking_date, car.end_date)}</span>
                                        <span className="ml-20">Rp.{numeral(car.Detail.total).format("0,0")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (<>
                    <div className="mt-40 text-center">waiting for data</div>
                </>)}
            </section>
        </div>
    )
}