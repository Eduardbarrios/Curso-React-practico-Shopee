import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';

const ConfirmLogOut = ({cancel}) => {
 const context = useContext(ShoppingCartContext)
  const navigate = useNavigate()
 const handleSignOut =()=>{
  context.signOut()
  let currentPaht = location.pathname
  const onSuccessOfSignIn =()=>{
    navigate(currentPaht)
  }
  context.setOnSuccess(() => onSuccessOfSignIn)
 }
 return (
  <div className='absolute w-[200px] h-[100px] bg-white p-2 flex flex-col right-1 top-[50px] border border-black rounded-lg'>
   <p className=' font-semibold'>Are you sure you want to log out?</p>
   <div className=' w-full flex justify-around mt-2'>
    <Link to='/sign-in' onClick={()=>{handleSignOut()}}>
     <button   className=' bg-black text-white py-0.5 px-2 font-semibold rounded-2xl'>Confirm</button>
    </Link>
    <button onClick={cancel} className='border border-red-700 py-0.5 px-2 font-semibold rounded-2xl' >Cancel</button>
   </div>
  </div>
 );
};

export default ConfirmLogOut;