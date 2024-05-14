'use client'
import NavAdmin from '../components/NavAdmin'
import TableMobil from '../components/TableMobil'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import TableUser from '../components/TableUser'
import Loading from '../components/Loading';
import TableBooking from '../components/TableBooking'
import Approve from '../components/Approve'

export default function adminHome() {
    const [data, setData] = useState([])
    const [showApprove, setShowApprove] = useState(false)
    let token: any = null
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
    }
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/booking`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setData(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        })();
    }, [])

    return (
        <div>
            
            <NavAdmin />
            <div className='mt-20 ml-[380px]'>
                <h1 className='font-light text-[40px]'>Booking</h1>
                <div className='mt-5'>
                    <div className='mt-20 mr-[150px]'>
                        {data && data.length > 0 ? (
                            <TableBooking carData={data} />
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