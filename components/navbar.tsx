import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { DrupalMenuLinkContent } from "next-drupal"
import classNames from "classnames"
import { motion, AnimatePresence } from "framer-motion"

import { LocaleSwitcher } from "components/locale-switcher"
import Link from "next/link"

interface NavbarProps {
  links: DrupalMenuLinkContent[]
}

export function Navbar({ links, ...props }: NavbarProps) {
  const { locale } = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full flex-shrink-0 py-4 transition-all duration-300 ${
        isScrolled
          ? 'bg-glass-white backdrop-blur-md shadow-lg border-b border-white/20'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      <div className="container flex flex-col items-start justify-between px-6 mx-auto md:flex-row md:items-center">
        <Link href="/" locale={locale} passHref>
          <a className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
            Marketing
          </a>
        </Link>

        {/* Desktop Menu */}
        {links && <Menu items={links} />}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center space-y-1.5 group"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <motion.span
            animate={{
              rotate: mobileMenuOpen ? 45 : 0,
              y: mobileMenuOpen ? 8 : 0
            }}
            className="w-6 h-0.5 bg-gray-800 block"
          />
          <motion.span
            animate={{
              opacity: mobileMenuOpen ? 0 : 1,
              x: mobileMenuOpen ? 20 : 0
            }}
            className="w-6 h-0.5 bg-gray-800 block"
          />
          <motion.span
            animate={{
              rotate: mobileMenuOpen ? -45 : 0,
              y: mobileMenuOpen ? -8 : 0
            }}
            className="w-6 h-0.5 bg-gray-800 block"
          />
        </button>

        <div className="hidden md:flex absolute justify-end md:static top-2 right-4">
          <LocaleSwitcher />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 mt-4"
          >
            <div className="container px-6 py-4">
              <Menu items={links} mobile />
              <div className="mt-4 pt-4 border-t border-gray-200">
                <LocaleSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function Menu({ items, mobile = false, onClose }: { items: DrupalMenuLinkContent[], mobile?: boolean, onClose?: () => void }) {
  const { asPath } = useRouter()

  return (
    <ul
      className={classNames(
        "grid gap-4 auto-cols-auto",
        mobile
          ? "grid-flow-row"
          : "grid-flow-col mx-auto md:mt-0 md:auto-rows-auto md:gap-8 lg:gap-12"
      )}
      data-cy="navbar-menu"
    >
      {items.map((item) => (
        <MenuLink
          link={item}
          key={item.id}
          isActive={item.url === asPath}
          onClick={onClose}
        />
      ))}
    </ul>
  )
}

function MenuLink({ link, isActive, onClick }: { link: DrupalMenuLinkContent, isActive?: boolean, onClick?: () => void }) {
  return (
    <li>
      <Link href={link.url} passHref>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className={classNames(
            "py-4 text-sm md:text-base transition-all duration-300 relative group",
            isActive
              ? "font-semibold text-purple-600"
              : "font-normal text-gray-700 hover:text-purple-600"
          )}
        >
          {link.title}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
            initial={{ width: 0 }}
            animate={{ width: isActive ? '100%' : 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>
      </Link>
    </li>
  )
}
