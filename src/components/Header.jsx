import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import  {getAuth, onAuthStateChanged } from 'firebase/auth'
import {RiHomeHeartLine} from 'react-icons/ri'

const Header = () => {
    const location= useLocation()
    const navigate=useNavigate()
    function pathMatchingRoute(route){
        return route=== location.pathname ? true: false;
    }
    const [pageState, setPageState]= useState("Sign in")
    const auth= getAuth()
    useEffect(() => {
      onAuthStateChanged(auth, (user)=>{
        if(user){
            setPageState('Profile')
        }else{
            setPageState('Sign in')
        }
      })
    }, [auth])
    

  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
            <div>
                <h1 className='flex justify-center items-center cursor-pointer font-bold text-2xl' onClick={()=>navigate("/")} >
                    <RiHomeHeartLine className='text-red-700'/>
                    <span className='text-red-700'>Real</span>
                    <span className='text-black'>tor.com</span>
                </h1>
            </div>
            <div>
                <ul className='flex space-x-10'>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchingRoute("/") && "text-black border-b-red-500"}`} onClick={()=>navigate("/")}>Home</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchingRoute("/offers") && "text-black border-b-red-500"}`} onClick={()=>navigate("/offers")}>Offers</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(pathMatchingRoute("/sign-in") || pathMatchingRoute("/profile")) && "text-black border-b-red-500"}`} onClick={()=>navigate("/profile")}>
                        {pageState}
                    </li>
                </ul>
            </div>
        </header>
    </div>
  )
}

export default Header