import { useContext } from 'react'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import { ShoppingCartContext } from '../../Context'

function Home() {
  const context = useContext(ShoppingCartContext)

  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return (
        context.filteredItems?.map(item => (
          <Card key={item.id} data={item} />
        ))
      )
    } else {
      return (
        <div>We don't have anything :(</div>
      )
    }
  }

  return (
    <Layout>
      <div className='absolute top-[75px] text-center w-[100%] bg-black text-[#36ff03] shadow-lg overflow-hidden flex justify-between'>
        <p className='relative left-[-100%]  animate-moveParagraph1 '>¡Sale!</p> 
        <p className='relative left-[-100%]  animate-moveParagraph1 '>¡Sale!</p> 
        <p className='relative left-[-100%]  animate-moveParagraph1 '>¡Sale!</p> 
        <p className='relative left-[-100%]  animate-moveParagraph1 '>¡Sale!</p> 
        <p className='relative left-[-100%]  animate-moveParagraph1 '>¡Sale!</p> 
        <p className='relative left-[-100%]  animate-moveParagraph2 '>¡Sale!</p> 
        <p className='relative left-[-100%]  animate-moveParagraph2 '>¡Sale!</p> 
        <p className='relative left-[-100%]  animate-moveParagraph2 '>¡Sale!</p> 
        <p className='relative left-[-100%]  animate-moveParagraph2 '>¡Sale!</p> 
        <p className='relative left-[-100%]  animate-moveParagraph2 '>¡Sale!</p> 
      </div>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>Exclusive Products</h1>
      </div>
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  )
}

export default Home