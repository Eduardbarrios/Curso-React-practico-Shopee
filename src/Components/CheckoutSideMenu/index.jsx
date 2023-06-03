import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../../Components/OrderCard'
import { totalPrice } from '@utils/TotalPriceCalculator'
import './styles.css'

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext)
  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(product => product.id != id)
    context.setCartProducts(filteredProducts)
  }
  const updateQuantity = (id,action) => {
    let newQuantity
    const updatedProducts = context.cartProducts.map((product) => {
      if (product.id === id) {
        if(product.quantity > 1 && action == 'decrement'){
          newQuantity = product.quantity - 1;
          return { ...product, quantity: newQuantity };
        }
        else if (action == 'increment'){
          newQuantity = product.quantity + 1;
          return { ...product, quantity: newQuantity };
        }
      }
      return product;
    });

    context.setCartProducts(updatedProducts);
  };
  const getDateFormat = ()=>{
    const date = new Date(); // Obtener la fecha actual
    const day = date.getDate().toString().padStart(2, '0'); // Obtener el día y agregar un cero al principio si es necesario
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes (se suma 1 porque los meses en JavaScript comienzan desde 0) y agregar un cero al principio si es necesario
    const year = date.getFullYear().toString(); // Obtener el año
    const formattedDate = `${day}/${month}/${year}`; // Formatear la fecha en el formato dd/mm/aaaa
    return formattedDate
  }
  

  const handleCheckout = () => {

    const orderToAdd = {
      date: getDateFormat(),
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
    }

    context.setOrder([...context.order, orderToAdd])
    context.setCartProducts([])
    context.setSearchByTitle(null)
    context.closeCheckoutSideMenu()
  }

  return (
    <aside
      className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>My Order</h2>
        <div>
          <XMarkIcon
            className='h-6 w-6 text-black cursor-pointer'
            onClick={() => context.closeCheckoutSideMenu()}></XMarkIcon>
        </div>
      </div>
      <div className='px-6 overflow-y-scroll flex-1'>
        {
          context.cartProducts.map(product => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.images[0]}
              price={product.price}
              quantityValidation = {true}
              quantity= {product.quantity}
              handleDelete={handleDelete}
              updateQuantity = {updateQuantity}
            />
          ))
        }
      </div>
      <div className='px-6 mb-6'>
        <p className='flex justify-between items-center mb-2'>
          <span className='font-light'>Total:</span>
          <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
        </p>
        <Link to='/my-orders/last'>
          <button className='bg-black py-3 text-white w-full rounded-lg' onClick={() => handleCheckout()}>View Order</button>
        </Link>
      </div>
    </aside>
  )
}

export default CheckoutSideMenu