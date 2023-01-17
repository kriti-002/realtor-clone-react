import React, { useState } from 'react'
import {getAuth, updateProfile} from 'firebase/auth'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import {db} from '../firebase'
import {doc, updateDoc} from 'firebase/firestore'
import {FcHome} from 'react-icons/fc'
import { Link } from 'react-router-dom'
const Profile = () => {
  const auth= getAuth()
  const [formData, setFormData]=useState({
    name: auth.currentUser.displayName, email : auth.currentUser.email
  })
  const {name, email}= formData
  const [changeDetail, setChangeDetail]=useState(false)
  const navigate= useNavigate()

  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        //change name in authentication
        await updateProfile(auth.currentUser,{
          displayName : name,
        })
        //change name in firestore db
        const docRef= doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name,
        })
        toast.success('Profile Details Updated')
      } 
    } catch (error) {
      console.log(error)
      toast.error('Could not update profile, try again later')
    }
  }

  function onClick(){
    auth.signOut()
    navigate('/')
  }

  function onChange(e){
    setFormData((prev) => ({
      ...prev,
      [e.target.id] : e.target.value,
    }))

  }

  return (
    <>
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
      <div className='w-full md:w-[50%] mt-6 px-3'>
        <form>
          <input type="text" id="name" value={name}
           disabled={!changeDetail}
           onChange={onChange}
           className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${changeDetail && "bg-red-200 focus:bg-red-200"}`}/>
          <input type="email" id="email" value={email} 
          disabled={!changeDetail}
          onChange={onChange}
          className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6'/>
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p className='flex items-center'>Do you want to change your name? 
              <span onClick={() => {
                changeDetail && onSubmit()
                setChangeDetail((prev)=> !prev)
              }}
              className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>
                {changeDetail ? "Apply Change" : "Edit"}
              </span>
            </p>
            <p className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer' onClick={onClick}>Sign Out</p>
          </div>
        </form>
        <button type="submit" className='bg-blue-600 text-white uppercase w-full px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg
        active:bg-blue-800'>
        <Link to='/create-listing' className='flex justify-center items-center'>
          <FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2' /> or Rent Your Home</Link>
        </button> 
      </div>
    </section>
    </>
  )
}

export default Profile