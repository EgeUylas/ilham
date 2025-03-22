'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/80 backdrop-blur-md py-3 border-b border-indigo-500/20' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button 
          onClick={() => handleNavigation('/')}
          className="relative group"
        >
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Rota
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </button>
        
        <nav className="hidden md:flex space-x-8">
          {['Ana Sayfa', 'Keşfet', 'Hakkımızda'].map((item, index) => (
            <button 
              key={index}
              onClick={() => handleNavigation(index === 0 ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`)}
              className="text-gray-300 hover:text-white relative group py-2"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            href="/giris"
            className="px-4 py-2 text-sm text-gray-300 hover:text-white relative group"
          >
            Giriş Yap
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            href="/kayit"
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </header>
  );
}
