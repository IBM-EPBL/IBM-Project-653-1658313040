import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {

    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const navigate = useNavigate();
    const signin = async () => {

        const postdata = { email: Email, password: Password }
        const response = await fetch('http://127.0.0.1:5000/sign-in', {
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
            navigate("/home")
        } else {
            window.alert(data.msg)
        }
    }


    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                    Sign in
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800" >Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800" >Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    {/* <a href="#" className="text-xs text-purple-600 hover:underline"> Forget Password? </a> */}
                    <div className="mt-6">
                        <button onClick={signin} type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"> Sign In</button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}