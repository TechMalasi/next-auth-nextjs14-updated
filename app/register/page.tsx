"use client";
import { setEngine } from "crypto";
import Link from "next/Link";
import React, { useState } from "react";
import {useRouter} from "next/navigation";
import {useSession } from 'next-auth/react'

const Register = () => {
  const [customerror, setCustomerror] = useState();
  const [data, setData] = useState({});
  const router = useRouter();

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    const email = data.email;
    const password = data.password;

    try{

       const response =await  fetch("/api/register",{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({email,password})
       });

       const res = await response.json();
       console.log(res.status);
       if(response.status==200)
       {
        router.push("/login")
       }
       if(response.status==400){
        setCustomerror(res.msg) ;
       }

    }catch(err){
      console.log(err);

    }





  };

  return (
    <div className="flex min-h-screen flex-col  items-center justify-between p-24">
      <div className="border-2 border-gray-500 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl text-center font-semibold mb-8">Register</h1>

        <input
          name="email"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black text-[18px]"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          name="password"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:border-blue-400 focus:text-black text-[18px]"
          placeholder="password"
          required
          onChange={handleChange}
        />
        <div className="text-center">
          <button
            onClick={() =>  handleSubmit()}
            className=" w-1/2 bg-blue-500 text-white  py-2 rounded hover:bg-blue-600 mt-6 text-[16px]"
          >
            Register
          </button>
          <div className="text-red-500 text-[16px] mb-4">
            {customerror && customerror}
          </div>
        </div>

        <div className="text-center text-gray-500 mt-4 text-sm">- OR - </div>
        <Link
          href="/login"
          className="block text-center text-blue-500 mt-2 text-[16px] hover:underline"
        >
          Login with existing account
        </Link>
      </div>
    </div>
  );
};

export default Register;
