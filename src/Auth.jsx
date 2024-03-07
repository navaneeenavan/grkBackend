import React from "react";
import OverlayButton from "./Overlay";
import { useState } from "react";
import { supaBase } from "./supaBaseClient.js"
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
function Auth() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

const navigate = useNavigate()
  const handleLogin = async(e)=>
  {
    e.preventDefault();
    
    const {data, error} = await supaBase.auth.signInWithPassword({
        email : mail,
        password : pass,
        
    })

    if(error)
    {
        toast.error(error.message || "Please try Again");
    }
    else{
        toast.success("Login Done")
        navigate("/DashBoard")
    }
  }
  return (
    <div className=" flex  h-screen justify-center items-center mx-auto overflow-hidden text-sm flex-col">
      <div className="flex flex-col justify-center w-fit h-fit items-start mr-5 p-5 lg:px-8 lg:py-7 bg-white m-8 lg:m-10 space-y-6 text-left rounded-xl border">
        <p className="w-full items-start">Email Address</p>
        <input
          type="text"
          size={30}
          className="w-full h-10 bg-gray-100 rounded-lg text-left pl-2 mr-10"
          value={mail}
          onChange={(e)=>setMail(e.target.value)}

        />

        <p className="w-full items-start">Password</p>
        <input
          type="password"
          size={30}
          className="w-full h-10 bg-gray-100 rounded-lg pl-2"
          required
          value={pass}
          onChange={(e)=>setPass(e.target.value)}
        />
        <p className="text-blue-500 mt-2 text-sm"> Forgot Password ?</p>
        <button className="w-full rounded-lg bg-blue-500 h-10 mt-5 border hover:bg-gray-200" onClick={handleLogin}>
          Sign In
        </button>
      </div>
      <div className="absolute bottom-0 right-0 m-10">
        <OverlayButton />
      </div>
    </div>
  );
}

export default Auth;
