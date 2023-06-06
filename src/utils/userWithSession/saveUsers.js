function saveUsers(userData){
 const newUser = {
  id: userData.id,
  userData: userData,
  orders: [],
  cartProducts:[]
 }
 let usersList = JSON.parse(localStorage.getItem('UsersList'))
 if(!usersList){
  usersList = []
  localStorage.setItem('UsersList', JSON.stringify([]))
 }
 const existignUser = usersList.filter(user => user.id == newUser.id)
 if(existignUser.length == 0){
  const newUserlist = [...usersList, newUser]
  localStorage.setItem('UsersList',JSON.stringify(newUserlist))
 }
}
export{saveUsers}