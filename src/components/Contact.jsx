import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import  {getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'


const Contact = (props) => {
    const [landlord, setLandlord]= useState(null)
    const [message, setMessage] =useState("")
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

    function onChange(e){
        setMessage(e.target.value)

    }
    useEffect(() => {
      //first
      async function getLandlord(){
        const docRef= doc(db, "users", props.userRef)
        const docSnap= await getDoc(docRef)
        if(docSnap.exists()){
            setLandlord(docSnap.data())
        }else{
            toast.error('Could not get landlord data')
        }
      }
      getLandlord()
      
    }, [props.userRef])
    
  return (
    <>{landlord!== null && (pageState==='Sign in' ? (<>
    <p className='mb-2'>You need to sign-in/sign-up for contacting the landlord</p>
    <Link to='/sign-in'>
    <button type='button' className='px-7 py-3 bg-blue-600 text-white text-sm rounded uppercase font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
                active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6'>Sign In</button>
    </Link>
    </>) :(
        <div className='flex flex-col w-full mt-10'>
            <p>Contact {landlord.name} for the {props.listing.name.toLowerCase()}</p>
            <div className='mt-3 mb-6'>
                <textarea name="message"
                id="message" rows="2" value={message}
                onChange={onChange} 
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 '
                 ></textarea>
            </div>
            <a href={`mailto:${landlord.email}?Subject=${props.listing.name}&body=${message}`}>
                <button type='button' className='px-7 py-3 bg-blue-600 text-white text-sm rounded uppercase font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
                active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6'>Send Message</button>
            </a>
        </div>
    ))
    }</>
  )
}

export default Contact