import { createContext, useState, useEffect } from 'react'
import {createUser, checkEmail, updateUser} from '../utils/UsersCreator.js';
import { getSessionUser, signInAuth, validation } from '../utils/SignInAuth.js';
import { useNavigate } from 'react-router-dom';

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
  // Shopping Cart · Increment quantity
  const [count, setCount] = useState(0)

  // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)

  // Checkout Side Menu · Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)
  const toggleCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(!isCheckoutSideMenuOpen)

  // Product Detail · Show product
  const [productToShow, setProductToShow] = useState({})

  // Shopping Cart · Add products to cart
  const [cartProducts, setCartProducts] = useState([])

  // Shopping Cart · Order
  const [order, setOrder] = useState([])

  // Get products
  const [items, setItems] = useState(null)
  const [filteredItems, setFilteredItems] = useState(null)

  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null)

  // Get products by category
  const [searchByCategory, setSearchByCategory] = useState(null)

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setItems(data))
  }, [])

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle)
    }

    if (searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }

    if (searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    if (!searchType) {
      return items
    }
  }

  useEffect(() => {
    if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
    if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
    if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
    if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
  }, [items, searchByTitle, searchByCategory])

  // validating login
  const [isLogIn, setIsLogIn] = useState(false)
  const handleLogInValidation = (status)=>{
    setIsLogIn(status)
    localStorage.setItem('isLogIn', status)
  }
  const LogIn = JSON.parse(localStorage.getItem('isLogIn'))

  const isUserLogIn = isLogIn || LogIn
  //signIn 
  const [onSuccess, setOnSuccess] = useState(null);
  const [validationSuccess, setValidationSuccess] = useState(null)
  const signIn = async (user, onSuccess = () =>{})=>{
    const validationCred = await validation(user)
    if(validationCred != false){
      const auth = await signInAuth(validationCred)
      await getSessionUser(auth, onSuccess)
      setValidationSuccess(true)
      handleLogInValidation(true)
    }
    else if(validationCred == false){
      setValidationSuccess(false)
    }
  }

  //user creator
  const [newUser, setNewUser] = useState({})
  //the constant is created so that when the availability of the email is validated, the user is notified if it is not available.
  const [isAvailable, setIsAvailable] = useState(null)
  const createNewUser = async (user, onSuccess = ()=>{useNavigate('/')}) => {
    try {
      const isAvailable = await checkEmail(user);
      if (isAvailable) {
        setIsAvailable(true);
        const currentUser = await createUser(user)
        await signIn(currentUser, onSuccess)
      } else {
        setIsAvailable(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ShoppingCartContext.Provider value={{
      count,
      setCount,
      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,
      productToShow,
      setProductToShow,
      cartProducts,
      setCartProducts,
      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu,
      toggleCheckoutSideMenu,
      order,
      setOrder,
      items,
      setItems,
      searchByTitle,
      setSearchByTitle,
      filteredItems,
      searchByCategory,
      setSearchByCategory,
      isLogIn,
      setIsLogIn,
      handleLogInValidation,
      isUserLogIn,
      createNewUser,
      setOnSuccess,
      onSuccess,
      newUser,
      setNewUser,
      isAvailable,
      setIsAvailable,
      signIn,
      validationSuccess,
      setValidationSuccess
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

