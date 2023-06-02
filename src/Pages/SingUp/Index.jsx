import { useContext, useState } from "react";
import Layout from "../../Components/Layout";
import { ShoppingCartContext } from "../../Context";
import { Link, useNavigate } from "react-router-dom";
import { render } from "react-dom";

const SignUp = () => {
 const context = useContext(ShoppingCartContext)
 const navigate = useNavigate()
 const [name, setName] = useState('')
 const [lastName, setLastName] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const isNotAvailable = 'border border-red-700'
 const handleNameChange = (event)=>{
  setName(event.target.value)
 }
 const handleLastNameChange = (event)=>{
  setLastName(event.target.value)
 }
 const handleEmailChange = (event)=>{
  setEmail(event.target.value)
  context.setIsAvailable(null)
 }
 const handlePasswordChange = (event)=>{
  setPassword(event.target.value)
   // Expresión regular para validar letras y números
   const passwordRegex = /^[a-zA-Z0-9]+$/; 
   
   if (!passwordRegex.test(event.target.value)) {
     return setPasswordAlert(true)
   }
   setPasswordAlert(false)
 }
 const [passwordAlert, setPasswordAlert] = useState(false)
 const renderPasswordAlert = ()=>{
  return(<p className='text-red-700 text-[0.65rem] text-center'>La contraseña no debe contener caracteres especiales</p>)
 }
 const onSuccessOfSignUp =  function(){
  navigate('/')
 }
 
 const handleSingnUp=(event)=>{
  event.preventDefault()
  if(!passwordAlert){
  const newUser = {
   name: name + ' ' + lastName,
   email: email,
   password: password,
   avatar: 'https://picsum.photos/200/300'
  }
  context.setNewUser(newUser)  
  context.onSuccess === null && context.setOnSuccess(() => onSuccessOfSignUp)
  context.createNewUser(newUser, context.onSuccess)}
 }
 const renderView =()=>{
  return (
   <p className=' pl-1 text-black/60'>The email is already registered</p>
  )
 }
 return (
  <Layout>
   <form  onSubmit={(event)=>handleSingnUp(event)} className='flex flex-col bg-black/20 w-80 h-[28rem] justify-evenly items-center rounded-lg'>
    <h1 className='font-bold text-2xl'>Welcome</h1>
    <div className='w-[80%]'>
     <label htmlFor="name" className='pl-3'>Name:</label>
     <input type="text" placeholder="Your Name" id="name" onChange={handleNameChange} className=' rounded-lg  px-3 focus:outline-none w-full' required/>
    </div>
    <div className='w-[80%]'>
     <label htmlFor="LastName" className='pl-3'>Last Name:</label>
     <input type="text" placeholder="Your Last Name" id="LastName" onChange={handleLastNameChange} className=' rounded-lg  px-3 focus:outline-none w-full' required/>
    </div>
    <div className='w-[80%]'>
     <label htmlFor="email" className='pl-3'>Email:</label>
     <input type="email" placeholder="email@example.com" id="email" onChange={handleEmailChange} className={`rounded-lg  px-3 focus:outline-none w-full ${context.isAvailable === false && isNotAvailable}`} required/>
     {context.isAvailable === false && renderView()}
    </div>
    <div className='w-[80%]'>
     <label htmlFor="password" className='pl-3'>Password:</label>
     <input type="password"  id="password" onChange={handlePasswordChange} placeholder="********" className={`rounded-lg w-full px-3 focus:outline-none ${passwordAlert && 'border border-red-700'}`} required />
     {passwordAlert && renderPasswordAlert()}
    </div>
    <button  className='bg-black py-1 text-white w-[90%] rounded-lg font-bold'>
     Sign Up
    </button>
    <p>Already have an account? <Link to={'/sign-in'} className=' text-blue-700'>Sign in</Link></p>
   </form>
  </Layout>
 );
};

export default SignUp;