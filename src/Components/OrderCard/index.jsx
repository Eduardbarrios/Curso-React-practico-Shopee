import {  MinusSmallIcon, PlusSmallIcon, TrashIcon, } from '@heroicons/react/20/solid'
import { useState } from 'react'

const OrderCard = props => {
  const { id, title, imageUrl, price, handleDelete,quantity, updateQuantity, quantityValidation} = props
  let renderXMarkIcon
  if (handleDelete) {
    renderXMarkIcon = <TrashIcon onClick={() => handleDelete(id)} className='w-4 text-black cursor-pointer'></TrashIcon>
  }

  return (
    <div className="flex justify-between items-center mb-3">
      <div className='flex items-center gap-2'>
        <figure className='w-20 h-20'>
          <img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title} />
        </figure>
        <span>
         <p className='text-sm font-medium'>{title}</p>
         <p className='text-lg font-bold'>{price}</p>
        </span>
      </div>
      <div className='flex items-center'>
       { quantityValidation? <span className='flex gap-1'>
          <button onClick={()=>{updateQuantity(id, 'decrement')}}><MinusSmallIcon className='w-4'/></button>
          <p>{quantity}</p>
          <button onClick={()=>{updateQuantity(id, 'increment')}}><PlusSmallIcon className='w-4'/></button>
        </span>:<p className='pt-4'>{quantity} Units</p>}
        {renderXMarkIcon}
      </div>
    </div>
  )
}

export default OrderCard