import React from 'react';
import { Scale, Menu, User } from 'lucide-react';

interface HeaderProps {
  user?: { name: string; email: string } | null;
  onAuthClick: () => void;
}

export default function Header({ user, onAuthClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Scale className="h-8 w-8 text-blue-600 mr-3" />
            <span className="text-2xl font-bold text-gray-900">Settlr</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Support</a>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            )}
            <Menu className="h-6 w-6 text-gray-600 md:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
}