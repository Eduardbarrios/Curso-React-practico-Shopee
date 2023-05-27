import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const activeStyle = 'underline underline-offset-4'

  const handleLogIn=()=>{
    context.setIsLogIn(false)
    const stringifiedLogIn = JSON.stringify(false)
    localStorage.setItem('isLogIn', stringifiedLogIn)
  }


  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white'>
      <ul className='flex items-center gap-3'>
        <li className='font-semibold text-lg'>
          <NavLink to='/'>
            Shopi
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            onClick={() => context.setSearchByCategory()}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/shoes'
            onClick={() => context.setSearchByCategory('shoes')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Shoes
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/electronics'
            onClick={() => context.setSearchByCategory('electronics')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/furnitures'
            onClick={() => context.setSearchByCategory('furniture')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/toys'
            onClick={() => context.setSearchByCategory('toys')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/others'
            onClick={() => context.setSearchByCategory('others')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Others
          </NavLink>
        </li>
      </ul>
      {context.isUserLogIn? <ul className='flex items-center gap-3'>
        <li className='text-black/60'>
          teff@platzi.com
        </li>
        <li>
          <NavLink
            to='/my-orders'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/my-account'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/sign-in'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
            onClick={()=>handleLogIn()}>
            Sign out
          </NavLink>
        </li>
        <li className='flex items-center cursor-pointer' onClick={()=>{context.toggleCheckoutSideMenu()}}>
          <ShoppingBagIcon className='h-6 w-6 text-black'></ShoppingBagIcon>
          <div className=' relative top-[-10px] right-1 bg-[#FF0202] rounded-full w-4 h-4 flex justify-center items-center font-bold text-white'>{context.cartProducts.length}</div>
        </li>
      </ul>
      : <ul>
          <li>
          <NavLink
            to='/sign-in'
            className={({ isActive }) =>
              isActive ? 'hidden' : ' bg-black rounded-lg text-white px-2 py-1 font-bold'
            }
            onClick={()=>handleLogIn()}>
            Sign In
          </NavLink>
        </li>
        </ul>}
    </nav>
  )
}

export default Navbar