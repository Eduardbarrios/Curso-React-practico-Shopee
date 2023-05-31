import { ApiManager } from "./ApisCalls"

async function validation(userData){
  const emailToCheck = userData.email
  const endPoint = 'users'
  const httpMethod = 'GET'
  const headers = {}
  const data = await ApiManager.makeRequest(endPoint, httpMethod, headers, userData)
  const searchEmail = data?.filter(item=>item.email.toLowerCase().includes(emailToCheck.toLowerCase()))
  if(searchEmail.length && searchEmail[0].password == userData.password){
   const currentUser = {
    email: userData.email,
    password: userData.password
   }
    return currentUser
  }
  else{
    const credentialValidation = false
    return credentialValidation
  }
}
async function signInAuth(userData){
  const endPoint = 'auth/login'
  const httpMethod = 'POST'
  const headers = {}
  const response = await ApiManager.makeRequest(endPoint, httpMethod, headers, userData)
  localStorage.setItem('authTokens', JSON.stringify(response))
  return response
}

async function getSessionUser(userData, onSuccess = ()=>{}){
  const userToken = userData.access_token
  const endPoint = 'auth/profile'
  const httpMethod = 'GET'
  const headers = {
    "Authorization": `Bearer ${userToken}`
   }
  const response = await ApiManager.makeRequest(endPoint, httpMethod, headers, userData)
  localStorage.setItem('currentUser', JSON.stringify(response))
  console.log(onSuccess);
  response?onSuccess():null 
}
export {signInAuth, getSessionUser, validation}