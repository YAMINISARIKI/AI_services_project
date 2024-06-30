import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import '../css/login.css'

const Login = () =>{
    const [loading, setLoading] = useState(false);
    // const setBackgroundImage = () => {
    //     document.querySelector('.backgroundimg').style.backgroundImage = "url('https://space-club.onrender.com/img/earth.jpg')";
    //     document.querySelector('.backgroundimg').style.backgroundSize = "cover";
    // };
    // setBackgroundImage();
    // document.getElementsByClassName('backgroundimg').style.backgroundImage="url('http://localhost:5000/img/space.jpg')"
    const wait = (milliseconds) => {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    };
    const [login, getLogin] = useState({
        'user':'',
        'pass':''
    })
    const nav = useNavigate();
    const Getlogin = async () => {
        setLoading(true); // Set loading state to true when login request starts
        if (login.user === "") {
            setLoading(false); // Set loading state to false
            alert('Enter User Name');
            return;
        } else if (login.pass === "") {
            setLoading(false); // Set loading state to false
            alert('Enter Password');
            return;
        }
    
        try {
            const response = await axios.post(`https://space-club.onrender.com/checkmail`, login);
            if (response.data.msg === 'Invalid User!') {
                wait(2000).then(()=>{
                    alert('Invalid User! (or) Account Was Not Registered');
                })
            } else if (response.data === false) {
                wait(2000).then(()=>{
                    alert('Invalid Password!');
                })
            } else {
                localStorage.setItem('user', login.user);
                if(login.user==='saigangadharsgk@gmail.com'){
                    nav('/home')
                }else{
                    wait(2000).then(()=>{
                        alert(login.user)
                        nav(`/home`);
                    })
                }
            }
        } catch (error) {
            console.log(error);
            wait(2000).then(()=>{
                alert('Error occurred while logging in');
            })
        } finally {
            wait(2000).then(()=>{
                setLoading(false); // Set loading state to false after login request completes
            })
        }
    };
    
    return(
        <div className="parent">
            {loading ? (
                <div class="container11">
                    <div class="preloader11">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div class="shadow11"></div>
                </div>
            ) : (
                <div style={{position:'relative',top:'100px'}} id="loginblock">
                <center>
                    <input id="loginblock2" type="email" placeholder="Enter Your Email" onChange={(e)=>getLogin({...login,user:e.target.value})}/><br/><br/>
                    <input id="loginblock2" type="password" placeholder="Enter Your Password" onChange={(e)=>getLogin({...login,pass:e.target.value})}/><br/><br/>
                    <button id="loginbutton1" onClick={Getlogin}>Login</button>
                    <hr id="hr"/>
                    {/* <div style={{position:'relative',top:'40px'}}><GoogleLogin
                        onSuccess={credentialResponse => {
                            const Responcedata = jwtDecode(credentialResponse.credential)
                            // console.log(Responcedata);
                            localStorage.setItem('user', Responcedata.name);
                            // alert(Responcedata.name)
                            nav(`/home`);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />;</div> */}
                    <Link to={'/NewAccount'}><button id="loginbutton1">Create New Account</button></Link>
                    <Link to={'/forgotpassword'}><button id="loginbutton1" style={{marginBottom:'20px'}}>Forgot Password</button></Link>
                </center>
                </div>
            )}
        </div>
    )
}

export default Login;