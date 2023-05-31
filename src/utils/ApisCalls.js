/***
 * this class generically handles all the calls to the Api by means of a static method in which it is not necessary to instantiate the class but only to call it and its static method like this: ApiManager.makeRequest(params).
 * @param {endPoint, httpMethod, headers, requestData}Objects the query data 
 * @returns {object} data, an object containing user information
*/
class ApiManager {
 static BASE_URL = 'https://api.escuelajs.co/api/v1';
 static async makeRequest(endPoint, httpMethod, headers, requestData){
let url = `${this.BASE_URL}/${endPoint}`
  const requestOptions = {
   method: httpMethod,
   headers:{
    ...headers,
    'Content-Type': 'application/json'
   }
  }
  if(httpMethod === 'GET'){
   //convert the request parameters into URL parameters
   const queryParams = new URLSearchParams(requestData)
   url +=`?${queryParams}`
  } else{
   //convert the parameters of the request in the body
   requestOptions.body = JSON.stringify(requestData)
  }
  try{
   const response = await fetch(url, requestOptions)
   const data = await response.json()
   return data
  } catch(error){
   console.error('Error',error);
  }
 }
}
export {ApiManager}