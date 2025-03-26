'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FiSun, FiMoon } from "react-icons/fi"
import { BsChevronDown } from "react-icons/bs"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null 

  return (
    <div className="relative inline-block z-50 ">

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 px-3 py-2 bg-gray-200 dark:bg-gray-500 rounded-lg text-sm"
        aria-label="Toggle Theme Menu"
      >
        {theme === 'dark' ? <FiMoon className="text-yellow-400 text-sm" /> : <FiSun className="text-orange-500" />}
        <BsChevronDown className="text-gray-500 dark:text-gray-400 text-sm" />
      </button>

 
      {isOpen && (
        <div className="absolute mt-2 w-32 bg-white dark:bg-gray-500 shadow-lg rounded-md">
          <button 
            onClick={() => { setTheme('light'); setIsOpen(false) }} 
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
          >
            <FiSun className="text-orange-500 text-sm" /> Light
          </button>
          <button 
            onClick={() => { setTheme('dark'); setIsOpen(false) }} 
            className="flex items-center gap-2 text-sm w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FiMoon className="text-yellow-400 text-sm" /> Dark
          </button>
        </div>
      )}
    </div>
  )
}
