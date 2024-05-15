'use client'
import NavAdmin from '../components/NavAdmin'
import TableMobil from '../components/TableMobil'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import TableUser from '../components/TableUser'
import Loading from '../components/Loading';
import AddUser from '../components/AddUser'
import AddCar from '../components/AddCar'

export default function adminHome() {
    const [user, setUser] = useState([])
    const [showUserForm, setShowUserForm] = useState(false);
    const [showCarForm, setShowCarForm] = useState(false);

    const [car, setCar] = useState([])
    let token: any = null
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
    }
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/car/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const responses = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setCar(response.data.data);
                setUser(responses.data.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        })();
    }, [])

    const handleUser = () => {
        setShowUserForm(true);
    };
    const handleCar = () => {
        setShowCarForm(true);
    };

    return (
        <div>
            <NavAdmin />
            {showUserForm && (
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
            )}
            {/* Kondisi untuk menampilkan form edit */}
            {showUserForm && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 z-50">
                    {/* Component EditForm di sini */}
                    <AddUser setShowUserForm={setShowUserForm} token={token} />
                </div>
            )}
            {showCarForm && (
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
            )}
            {/* Kondisi untuk menampilkan form edit */}
            {showCarForm && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 z-50">
                    {/* Component EditForm di sini */}
                    <AddCar setShowEditForm={setShowCarForm} token={token} />
                </div>
            )}
            <div className='mt-20 ml-[380px]'>
                <h1 className='font-light text-[40px]'>Dashboard</h1>
                <div className='mt-5'>
                    <button 
                    onClick={handleCar}
                    className='bg-[#929292] w-[140px] h[30px] border shadow-lg rounded-md'>
                        <a className='text-white font-[30px]'>
                            Tambah Mobil
                        </a>
                    </button>
                    <button className='ml-8 bg-[#929292] w-[140px] h[30px] border shadow-lg rounded-md'
                        onClick={handleUser}
                    >
                        <a className='text-white font-[30px]'>
                            Tambah User
                        </a>
                    </button>
                    <div className='mt-20 mr-[150px]'>
                        {car && car.length > 0 ? (
                            <TableMobil carData={car} />
                        ) : (<>
                            <div className="mt-40 text-center">
                                <Loading />
                            </div>
                        </>)}
                        {user && user.length > 0 ? (
                            <div className='mt-10'>
                                <TableUser userData={user} />
                            </div>
                        ) : (<>
                            <div className="mt-40 text-center">
                                <Loading />
                            </div>
                        </>)}
                    </div>
                </div>
            </div>
        </div>
    )
}