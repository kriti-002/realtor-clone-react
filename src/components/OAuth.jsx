import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { toast } from 'react-toastify'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router'
import {db} from '../firebase'
import { serverTimestamp, setDoc , doc, getDoc} from 'firebase/firestore'

const OAuth = () => {
  const navigate= useNavigate();
  async function onGoogleClick(){
    try {
      const auth=getAuth()
      const provider= new GoogleAuthProvider()
      const result= await signInWithPopup(auth, provider)
      const user= result.user

      //check for user in db
      const docRef= doc(db, "users", user.uid)
      const docSnap= await getDoc(docRef)

      if(!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      console.log(user)
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error('Could not authenticate with Google')
    }
  }

  return (
    <button type="button" onClick={onGoogleClick} className='px-7 py-3 w-full flex items-center justify-center bg-red-700 text-white text-sm font-medium uppercase hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg transition duration-150 ease-in-out rounded'>
      <FcGoogle className='text-2xl bg-white rounded-full mr-2'/> Continue with Google
    </button>
  )
}

export default OAuth