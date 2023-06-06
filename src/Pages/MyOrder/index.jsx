import { useContext, useEffect, useState } from 'react'
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
  const [transactionStatus, setTransactionStatus] = useState('false')
  // Obtener los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const updateOrder = (indexIn)=>{
    if(params.size !=0){
      const params = new URLSearchParams(window.location.search);
      setTransactionStatus(params.get('lapTransactionState'))
      const paymentInfo = {
        paid: true,
        referenceCode: params.get('referenceCode'), 
        TransactionState: params.get('lapTransactionState'),
        description: params.get('description'),
        date: params.get('processingDate')
      }
      const updatedOrder = context.order.map((item, index) => {
        if (index == indexIn) {
          return { ...item, paymentInfo };
        }
        return item  
      })
      context.setOrder(updatedOrder)
    }
  }
  useEffect(()=>{
  updateOrder(index)
  },[transactionStatus])

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 top-[-40px] font-bold'>
        <Link to='/my-orders' className='absolute left-0'>
          <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
        </Link>
        <h1>My Order</h1>
      </div>
      <div className={`flex justify-evenly w-full ${context.order[index]?.paymentInfo?.paid && 'pt-16'}`}>
        <section className=' pb-9'>
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
          <div className={`w-[25%] min-w-[300px] max-w-[350px]  flex-col ${context.order[index]?.paymentInfo?.TransactionState == 'APPROVED'? 'hidden':'flex'}`}>
            <label htmlFor="addres" className='mt-4 self-start font-medium'>Addres:</label>
            <input type="text" name='addres' id='addres' className='focus:outline-none border border-black/50 rounded-lg px-3 ' onChange={handleChangeAddres}/>
            <label htmlFor="addres" className='mt-4 self-start font-medium'>City:</label>
            <input type="city" name='city' id='addres' className='focus:outline-none border border-black/50 rounded-lg px-3 ' onChange={handleChangeCity}/>
            <PayUButton
              totalPrice ={context.order[index]?.totalPrice}
              buyerEmail = {context.currentUser?.userData.email}
              addres = {addres}
              city = {city}
              responseUrl = {location.origin+location.pathname}
            />
          </div>
        </section>
        {context.order[index]?.paymentInfo?.paid &&<section className=' flex flex-col items-center '>
          <h2 className=' font-semibold mb-7'>Payment information</h2>
          <p className='w-full'><span className='relative left-0 font-medium w-[140px] inline-block'>Reference code:</span><span className=' ml-10'>{context.order?.[index]?.paymentInfo.referenceCode}</span></p>
          <p className='w-full'><span className='relative left-0 font-medium w-[140px] inline-block'>Description:</span><span className=' ml-10'>{context.order?.[index]?.paymentInfo.description}</span></p>
          <p className='w-full'><span className='relative left-0 font-medium w-[140px] inline-block'>Transaction state:</span><span className=' ml-10'>{context.order?.[index]?.paymentInfo.TransactionState}</span></p>
          <p className='w-full'><span className='relative left-0 font-medium w-[140px] inline-block'>Processing date:</span><span className=' ml-10'>{context.order?.[index]?.paymentInfo.date}</span></p>
          {context.order[index]?.paymentInfo?.TransactionState == 'APPROVED'? <p className='flex w-[350px] font-medium mt-10 text-center'>Thank you for your purchase! We are processing your order and it will be on its way soon. Keep enjoying our store!</p>:<p className='flex w-[350px] font-medium mt-10 text-center'>Oops, it seems there was an issue with your payment! Please try again.</p> }
        </section>
        }
      </div>
      
    </Layout>
  )
}

export default MyOrder