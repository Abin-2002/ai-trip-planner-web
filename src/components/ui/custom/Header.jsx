import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog" 
import axios from 'axios'; 

function Header() {

  const user=JSON.parse(localStorage.getItem('user'));
  const [openDialog,setOpenDialog]=useState(false);
  useEffect(()=>{
    console.log(user)
  },[])

  const login=useGoogleLogin({
    onSuccess:(tokenInfo)=>GetUserProfile(tokenInfo),
    onError:(error)=>console.log(error)
  }) 
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
      window.location.reload()
    })
    
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.svg'/>
      <div>
        {user?
            <div className='flex items-center gap-3'>
            <a href='/create-trip'>
            <Button variant="outline"
            className="rounded-full">Create Trip</Button>
            </a>
            <a href='/my-trips'>
            <Button variant="outline" className='rounded-full'>My Trip</Button></a>
            <Popover>
            <PopoverTrigger>
            <img src={user?.picture} referrerPolicy="no-referrer" className='h-[35-px] w-[35px] rounded-full'/>
            </PopoverTrigger>
            <PopoverContent>
              <h2 className='cursor-pointer' onClick={()=>{
                googleLogout();
                localStorage.clear();
                window.location.href = "/";
              }}>Logout</h2>
              </PopoverContent>
          </Popover>


          </div>
          :

      
        <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>
      }
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
  )
}

export default Header