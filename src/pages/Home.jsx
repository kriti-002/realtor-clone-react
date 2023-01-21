import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Slider from '../components/Slider'
import ListingItem from '../components/ListingItem'
import { Link } from 'react-router-dom'

const Home = () => {
  //offers
  const [offerlistings, setOfferListings]=useState(null)
  useEffect(() => {
    //first
    async function fetchListings(){
      try {
        //get reference
        const listingsRef=collection(db, "listings")
        const q= query(listingsRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(4))
        const querySnap= await getDocs(q)
        let listings=[]
        querySnap.forEach(doc => (
            listings.push({
            id: doc.id,
            data: doc.data(),
          })
        ));
        setOfferListings(listings)
        //console.log(listings)
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings() 
  }, [])

  // rent
  const [rentlistings, setRentListings]=useState(null)
  useEffect(() => {
    //first
    async function fetchListings(){
      try {
        //get reference
        const listingsRef=collection(db, "listings")
        const q= query(listingsRef, where("type", "==", "rent"), orderBy("timestamp", "desc"), limit(4))
        const querySnap= await getDocs(q)
        let listings=[]
        querySnap.forEach(doc => (
            listings.push({
            id: doc.id,
            data: doc.data(),
          })
        ));
        setRentListings(listings)
        //console.log(listings)
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings()
  }, []) 

  //sell
  const [selllistings, setSellListings]=useState(null)
  useEffect(() => {
    //first
    async function fetchListings(){
      try {
        //get reference
        const listingsRef=collection(db, "listings")
        const q= query(listingsRef, where("type", "==", "sale"), orderBy("timestamp", "desc"), limit(4))
        const querySnap= await getDocs(q)
        let listings=[]
        querySnap.forEach(doc => (
            listings.push({
            id: doc.id,
            data: doc.data(),
          })
        ));
        setSellListings(listings)
        //console.log(listings)
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings()
}, []) 
  return (
    <div>
      <Slider />
      <div className='max-w-6xl mx-auto pt-4 space-y-6'>
        {offerlistings && offerlistings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent Offers</h2>
            <Link to='/offers'><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show More Offers</p></Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {offerlistings.map(listing => (
                <ListingItem key={listing.id}
                listing={listing.data}
                id={listing.id}
                 />
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className='max-w-6xl mx-auto pt-4 space-y-6'>
        {rentlistings && rentlistings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Places On Rent</h2>
            <Link to='/category/rent'><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show More Places for Rent</p></Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {rentlistings.map(listing => (
                <ListingItem key={listing.id}
                listing={listing.data}
                id={listing.id}
                 />
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className='max-w-6xl mx-auto pt-4 space-y-6'>
        {selllistings && selllistings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Places on Sale</h2>
            <Link to='/offers'><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show More Offers</p></Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {selllistings.map(listing => (
                <ListingItem key={listing.id}
                listing={listing.data}
                id={listing.id}
                 />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home