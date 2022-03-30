
const ItemCard = ({ item } :any) => {
  return (
    <div className='flex flex-col px-6 py-4 rounded-md shadow-md hover:bg-slate-50 hover:-translate-y-2 transition-all duration-300 cursor-pointer'>
      <h1 className='text-xl font-semibold'>{item.itemName}</h1>
      <h1 className='text-lg text-gray-500'>{item.category.categoryName}</h1>
      <h1 className='text-xl text-red-500 font-semibold ml-auto'>{item.price}.00</h1>
    </div>
  )
}

export default ItemCard