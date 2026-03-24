import { memo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '@/core/providers/ThemeProvider'
import { appConfig } from '@/config/app.config'

const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" strokeWidth="2"/>
    <path strokeWidth="2" strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
)

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
)

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>
  </svg>
)

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
  </svg>
)

const Navbar = memo(() => {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-[#0a3d4f] dark:bg-[#0a1628] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-90 transition-opacity">
            SportyRadar
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {appConfig.navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-150 hover:text-white/90 ${
                    isActive ? 'text-white' : 'text-white/75'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Theme toggle */}
            {appConfig.features.darkMode && (
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors duration-150"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            {appConfig.features.darkMode && (
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            )}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-1.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-3 space-y-1">
            {appConfig.navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar
