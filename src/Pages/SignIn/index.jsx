import { useContext, useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import Layout from '../../Components/Layout'

const SigIn = () => {
 const context = useContext(ShoppingCartContext)
 const navigate = useNavigate()
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const isNotValid = 'border border-red-700'
 const handleEmailChange = (event)=>{
  setEmail(event.target.value)
  context.setValidationSuccess(null)
 }
 const handlePasswordChange = (event)=>{
  setPassword(event.target.value)
  context.setValidationSuccess(null)
 }
 const onSuccessOfSignIn =  function(){
  useNavigate('/')
 }
 const handleLogIn=(event)=>{
  event.preventDefault()
  const currentUser = {
    email: email,
    password: password
  }
  context.onSuccess === null && context.setOnSuccess(() => onSuccessOfSignIn)
  context.signIn(currentUser, context.onSuccess)
}
const renderView = ()=>{
  return(
    <p className='text-red-700'>Email or password are not correct</p>
  )
}
 return (
  <Layout>
   <form  onSubmit={(event)=>handleLogIn(event)} className='flex flex-col bg-black/20 w-80  h-96 justify-evenly items-center rounded-lg'>
    <h1 className='font-bold text-2xl'>Welcome</h1>
    {context.validationSuccess === false && renderView()}
    <div className='w-[80%]'>
     <label htmlFor="email" className='pl-3'>Email:</label>
     <input type="email" placeholder="email@example.com" id="email" className={`rounded-lg  px-3 focus:outline-none w-full ${context.validationSuccess === false && isNotValid}`} onChange={handleEmailChange} required/>
    </div>
    <div className='w-[80%]'>
     <label htmlFor="password" className='pl-3'>Password:</label>
     <input type="password"  id="password" placeholder="********" className={`rounded-lg  px-3 focus:outline-none w-full ${context.validationSuccess === false && isNotValid}`} onChange={handlePasswordChange} required />
    </div>
    <button  className='bg-black py-1 text-white w-[90%] rounded-lg font-bold'>
     Sign In
    </button>
    <p>Don't have an account yet? <Link to={'/sign-up'} className=' text-blue-700'>Sign up</Link></p>
   </form>
  </Layout>
 );
};

export default SigIn;