import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import { ShoppingCartContext, ShoppingCartProvider } from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import './App.css'
import SignUp from '../SingUp/Index'
import { useContext } from 'react'


const AppRoutes = () => {
  const context = useContext(ShoppingCartContext)
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/shoes', element: <Home /> },
    { path: '/electronics', element: <Home /> },
    { path: '/furnitures', element: <Home /> },
    { path: '/toys', element: <Home /> },
    { path: '/others', element: <Home /> },
    { path: '/my-account', element: context.isLogIn?<MyAccount />: <Navigate to='/sign-in'/>},
    { path: '/my-order', element: context.isLogIn?<MyOrder />: <Navigate to='/sign-in'/> },
    { path: '/my-orders', element: context.isLogIn?<MyOrders />: <Navigate to='/sign-in'/>},
    { path: '/my-orders/last', element: context.isLogIn?<MyOrder />: <Navigate to='/sign-in'/> },
    { path: '/my-orders/:id', element: context.isLogIn?<MyOrder />: <Navigate to='/sign-in'/> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/*', element: <NotFound /> },
  ])

  return routes
}

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
