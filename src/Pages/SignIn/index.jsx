import { useContext } from "react";
import {  Link } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import Layout from '../../Components/Layout'

const SigIn = () => {
 const context = useContext(ShoppingCartContext)
 const handleLogIn=()=>{
  context.setIsLogIn(true)
  const stringifiedLogIn = JSON.stringify(true)
  localStorage.setItem('isLogIn', stringifiedLogIn)

}
 return (
  <Layout>
   <form action='/' onSubmit={()=>handleLogIn()} className='flex flex-col bg-black/20 w-80  h-96 justify-evenly items-center rounded-lg'>
    <h1 className='font-bold text-2xl'>Welcome</h1>
    <div className='w-[80%]'>
     <label htmlFor="email" className='pl-3'>Email:</label>
     <input type="email" placeholder="email@example.com" id="email" className=' rounded-lg  px-3 focus:outline-none w-full' required/>
    </div>
    <div className='w-[80%]'>
     <label htmlFor="password" className='pl-3'>Password:</label>
     <input type="password"  id="password" placeholder="********" className=' rounded-lg w-full px-3 focus:outline-none' required />
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