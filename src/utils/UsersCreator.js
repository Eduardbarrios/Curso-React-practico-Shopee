import { ApiManager } from "./ApisCalls"

 async function createUser(userData){
  const endPoint = 'users'
  const httpMethod = 'POST'
  const headers = {}
  const response = await ApiManager.makeRequest(endPoint, httpMethod, headers, userData)
  localStorage.setItem('currentUser', JSON.stringify(response))
  return response
}

 
async function updateUser(userData, onSuccess){
  const endPoint = `users/${userData.id}`
  const httpMethod =  'PUT'
  const headers = {}
  const response = await ApiManager.makeRequest(endPoint, httpMethod, headers, userData)
}
 
async function checkEmail(userData){
 const endPoint = 'users'
 const emailToCheck = userData.email
 const httpMethod = 'GET'
 const headers = {}
 const data = await ApiManager.makeRequest(endPoint, httpMethod, headers, userData)
  const searchEmail = data?.filter(item=>item.email.toLowerCase().includes(emailToCheck.toLowerCase()))
  if(searchEmail.length){
  const isAvailable = false
  return isAvailable
  }
  else{
  const isAvailable = true
  return isAvailable
  }
}

export {createUser, checkEmail, updateUser}