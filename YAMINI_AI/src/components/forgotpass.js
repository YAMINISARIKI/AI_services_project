import axios from "axios";
import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import '../css/forgotpass.css'

function Forgotpassword(){
    // const setBackgroundImage = () => {
    //     document.querySelector('.backgroundimg').style.backgroundImage = "url('https://space-club.onrender.com/img/rover.jpg')";
    //     document.querySelector('.backgroundimg').style.backgroundSize = "cover";
    // };
    // setBackgroundImage();
    const nav = useNavigate()
    const [Data,Setdata] = useState({
        'email':'',
        'newpass':'',
        'cnfnewpass':''
    })
    const [upper, setupper] = useState(0)
    const [lower, setlower] = useState(0)
    const [spc, setspc] = useState(0)
    const [num, setnum] = useState(0)
    const [len, setlen] = useState(0)
    const sp = "~@`!#$%^&*+=-[]()_.';,/{}|\":<>?";
    const checkpass = (e) => {
        e.preventDefault()
        var upper = 0;
        var lower = 0;
        var spc = 0;
        var num = 0;
        var x = e.target.value;
        for (var i=0;i<x.length;i++){
            if(x[i]===x[i].toUpperCase() && isNaN(x[i]) && !(sp.includes(x[i]))){
                upper+=1;
            }else if(x[i]===x[i].toLowerCase() && isNaN(x[i]) && !(sp.includes(x[i]))){
                lower++;
            }else if(sp.includes(x[i])){
                spc++;
            }else{
                num++;
            }
        }
        setupper(upper)
        setlower(lower)
        setspc(spc)
        setnum(num)
        setlen(x.length)
        // console.log(upper)
        // console.log(lower)
        // console.log(spc)
        // console.log(num)
        // console.log(x)
    }
    const [otp,setnewotp] = useState(0);
    const otpRefs = useRef([]);
    const [userotp, setOtp] = useState({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
        otp5: "",
        otp6: ""
    });
    const handleInputChange = (e, index) => {
        const { value } = e.target;
        setOtp(prevOtp => ({
            ...prevOtp,
            [`otp${index+1}`]: value
        }));

        if (value && index <= otpRefs.current.length - 1) {
            // otpRefs.current[index + 1].focus();
            if(index===5 || index===0){
                otpRefs.current[index].focus();

            }else{
                otpRefs.current[index].focus();
            }
        }
    };
    const x = otpRefs.length-1
    const handleKeyDown = (e, index) => {
        // e.preventDefault()
        if (e.key === "Backspace" && index <= otpRefs.current.length - 1) {
            if(index===5 || index===0){
                otpRefs.current[index].focus();

            }else{
                otpRefs.current[index].focus();
            }
        }
      };      
    const Otpfun=(e)=>{
        // console.log(otp1,otp2,otp3,otp4,otp5,otp6)
        e.preventDefault()
        let otp1 = String(userotp.otp1)
        let otp2 = String(userotp.otp2)
        let otp3 = String(userotp.otp3)
        let otp4 = String(userotp.otp4)
        let otp5 = String(userotp.otp5)
        let otp6 = String(userotp.otp6)
        let userotp1 = [otp1,otp2,otp3,otp4,otp5,otp6]
        console.log(userotp1)
        const newotp = String(otp)
        console.log(newotp)
        let c = 0
        for(var i=0;i<6;i++){
            if(newotp[i]===userotp1[i]){
                c++;
            }
        }
        if(c===6){
            // alert('valid otp')
            axios.put('https://space-club.onrender.com/updatepass',Data).then((res)=>{
                alert("Password Updated Sucessfully")
                window.location.href='/login'
            })
        }else{
            alert('Invalid OTP')
        }
    }
    const Resetpassword=(e)=>{
        e.preventDefault()
        if(Data.email===""){
            // e.preventDefault()
            alert('Enter Your Email')
        }else if(Data.newpass===''){
            // e.preventDefault()
            alert('Create A New Password')
        }else if(upper===0){
            // e.preventDefault()
            alert('Password Must Contain One Captal Letter')
        }else if(lower===0){
            // e.preventDefault()
            alert('Password Must Contain One Lower Letter')
        }else if(spc===0){
            // e.preventDefault()
            alert('Password Must Contain One Special Character')
        }else if(num===0){
            // e.preventDefault()
            alert('Password Must Contain One Number')
        }else if(len<8){
            // e.preventDefault()
            alert('Password Must Contain Atleast 8 Characters')
        }else if(Data.cnfnewpass===''){
            // e.preventDefault()
            alert('Re-Enter Your New Password')
        }else if(Data.newpass!=Data.cnfnewpass){
            // e.preventDefault()
            alert('Password Mismatch')
        }else{
            // alert(Data.email)
            const mailid = Data.email;
            axios.get(`https://space-club.onrender.com/forgotpassword/${mailid}`).then((res)=>{
                if(res.data){
                    document.getElementById('otpblock').style.display = 'block'
                    const genotp = res.data
                    setnewotp(genotp)
                    // alert(res.data)
                }else{
                    alert('Account Not Found')
                    window.location.reload()
                }
            })
        }    
    }
    return(
        <div className="parent">
            <div style={{textAlign:'center'}} id="loginblock">
                <input id="loginblock2" type="email" placeholder="Enter Your Email" onChange={(e)=>Setdata({...Data,email:e.target.value})}/><br/><br/>
                <input id="loginblock2" type="password" placeholder="Enter A New Password" onChange={(e)=>Setdata({...Data,newpass:e.target.value},checkpass(e))}/><br/><br/>
                <input id="loginblock2" type="password" placeholder="Re-Enter Your Password" onChange={(e)=>Setdata({...Data,cnfnewpass:e.target.value})}/><br/><br/>
                <button id="loginbutton1" style={{marginBottom:'20px'}} onClick={(e)=>Resetpassword(e)}>Reset Password</button>
            </div>
            <div id="otpblock">
                <div id="otpwindow">
                    <h2 id="otpnote">Please Enter OTP!</h2>
                    {[1, 2, 3, 4, 5, 6].map((number, index) => (
                        <input
                            key={index}
                            ref={ref => (otpRefs.current[index] = ref)}
                            className="otpinput"
                            maxLength={1}
                            value={otp[`otp${index}`]}
                            onChange={e => handleInputChange(e, index)}
                            onKeyDown={e => handleKeyDown(e, index)}
                        />
                    ))}
                    <br />
                    <button onClick={Otpfun} className="otpbtn">SUBMIT</button>
                </div>
            </div>
        </div>
    )
}

export default Forgotpassword;