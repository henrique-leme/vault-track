import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MenuIcon, XIcon } from 'lucide-react'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="flex items-center">
            <h1 className="header-title">MyApp</h1>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button
              variant="outline"
              onClick={() => setIsOpen(!isOpen)}
              className="menu-button"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
          <div className="menu-items-desktop">
            <div className="menu-items-baseline">
              <a href="#" className="menu-item">
                Home
              </a>
              <a href="#" className="menu-item">
                Transactions
              </a>
              <a href="#" className="menu-item">
                Profile
              </a>
              <a href="#" className="menu-item">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="menu-items-mobile">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="menu-item">
              Home
            </a>
            <a href="#" className="menu-item">
              Transactions
            </a>
            <a href="#" className="menu-item">
              Profile
            </a>
            <a href="#" className="menu-item">
              Logout
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
