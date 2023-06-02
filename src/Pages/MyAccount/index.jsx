import Layout from '../../Components/Layout'

function MyAccount() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  return (
    <Layout>
      <h1 className=' text-xl font-bold mb-6'>My Account</h1>
      <p className=' font-bold mb-3'>Name: <span className=' font-medium'>{currentUser.name}</span></p>
      <p className=' font-bold mb-3'>Email: <span className=' font-medium'>{currentUser.email}</span></p>
      <button className=' border border-black w-[200px] rounded-lg py-1'>Edit</button>
    </Layout>
  )
}

export default MyAccount