import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'
import OrderCard from '../../Components/OrderCard'
import PayUButton from '../../Components/PayUButton/PayUButton'

function MyOrder() {
  const context = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if (index === 'last') index = context.order?.length - 1
  const [addres, setAddres] = useState()
  const [city, setCity] = useState()
  const handleChangeAddres = (event)=>{
    setAddres(event.target.value)
  }
  const handleChangeCity = (event)=>{
    setCity(event.target.value)
  }

  return (
    <Layout>
      
        <div className='flex items-center justify-center relative w-80 top-[-40px]'>
          <Link to='/my-orders' className='absolute left-0'>
            <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
          </Link>
          <h1>My Order</h1>
        </div>
        <div className='flex flex-col w-80'>
          {
            context.order?.[index]?.products.map(product => (
              <OrderCard
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.images}
                price={product.price}
                quantityValidation = {false}
                quantity = {product.quantity}
              />
            ))
          }
          <span className='flex justify-between px-2 font-bold'>
            <p className=''>Total price:</p>
            <p>
            ${context.order[index]?.totalPrice}
            </p>
            </span>
        </div>
      <div className='w-[25%] min-w-[300px] max-w-[350px] flex flex-col'>
        <label htmlFor="addres" className='mt-4 self-start font-medium'>Addres:</label>
        <input type="text" name='addres' id='addres' className='focus:outline-none border border-black/50 rounded-lg px-3 ' onChange={handleChangeAddres}/>
        <label htmlFor="addres" className='mt-4 self-start font-medium'>City:</label>
        <input type="city" name='city' id='addres' className='focus:outline-none border border-black/50 rounded-lg px-3 ' onChange={handleChangeCity}/>
        <PayUButton
          totalPrice ={context.order[index]?.totalPrice}
          buyerEmail = {context.currentUser?.userData.email}
          addres = {addres}
          city = {city}
        />
      </div>
      
    </Layout>
  )
}

export default MyOrder