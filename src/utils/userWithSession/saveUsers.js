function saveUsers(userData){
 const newUser = {
  id: userData.id,
  userData: userData,
  orders: [],
  cartProducts:[]
 }
 let usersList = JSON.parse(localStorage.getItem('UsersList'))
 console.log('userList R',usersList);
 if(!usersList){
  console.log('userlist is null');
  usersList = []
  localStorage.setItem('UsersList', JSON.stringify([]))
 }
 const existignUser = usersList.filter(user => user.id == newUser.id)
 if(existignUser.length == 0){
  const newUserlist = [...usersList, newUser]
  console.log(newUserlist);
  localStorage.setItem('UsersList',JSON.stringify(newUserlist))
 }
}
export{saveUsers}