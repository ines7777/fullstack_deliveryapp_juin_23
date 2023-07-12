import React, { useEffect, useState } from "react";
import delivery from "../assets/img/delivery.jpg";
import logo from "../assets/img/logo.png";
import { LoginInput } from "../components";
import {FaEnvelope, FaLock, FcGoogle} from "../assets/icons";
import "./login.css";
import {motion} from "framer-motion";
import { buttonClick } from "../animations";

import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {app} from "../config/firebase.config"
import { validateUserJWTToken } from "../api";
import {useNavigate} from "react-router-dom";

import {setUserDetails} from "../context/actions/userActions";
import { useDispatch, useSelector } from 'react-redux';
import { alertInfo, alertWarning } from "../context/actions/alertActions";

const Login = () => {

const[userEmail,setUserEmail]=useState("")
const[isSignUp,setIsSignUp]=useState(false)
const[password,setPassword]=useState("")
const[confirm_password,setConfirm_password]=useState("")


const firebaseAuth=getAuth(app)
const provider=new GoogleAuthProvider()

const navigate=useNavigate()
const dispatch= useDispatch()

const user= useSelector((state)=>state.user)
const alert= useSelector((state)=>state.alert)


useEffect(()=>{
  if(user){
    navigate("/", {replace:true})
  }
},[user])

const loginWithGoogle = async() => {
  await signInWithPopup(firebaseAuth,provider).then(userCred =>{
    firebaseAuth.onAuthStateChanged((cred)=>{
      if(cred){
        cred.getIdToken().then(token=>{
          validateUserJWTToken(token).then(data=>{
            
            dispatch(setUserDetails(data))
          })
          navigate("/",{replace:true})
        })
      }
    })
  })
}


const signUpWithEmailPass= async()=>{
  if(userEmail===""|| password===""||confirm_password===""){
       dispatch(alertInfo("Required field should not be empty"))
  }else{
    if(password===confirm_password){
      setUserEmail("")
      setPassword("")
      setConfirm_password("")
        await createUserWithEmailAndPassword(firebaseAuth,userEmail,password)
        .then(userCred =>{
          firebaseAuth.onAuthStateChanged((cred)=>{
            if(cred){
              cred.getIdToken().then(token=>{
                validateUserJWTToken(token).then(data=>{
                  
                  
                  dispatch(setUserDetails(data))
                })
                navigate("/",{replace:true})
              })
            }
          })
        })
        
        
    }else{
      dispatch(alertWarning("Password dosen't match"))
    }
  }
}


const signInWithEmailPass= async()=>{
  if(userEmail !== "" && password !==""){
    await signInWithEmailAndPassword(firebaseAuth,userEmail,password).then(userCred=>{
      firebaseAuth.onAuthStateChanged((cred)=>{
        if(cred){
          cred.getIdToken().then(token=>{
            validateUserJWTToken(token).then(data=>{
              
              
              dispatch(setUserDetails(data))
            })
            navigate("/",{replace:true})
          })
        }
      })
    })
    
  }
  else{
    dispatch(alertWarning("Password doesn't match"))
  }

}

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/*background-image*/}
      <img
        src={delivery}
        className="w-full h-full object-cover absolute top-0 left-0"
        alt=""
      />
      {/*Content box*/}
      <div className="flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">

       {/*top logo section*/}
       <div className="flex items-center justify-start gap-4 w-full">
        <img src={logo} className="w-8" alt=""/>
        <p className="text-headingColor font-semibold text-2xl">City</p>

       </div>

       {/*welcome text*/}
       <p className="text-3xl font-semibold text-headingColor ">Welcome Back</p>
       <p className="text-xl text-textColor -mt-6" >{isSignUp ? "Sign Up" : "Sign In"} with following</p>

       {/*input section */}

       <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
         <LoginInput placeHolder={"Email Here"} icon={<FaEnvelope className="text-xl text-textColor" />}
          inputState={userEmail} inputStateFunc={setUserEmail}
           type="email" isSignUp={isSignUp}/>

          <LoginInput placeHolder={"Password Here"} icon={<FaLock className="text-xl text-textColor" />}
          inputState={password} inputStateFunc={setPassword}
           type="password" isSignUp={isSignUp}/>


          {
            isSignUp && (
          <LoginInput placeHolder={"Confirm Password Here"} icon={<FaLock className="text-xl text-textColor" />}
          inputState={confirm_password} inputStateFunc={setConfirm_password}
           type="password" isSignUp={isSignUp}/>



            )
          }

          {!isSignUp ? 
          (<p>Dosen't have an account:{" "}
          <motion.button {...buttonClick} className="text-red-400 underline 
          cursor-pointer bg-transparent" onClick={()=>setIsSignUp(true)}>
            Create one
            </motion.button> </p> ) : 

            (<p>Already have an account:{" "}
            <motion.button {...buttonClick} className="text-red-400 underline 
            cursor-pointer bg-transparent" onClick={()=>setIsSignUp(false)}>
              Sign in here
              </motion.button> </p> )
            }

            {/*button section */}
           {isSignUp ?
            (<motion.button {...buttonClick} className="w-full px-4 py-2 rounded-md bg-red-400 
            cursor-pointer text-white text-xl capitalize hover:bg-red-500
             transition-all duration-150" onClick={signUpWithEmailPass}>
              Sign up
            </motion.button>)
            :
            (<motion.button {...buttonClick} className="w-full px-4 py-2 rounded-md bg-red-400 
            cursor-pointer text-white text-xl capitalize hover:bg-red-500
             transition-all duration-150" onClick={signInWithEmailPass}>
              Sign in
            </motion.button>)}


       </div>

       <div className="flex items-center justify-between gap-16">
        <div className="w-24 h-[1px] rounded-md bg-white"></div>
        <p className="text-white">or</p>
        <div className="w-24 h-[1px] rounded-md bg-white"></div>

       </div>

       <motion.div {...buttonClick} 
       className="flex items-center justify-center 
       px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer
        rounded-3xl gap-4" onClick={loginWithGoogle}>

       <FcGoogle className="text-3xl"/>
       <p className="capitalize text-base text-headingColor">Sign in with Google</p>

       </motion.div>

      </div>
    </div>
  );
};

export default Login;
