import { useContext } from 'react'
import { XMarkIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import './styles.css'

const ProductDetail = (data) => {
  const context = useContext(ShoppingCartContext)

  const addProductsToCart = (event, productData) => {
    if(context.isUserLogIn){
      event.stopPropagation()
    context.setCount(context.count + 1)
    context.setCartProducts([...context.cartProducts, productData])
    context.openCheckoutSideMenu()
    context.closeProductDetail()
    }else{
      navigate("/sign-in");
    }
  }

  const renderIcon = (id) => {
    const isInCart = context.cartProducts.filter(product => product.id === id).length > 0

    if (isInCart) {
      return (
        <div
         className='absolute bottom-0 right-0 flex justify-center items-center bg-black w-8 h-8 rounded-full m-2 p-1 cursor-pointer'>
          <CheckIcon className='h-6 w-6 text-white'></CheckIcon>
        </div>
      )
    } else {
      return (
        <div
          className='absolute bottom-0 right-0 flex justify-center items-center bg-black w-8 h-8 rounded-full m-2 p-1 cursor-pointer'
          onClick={(event) => addProductsToCart(event, context.productToShow)}>
          <PlusIcon className='h-6 w-6 text-white'></PlusIcon>
        </div>
      )
    }
  }
  return (
    <aside
      className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0  border border-black  rounded-lg bg-white`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>Detail</h2>
        <div>
          <XMarkIcon
            className='h-6 w-6 text-black cursor-pointer'
            onClick={() => context.closeProductDetail()}></XMarkIcon>
        </div>
      </div>
      <figure className='px-6 max-h-[310px]'>
        <img
          className='w-full h-full rounded-lg object-cover'
          src={context.productToShow.images}
          alt={context.productToShow.title} />
      </figure>
      <p className='flex flex-col p-6'>
        <span className='font-medium text-2xl mb-2'>${context.productToShow.price}</span>
        <span className='font-medium text-xl'>{context.productToShow.title}</span>
        <span className='font-light text-sm'>{context.productToShow.description}</span>
      </p>
      {renderIcon(context.productToShow.id)}
    </aside>
  )
}

export default ProductDetail