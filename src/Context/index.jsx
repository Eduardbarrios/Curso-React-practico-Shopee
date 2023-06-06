import { createContext, useState, useEffect } from 'react'
import {createUser, checkEmail, updateUser} from '../utils/UsersCreator.js';
import { getSessionUser, signInAuth, validation } from '../utils/SignInAuth.js';
import { useNavigate } from 'react-router-dom';

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
  // Shopping Cart · Increment quantity
  const [count, setCount] = useState()

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
    if(validationCred != false && validationCred != 'noEmail'){
      const auth = await signInAuth(validationCred)
      await getSessionUser(auth)
      setValidationSuccess(true)
      handleLogInValidation(true)
      onSuccess()
    }
    else if(validationCred == false){
      setValidationSuccess(false)
    }
    else if(validationCred == 'noEmail'){
      setValidationSuccess('noEmail')
    }
  }
  const signOut =()=>{
    localStorage.removeItem('authTokens')
    localStorage.removeItem('currentUser')
    handleLogInValidation(false)
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
  //persistencia de la sesión de un usuario
  const [currentUserId, setCurrentUserId] = useState(JSON.parse(localStorage.getItem('currentUser'))?.id || undefined)
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(()=>{
    if(isUserLogIn){
      const getUser = JSON.parse(localStorage.getItem('currentUser'))
      setCurrentUserId(getUser?.id)
    }else{
      setCurrentUserId(undefined)
    }
  },[isUserLogIn]) 
  
  const getSessionStatus =()=>{
    const usersList = JSON.parse(localStorage.getItem('UsersList')) || null
    if(usersList != null){
      const currentUser = usersList.filter(user => user.id == currentUserId)
      setCartProducts(currentUser[0].cartProducts)
      setOrder(currentUser[0].orders)
      setCount(currentUser[0].cartProducts.length)
      setCurrentUser(currentUser[0])
  }
  }
  useEffect(()=>{
    if(isUserLogIn){
      getSessionStatus()
    }
  },[currentUserId])

  const updateSession =()=>{
    if(currentUser != null) {
      const updatedCurrentUser = {
      ...currentUser,
      cartProducts: cartProducts,
      orders:order
    }
    const usersList = JSON.parse(localStorage.getItem('UsersList'))
    const usersListUpdated = usersList.map(user =>{
      if(user.id == currentUserId){
        return{...updatedCurrentUser}
      } else { return user}
    })
    localStorage.setItem('UsersList', JSON.stringify(usersListUpdated))
  }
} 
  useEffect(()=>{
    updateSession()
  },[cartProducts, order])

 
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
      signOut,
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

