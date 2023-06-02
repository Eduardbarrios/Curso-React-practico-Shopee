import { BrowserRouter, Navigate, matchPath, useLocation, useRoutes } from 'react-router-dom'
import { ShoppingCartContext, ShoppingCartProvider } from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import Navbar from '../../Components/Navbar1'
import Navbar2 from '../../Components/Navbar2'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import './App.css'
import SignUp from '../SingUp/Index'
import { useContext } from 'react'


const AppRoutes = () => {
  const context = useContext(ShoppingCartContext)
  const location = useLocation()
  let showNavbar2 = [
  '/my-account',
  '/my-order',
  '/my-orders',
  '/my-orders',
  '/my-orders',
  '/sign-in',
  '/sign-up',].some((path)=> matchPath(path, location.pathname))
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/shoes', element: <Home /> },
    { path: '/electronics', element: <Home /> },
    { path: '/furnitures', element: <Home /> },
    { path: '/toys', element: <Home /> },
    { path: '/others', element: <Home /> },
    { path: '/my-account', element: context.isUserLogIn?<MyAccount />: <Navigate to='/sign-in'/>},
    { path: '/my-order', element: context.isUserLogIn?<MyOrder />: <Navigate to='/sign-in'/> },
    { path: '/my-orders', element: context.isUserLogIn?<MyOrders />: <Navigate to='/sign-in'/>},
    { path: '/my-orders/last', element: context.isUserLogIn?<MyOrder />: <Navigate to='/sign-in'/> },
    { path: '/my-orders/:id', element: context.isUserLogIn?<MyOrder />: <Navigate to='/sign-in'/> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/*', element: <NotFound /> },
  ])

  return (
    <>
      {routes}
      {showNavbar2 ? <Navbar2 /> : <Navbar />}
    </>
  );
}

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
