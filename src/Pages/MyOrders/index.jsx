import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context'
import OrdersCard from '../../Components/OrdersCard'

function MyOrders() {
  const context = useContext(ShoppingCartContext)
  const handleDelete = (index) => {
    console.log('orders', context.order);
    console.log('index', index)
    const newOrders = context.order.slice(0, index).concat(context.order.slice(index + 1));
    context.setOrder(newOrders)
  }
  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>My Orders</h1>
      </div>
      {
        context.order.map((order, index) => (
          <Link key={index} to={`/my-orders/${index}`}>
            <OrdersCard
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts} 
              date={order.date}
              index ={index}
              onDelete={handleDelete}/>
          </Link>
        ))
      }
    </Layout>
  )
}

export default MyOrders