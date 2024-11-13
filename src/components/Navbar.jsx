import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-indigo-900 text-white py-2'>
    <div className="logo">
         <span className='font-bold text-xl mx-8'>iTask</span>
    </div>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all '>home </li>
            <li className='cursor-pointer hover:font-bold transition-all '>your tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar