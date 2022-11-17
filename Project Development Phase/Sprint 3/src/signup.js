import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Signup() {

    const [Username, setUsername] = useState()
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const navigate = useNavigate();
    const signup = async () => {

        const postdata = { username: Username, email: Email, password: Password }
        const response = await fetch('http://127.0.0.1:5000/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postdata),
        })
        const data = await response.json()
        console.log(data.msg, data.success);
        if (data.success == true) {
            window.alert(data.msg)
            navigate("/signin")
        } else {
            window.alert(data.msg)
        }
    }


    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                    Sign Up
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">username</label>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800" >Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    <div className="mt-6">
                        <button onClick={signup} type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">Create Account</button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Already have an account?{" "}
                    <a href="/signin" className="font-medium text-purple-600 hover:underline">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}