import { useState } from "react"

const Categories = ( { categories, items }:any) => {

  const [copyItems, setCopyItems] = useState(items)

  const handleFilteredItems = (category:any) => {
    if (category === 'All') {
      const result = copyItems.map((item:any) => { return item })
      setCopyItems(result)
    } else {
      const result = copyItems.filter((item:any) => { return item.node.category.categoryName === category })
      setCopyItems(result)
    }
  }

  return (
    <div className='grid gap-8'>
      <h1 className='font-semibold text-xl'>All Categories</h1>
      <button className='hover:font-semibold cursor-pointer' onClick={() => handleFilteredItems('All')}>All</button>
      {categories.map((category:any) => (
        <button key={category.node.id} className='hover:font-semibold cursor-pointer' onClick={() => handleFilteredItems(category.node.categoryName)}>{category.node.categoryName}</button>
      ))}
    </div>
  )
}

export default Categories


