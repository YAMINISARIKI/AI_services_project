import { useEffect } from "react";
import React from 'react';

function Logout(){
    useEffect(()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('id')
        localStorage.removeItem('fname')
        localStorage.removeItem('lname')
        localStorage.removeItem('profile')
        localStorage.removeItem('email')
        window.location.href='/login'
    })
    return(
        <></>
    )
}

export default Logout;