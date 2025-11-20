import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, BookOpen, User, Phone, Mail, ChevronDown } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#livro', label: 'Livro' },
    { href: '#contato', label: 'Contato' }
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
              scrolled ? 'bg-primary-600' : 'bg-white shadow-lg'
            }`}>
              <BookOpen className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-primary-600'}`} />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg transition-all duration-300 ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Fernando Faria
              </span>
              <span className={`text-xs font-medium transition-all duration-300 ${
                scrolled ? 'text-primary-600' : 'text-primary-200'
              }`}>
                Especialista Geossintéticos
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`font-medium transition-all duration-300 hover:text-primary-600 ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
            
            <motion.a
              href="https://www.amazon.com.br/Mercado-Geot%C3%AAxtil-outros-Geossint%C3%A9ticos-Brasil-ebook/dp/B0FTD1KQZF"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Comprar Livro
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
              scrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-100"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-700 font-medium hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300"
              >
                {item.label}
              </motion.a>
            ))}
            
            <motion.a
              href="https://www.amazon.com.br/Mercado-Geot%C3%AAxtil-outros-Geossint%C3%A9ticos-Brasil-ebook/dp/B0FTD1KQZF"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="block mx-4 btn-primary text-center"
            >
              Comprar Livro
            </motion.a>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}