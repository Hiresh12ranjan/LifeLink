import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blood-info', label: 'Blood Info' },
  { href: '/find-blood', label: 'Find Blood' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/auth';
    return user.role === 'donor' ? '/donor/dashboard' : '/receiver/dashboard';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Heart className="h-8 w-8 text-primary transition-transform group-hover:scale-110" fill="currentColor" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-success rounded-full animate-pulse" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Life<span className="text-primary">Link</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()}>
                  <Button variant="soft" size="sm">
                    <User className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button variant="hero" size="sm">Join as Donor</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border/50 mt-2 pt-4 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Link to={getDashboardLink()} onClick={() => setIsOpen(false)}>
                      <Button variant="soft" className="w-full">
                        <User className="h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full" onClick={() => { logout(); setIsOpen(false); }}>
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">Log in</Button>
                    </Link>
                    <Link to="/auth?mode=signup" onClick={() => setIsOpen(false)}>
                      <Button variant="hero" className="w-full">Join as Donor</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
