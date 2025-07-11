import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './styles/NavBar.css'

const navItems = [
  { path: '/', label: 'About Me' },
  { path: '/projects', label: 'Personal Projects' },
]

export function NavBar() {
  const location = useLocation()

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <ul>
        {navItems.map((item) => (
          <motion.li
            key={item.path}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  )
}
