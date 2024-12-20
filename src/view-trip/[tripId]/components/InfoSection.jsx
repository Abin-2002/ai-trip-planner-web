import { data } from "autoprefixer"
import axios from "axios"
import Viewtrip from ".."
import { useEffect, useState } from "react"



const BASE_URL='https://places.googleapis.com/v1/places:searchText'

const config={
    headers:{
        'content-type':'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask':[
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config)

export const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY

function InfoSection({trip}) {
    const [photoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  
  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name)
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }
    
    return (
      <div>
        <img src={photoUrl?photoUrl:'placeholder2.jpg '} className='h-[340px] w-full'/>
        <div>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-xs md:text-md'>{trip.userSelection?.noOfDays}Day</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-xs md:text-md'>{trip.userSelection?.budget}Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-xs md:text-md'>{trip.userSelection?.traveler}</h2>
                    
                </div>
            </div>

        </div>
     
  </div>
  
         
    )
  }
  
  export default InfoSection

