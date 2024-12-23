import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full h-auto bg-white border-t border-black/10">
      <div className='mx-auto container py-4 px-4 sm:px-1 flex justify-between items-center'>
      <p className='text-center text-gray-600 text-base'>&#169; {currentYear} ToyNiverse. All rights reserved.</p>
      <p className='text-center text-gray-600 sm:block hidden'>Created with ❤️ by <a href='https://hacktiv8.com' target='_blank'>Firman K.R</a></p>
    </div>
    </footer>
  )
}

export default Footer