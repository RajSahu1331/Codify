import React from 'react'
import { useState } from 'react';
import './Register.css'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
   const navigate = useNavigate();
   const [user,setUser] = useState ({
      userName:"",
      password:""
    })

    const loginUser = async(e)=>
    {
      e.preventDefault();
      const {userName,password} = user;
      try {
         const {data} = await axios.post('/login',{userName,password});
       if(data.error){
            toast.error(data.error)
       }
       else{
         setUser({});
         toast.success("log in successful");
         navigate('/add')
       }
      } catch (error) {
         
      }
       
    }



  return (
   <>
   <form class="sign-up" className='mt-5' onSubmit={loginUser}>

<div class="mb-3">
   <label for="username" class="form-label">User Name</label>
<input type="text" class="form-control" id="email" placeholder="Enter your username" value={user.userName} onChange={(e)=>{setUser({...user,userName:e.target.value})}}/>
</div>


<div class="mb-3">
   <label for="password" class="form-label">Password</label>
<input type="password" class="form-control" id="password" placeholder="Create a password" value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}}/>
</div>


<button type="submit" class="btn submit-btn">Sign In</button>
</form>
<p class="hr-lines"> OR </p>
<div class="social-sign-up">
<button class="btn social"><i class="fa-brands fa-google"></i> Sign up with Google</button>
</div>
<div class="sign-in">
<p>Already have an account? <a href="/login">Log in</a></p>
</div>
   </>
  )
}
