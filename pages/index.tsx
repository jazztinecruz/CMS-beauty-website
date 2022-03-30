import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import ItemCard from '../components/ItemCard'
import { getItems, getCategories } from '../services/'

const Home: NextPage = ({ items, categories } :any) => {

  const [copyItems, setCopyItems] = useState(items)
  const [input, setInput] = useState('')
  const [categoryTitle, setCategoryTitle] = useState('')

  const handleFilteredItems = (category:any) => {
    if(category === 'All') {
      const result = items.map((item:any) => {
        if (category === 'All') {
          setCategoryTitle('All')
          return item
        }
      })
      setCopyItems(result)
      
    } else {
      const result = items.filter((item:any) => {
        if (item.node.category.categoryName === category) {
          setCategoryTitle(item.node.category.categoryName)
          return item
        }
      })
      setCopyItems(result)
    }
  }
  
  return (
    <div className='h-screen grid grid-rows-[auto,1fr] gap-5'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      {/* Logo */}
      <div className='shadow-md bg-white p-6'>
        <h1 className='text-2xl font-bold text-cyan-500'>MakeUp Corp.</h1>
      </div>

      {/* content */}
      <div className='grid grid-rows-[auto,1fr] lg:grid-cols-[auto,1fr] gap-6'>

        {/* Categories */}
        <div className='lg:hidden overflow-hidden'>
          <div className='grid grid-flow-col gap-4 items-center snap-x'>
            <div>
              <button className='w-full text-left py-4 px-6 hover:bg-cyan-500 hover:text-white transition-all duration-700 cursor-pointer' onClick={() => handleFilteredItems('All')}>All</button>
            </div>
            {categories.map((category:any) => (
              <button key={category.node.id} className='w-full text-left py-4 px-6 hover:bg-cyan-500 hover:text-white transition-all duration-700 cursor-pointer whitespace-nowrap' onClick={() => handleFilteredItems(category.node.categoryName)}>{category.node.categoryName}</button>
            ))}
          </div>
        </div>


        <div className='hidden lg:block'>
          <div className='flex flex-col gap-4 w-52 h-full py-4'>
            <h1 className='font-semibold text-lg pl-2'>Categories</h1>
            <div>
              <div>
                <button className='w-full text-left py-4 hover:bg-cyan-500 hover:text-white transition-all duration-500 pl-2 cursor-pointer' onClick={() => handleFilteredItems('All')}>All</button>
              </div>
              {categories.map((category:any) => (
                <button key={category.node.id} className='w-full text-left py-4 hover:bg-cyan-500 hover:text-white transition-all duration-500 pl-2 cursor-pointer' onClick={() => handleFilteredItems(category.node.categoryName)}>{category.node.categoryName}</button>
              ))}
            </div>
          </div>
        </div>

        <div className='grid grid-rows-[auto,1fr] gap-10 px-4'>
          {/* Search Input */}
          <input type='search' className='py-3 px-4 w-full md:w-96 outline-none border-none shadow-md rounded-md ml-auto' placeholder='Search Here...' onChange={(e) => setInput(e.target.value)} value={input} />

          {/* Items */}
          <div className='flex flex-col gap-6'>
            <div>
              <h1 className='font-semibold text-xl'>{categoryTitle} Products</h1>
              <h1 className='text-gray-500 mt-1'>{copyItems.length} Found</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {copyItems.filter((item: any) => {
                if (item.node.itemName.toLowerCase().includes(input.toLowerCase())) {
                  return item
                }
              }).map((item: any) => (
                <ItemCard key={item.node.id} item={item.node}/>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const items = await getItems()
  const categories = await getCategories()

  return {
    props: { items, categories }
  }
}
