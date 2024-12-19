import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios"

const Home = () => {

    const [status,setStatus]=useState(null)

    useEffect(()=>{

        
    }, [])


    const onClickGoogleSignIn = () => {
        axios.get("https://jobtracker-m84h.onrender.com//auth/google").then((response)=>{
            setStatus(response.data)
            console.log(response.data)
    
        })
        .catch((err)=>{
            console.log(err)
        })
    };

   

  return (
    <>
    <div>
      <h1>Welcome to Job Tracker</h1>
    </div>
    <div className="d-flex gap-2 mb-2">
    <a href="https://jobtracker-m84h.onrender.com/auth/google">
            <button style={{ padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
                Sign in With Google
            </button>
        </a>
    
    <div></div>
    </div>
    </>
  )
}

export default Home
