"use client"
import NavHistory from "../components/NavHistory"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Account() {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [emailChange, setEmailChange] = useState("");
    const [phoneChange, setPhoneChange] = useState("");
    const [usernameChange, setUsernameChange] = useState("");
    let token:any = null
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
        // Code that uses localStorage
      }

    useEffect(() => {
        // const getUser = async () => {
        //     try {
        //         const response = await axios.get('http://127.0.0.1:8000/user/bylogin', {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         })
        //         // setUsername(user.data.data.username)
        //         // setPhone(user.data.data.phone)
        //         // setEmail(user.data.data.email)
        //         console.log(response.data)
        //     } catch (error) {
                
        //     }
        // }
        // getUser
        const getCar = async () => {
            try {
                const user = await axios.get('http://127.0.0.1:8000/user/bylogin', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setUsername(user.data.data[0].username)
                setPhone(user.data.data[0].number)
                setEmail(user.data.data[0].email)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
            

        }
        getCar()
    }, []);

    const handleSubmit = () => {
        axios.put('http://127.0.0.1:8000/user/edituser', {
            username: usernameChange ? usernameChange : username,
            number: phoneChange ? phoneChange : phone,
            email: emailChange ? emailChange : email
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err)
        })
    }

    return (
        <div>
            <NavHistory judul="Mobi" judul1='GO' />

            <div className="mt-[120px] ml-[450px]">
                <h1 className="text-[40px] font-[1000] text-[#00ADB5] tracking-widest">Akun Saya</h1>
                <p className="text-[#908F8F]">Lengkapi profile anda !</p>
                {/* Button */}
                <div className="mt-10">
                    <label className="text-[#908F8F] text-lg tracking-wide">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="ml-[30px] mt-2 bg-gray-200 rounded-full h-[60px] w-[400px] text-left p-8"
                        placeholder="Please Wait... "
                          value={usernameChange ? usernameChange : username}
                          onChange={(e) => setUsernameChange(e.target.value)}
                        required
                    />
                </div>
                <div className="mt-10">
                    <label className="text-[#908F8F] text-lg tracking-wide">
                        Phone
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="ml-[67px] mt-2 bg-gray-200 rounded-full h-[60px] w-[400px] text-left p-8"
                        placeholder="Please Wait... "
                          value={phoneChange ? phoneChange : phone}
                          onChange={(e) => setPhoneChange(e.target.value)}
                        required
                    />
                </div>
                <div className="mt-10">
                    <label className="text-[#908F8F] text-lg tracking-wide">
                        Email
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="ml-[74px] mt-2 bg-gray-200 rounded-full h-[60px] w-[400px] text-left p-8"
                        placeholder="Please Wait... "
                          value={emailChange ? emailChange : email}
                          onChange={(e) => setEmailChange(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-[50px] ml-[270px]"><button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-[#00ADB5] hover:bg-[#00989d] text-white font-semibold py-2 px-4 rounded-full w-[100px] h-[50px]"
                >
                  Selesai
                </button>
              </div>
            </div>
        </div>
    )
}

