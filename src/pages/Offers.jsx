import {startAfter, collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

const Offers = () => {
  //offers
  const [offerlistings, setOfferListings]=useState(null)
  const [loading, setLoading]= useState(true)
  const [lastFetchedListing, setLastFetchListing]= useState(null)
  useEffect(() => {
    //first
    async function fetchListings(){
      try {
        //get reference
        const listingsRef=collection(db, "listings")
        const q= query(listingsRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(8))
        const querySnap= await getDocs(q)
        const lastVisible= querySnap.docs[querySnap.docs.length - 1]
        setLastFetchListing(lastVisible)
        let listings=[]
        querySnap.forEach(doc => (
            listings.push({
            id: doc.id,
            data: doc.data(),
          })
        ));
        setOfferListings(listings)
        setLoading(false)
        //console.log(listings)
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings() 
  }, [])

  async function onFetchMoreListings() {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setOfferListings((prevState)=>[...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listing");
    }
  }

  return (
    <div className='max-w-6xl mx-auto px-3'>
    <h1 className='text-3xl text-center mt-6 font-bold'>Offers</h1>
    <div className='max-w-6xl mx-auto pt-4 space-y-6'>
        {loading ? (<Spinner />) : offerlistings && offerlistings.length > 0 ? (
          <>
          <main className='m-2 mb-6'>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
              {offerlistings.map(listing => (
                <ListingItem key={listing.id}
                listing={listing.data}
                id={listing.id}
                 />
              ))}
            </ul>
          </main>
          {lastFetchedListing && (
            <div className="flex justify-center items-center">
              <button
                onClick={onFetchMoreListings}
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
              >
                Load more
              </button>
            </div>
          )}
          </>
        ) : (
          <p>There are no current offers!</p>
        )}
        </div>
    </div>
  )
}

export default Offers