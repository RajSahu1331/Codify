import React from 'react'
import { useState } from 'react';
import './Register.css';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [user,setUser] = useState ({
    userName:"",
    email:"",
    password:""
  })

  const registerUser = async(e)=>{
    e.preventDefault();
    const {userName, email,password} = user;
    try {
      const {data} = await axios.post('/signup',{userName,email,password});
      console.log(data);
      if(data.error){
        toast.error(data.error)
      }
      else{
        setUser({})
        toast.success("Sign up successful");
        navigate('/c');
      }
    } catch (error) {
      console.log(error);
    }
      
  }


  return (
    <>
    {/* <div class="container"> */}
 
 <form class="sign-up" className='mt-5' onSubmit={registerUser}>

   <div class="mb-3">
      <label for="username" class="form-label">User Name</label>
<input type="text" class="form-control" id="email" placeholder="Enter your username" value={user.userName} onChange={(e)=>{setUser({...user,userName:e.target.value})}}/>
   </div>


   <div class="mb-3">
      <label for="email" class="form-label">Email</label>
<input type="email" class="form-control" id="email" placeholder="Enter your email" value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}}/>
   </div>


   <div class="mb-3">
      <label for="password" class="form-label">Password</label>
<input type="password" class="form-control" id="password" placeholder="Create a password" value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}}/>
   </div>


   <button type="submit" class="btn submit-btn">Create account</button>
 </form>
 <p class="hr-lines"> OR </p>
 <div class="social-sign-up">
   <button class="btn social"><i class="fa-brands fa-google"></i> Sign up with Google</button>
 </div>
 <div class="sign-in">
   <p>Already have an account? <a href="#">Log in</a></p>
 </div>
    {/* </div> */}

   </>


  )
}
