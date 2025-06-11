
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  Users, 
  Settings, 
  Calendar, 
  User, 
  Bell,
  Search,
  MenuIcon,
  X,
  LogOut
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Calendar, current: location.pathname === '/' },
    { name: 'Services', href: '/services', icon: Car, current: location.pathname === '/services' },
    { name: 'Customers', href: '/customers', icon: Users, current: location.pathname === '/customers' },
    { name: 'Inventory', href: '/inventory', icon: Settings, current: location.pathname === '/inventory' },
  ];

  // Add staff management for admin/manager only
  if (user?.role === 'admin' || user?.role === 'manager') {
    navigation.splice(3, 0, { 
      name: 'Staff', 
      href: '/staff', 
      icon: User, 
      current: location.pathname === '/staff' 
    });
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen relative">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 glass-sidebar transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo and close button */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-automotive-blue/20 backdrop-blur-md">
                <Car className="h-6 w-6 text-automotive-blue" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Paulstar</h1>
                <p className="text-xs text-muted-foreground">Auto Care</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-glass-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${item.current 
                      ? 'bg-automotive-blue/30 text-white shadow-glass-sm' 
                      : 'text-muted-foreground hover:bg-glass-100 hover:text-white'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-glass-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-automotive-blue/20 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-automotive-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground hover:text-white hover:bg-glass-100"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top navigation */}
        <header className="glass-nav h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-glass-100"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="glass-input pl-10 w-64"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-glass-100">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
