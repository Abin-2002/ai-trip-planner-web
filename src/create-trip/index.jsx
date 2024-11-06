import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/Service/AIModal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {doc, setDoc } from "firebase/firestore";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { db } from '@/Service/firebaseConfig';
import { useNavigate } from 'react-router-dom';


function CreateTrip() {
  const [place,setPlace]=useState();

  const [formData,setFormData]=useState([]);
  const [openDialog,setOpenDialog]=useState(false);


  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);

  const handleInputChange=(name,value)=>{
    setFormData({
      ...formData,
      [name]:value
    })

  }

  useEffect(()=>{
    console.log(formData);
  },[formData])

  const login=useGoogleLogin({
    onSuccess:(tokenInfo)=>GetUserProfile(tokenInfo),
    onError:(error)=>console.log(error)
  })

  const OnGenerateTrip=async()=>{

    const user=localStorage.getItem('user');

    if(!user){
      setOpenDialog(true)
      return;
    }


    if(formData?.noOfDays>5&&!formData?.location||!formData?.budget||!formData?.traveler)
      {
        toast("Please fill all the details")

      console.log("Travelers should be below 5")
      return;
    }
    setLoading(true);
    
    const FINAL_PROMPT=AI_PROMPT

    .replace('{Location}',formData?.location?.label)
    .replace('{totalDays}',formData?.noOfDays)
    .replace('{traveler}',formData?.traveler)
    .replace('{budget}',formData?.budget)
    .replace('{totalDays}',formData?.noOfDays)

    


    const result=await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--",result?.response.text());
    setLoading(false);
    SaveAITrip(result?.response.text())

  }

  const SaveAITrip=async(TripData)=>{

    setLoading(true);

    const user=JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString()

      await setDoc(doc(db, "AITrips", docId), {
        userSelection:formData,
        tripData:JSON.parse(TripData),
        userEmail:user?.email,
        id:docId
});
setLoading(false);
navigate('/view-trip/'+docId)

  }
  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    })
    .then((response)=>{
      console.log(response);
      localStorage.setItem('user',JSON.stringify(response.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })
    
  }


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preference🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information,and our trip planner will generate a customized itinerary based on your preferences.</p>
      
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination choice</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange:(V)=>{setPlace(V); handleInputChange('location',V)}

            }}
          />

        </div>
        <div>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip</h2>
        <Input placeholder={'Eg.3'} type="number"
        onChange={(e)=>handleInputChange('noOfDays',e.target.value)}
        />

        </div>
        <div>
        <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'> 
          {SelectBudgetOptions.map((item,index)=>(
            <div key={index} 
              onClick={()=>handleInputChange('budget',item.title)}
            className={`p-4 border cursor-pointer
             rounded-lg hover:shadow-lg
              ${formData?.budget==item.title&&'shadow-lg border-black'}
             `} >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>

            </div>
          ))}
          
          
          
        </div>
          </div>

          <div>
        <h2 className='text-xl my-3 font-medium'>What do you plan on travelling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'> 
          {SelectTravelesList.map((item,index)=>(
            <div key={index} 
            onClick={()=>handleInputChange('traveler',item.people)}
            className={`p-4 border rounded-lg cursor-pointer
             hover:shadow-lg
             ${formData?.traveler==item.people&&'shadow-lg border-black'}
             `} >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>

            </div>
          ))}
          
        
        </div>
          </div>

          <div className='my-10 flex justify-center'>
            <Button
               disabled={loading}    
            onClick={OnGenerateTrip}>
              {loading?
              <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />:'Generate Trip'
            }
              
              
              </Button>
          </div>
          
          <Dialog open={openDialog}>
          
          
          <DialogContent>
            
            <DialogHeader>
         
            
              <DialogDescription>
                <img src="/logo.svg"/>
                <h2 className='mt-4'> Sign In with Google</h2>
                <p>Please Sign into your Google account</p>

              <Button
               onClick={login}
              className="w-full mt-5 flex gap-5 items-center">
              <FcGoogle className='h-7 w-7' /> 
              Sign In With Google</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>


      

      </div>
    </div>
  )
}

export default CreateTrip