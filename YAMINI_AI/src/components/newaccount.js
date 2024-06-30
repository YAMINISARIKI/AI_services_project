import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import '../css/newaccount.css'

function NewAccount(){
    const imageref = useRef(null)
    const [image, setimg] = useState('')
    const changeimg = () =>{
        imageref.current.click()
    }
    // const setBackgroundImage = () => {
    //     document.querySelector('.backgroundimg').style.backgroundImage = "url('https://space-club.onrender.com/img/space.jpg')";
    //     document.querySelector('.backgroundimg').style.backgroundSize = "cover";
    // };
    // setBackgroundImage();
    let [newuser, getnewuser] = useState({
        'fname':'',
        'lname':'',
        'password':'',
        'email':'',
        'cnfpass':'',
        'myimg':''
    })
    const [upper, setupper] = useState(0)
    const [lower, setlower] = useState(0)
    const [spc, setspc] = useState(0)
    const [num, setnum] = useState(0)
    const [len, setlen] = useState(0)
    const sp = "~@`!#$%^&*+=-[]()_.';,/{}|\":<>?";
    const checkpass = (e) => {
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
    const [userotp, setOtp] = useState({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
        otp5: "",
        otp6: ""
    });
    const [otp,setnewotp] = useState(0);

    const otpRefs = useRef([]);
    
    const handleInputChange = (e, index) => {
        const { value } = e.target;
        setOtp(prevOtp => ({
            ...prevOtp,
            [`otp${index+1}`]: value
        }));

        if (value && index <= otpRefs.current.length - 1) {
            otpRefs.current[index + 1].focus();
        }
    };
    
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && index > 0 && !userotp[`otp${index}`]) {
          //e.preventDefault(); // Prevents the browser's default backspace behavior
          otpRefs.current[index - 1].focus();
        }
      };
    const Nav = useNavigate()
    // let otp1 = '';
    // let otp2 = '';
    // let otp3 = '';
    // let otp4 = '';
    // let otp5 = '';
    // let otp6 = '';
    // let userotp = [otp1,otp2,otp3,otp4,otp5,otp6]
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
            const Senddata = new FormData()
            Senddata.append('fname',newuser.fname)
            Senddata.append('lname',newuser.lname)
            Senddata.append('password',newuser.password)
            Senddata.append('email',newuser.email)
            Senddata.append('myimg',newuser.myimg)
            axios.post('https://space-club.onrender.com/addnewuser',Senddata).then((result)=>{
                alert(result.data.msg)
                Nav('/login')
            })
        }else{
            alert('Invalid OTP')
        }
    }
    const Createuser=(e)=>{
        e.preventDefault()
        if(newuser.fname===''){
            // e.preventDefault()
            alert('Enter Your First Name')
        }else if(newuser.lname===''){
            // e.preventDefault()
            alert('Enter Your Last Name')
        }else if(newuser.email===''){
            // e.preventDefault()
            alert('Enter Your Mail')
        }else if(newuser.password===''){
            // e.preventDefault()
            alert('Create New Password')
        }else if(newuser.password===''){
            // e.preventDefault()
            alert('Create New Password')
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
        }else if(newuser.cnfpass===''){
            // e.preventDefault()
            alert('Re-enter Your Password To Conform')
        }else if(newuser.password!==newuser.cnfpass){
            // e.preventDefault()
            alert('Password Mismatch')
        }else if(newuser.myimg===''){
            // e.preventDefault()
            alert('Set Your Profile')
        }else{
            const backendmail = newuser.email
            // alert(backendmail)
            axios.get(`https://space-club.onrender.com/checkmail/${backendmail}`).then((res)=>{
                if(res.data){
                    document.getElementById('otpblock').style.display = 'block'
                    // document.getElementsByClassName('newaccountbtn').style.display = 'none'
                    // Nav('/otpwindow')
                    // e.preventDefault()
                    const mail = newuser.email
                    // console.log(mail)
                    axios.get('https://space-club.onrender.com/sendotp/'+mail).then((response)=>{
                        // console.log(mail)
                        const newotp = (response.data.otp)
                        setnewotp(newotp)
                    })
                }else{
                    alert('This Email Was Already Registered..!')
                    window.location.reload()
                }
            })
        }
    }
    return(
        <div className="parent">
            <form style={{paddingBottom:'70px'}} id="createnewaccount" onSubmit={Createuser}>
                <input className="fileinput" type="file" ref={imageref} onChange={(e)=>getnewuser({...newuser,myimg:e.target.files[0]},setimg(e.target.files[0]))}/><br/><br/>
                {image ? <img onClick={changeimg} style={{position:'relative',cursor:'pointer'}} id="editimg" src={URL.createObjectURL(image)} alt="profileImg"/> : <img onClick={changeimg} style={{position:'relative',cursor:"pointer"}} id="editimg" src={"https://space-club.onrender.com/img/null2.png"} alt="profileImg"/>}
                <input className="newaccount" type="text" placeholder="Enter Your First Name" onChange={(e)=>getnewuser({...newuser,fname:e.target.value})}/><br/><br/>
                <input className="newaccount" type="text" placeholder="Enter Your Last Name" onChange={(e)=>getnewuser({...newuser,lname:e.target.value})}/><br/><br/>
                <input className="newaccount" type="email" placeholder="Enter Your Mail" onChange={(e)=>getnewuser({...newuser,email:e.target.value})}/><br/><br/>
                <input className="newaccount" type="password" placeholder="Enter A Password" onChange={(e)=>getnewuser({...newuser,password:e.target.value},checkpass(e))}/><br/><br/>
                <input className="newaccount" type="password" placeholder="Conform Password" onChange={(e)=>getnewuser({...newuser,cnfpass:e.target.value})}/><br/><br/>
                <button className="newaccountbtn"  type="submit">Create Account</button>
            </form>
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

export default NewAccount;