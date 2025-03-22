'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Burada normalde API çağrısı yapılacak
      // Şimdilik sadece simülasyon yapıyoruz
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Başarılı giriş simülasyonu
      console.log('Giriş yapıldı:', formData);
      router.push('/'); // Ana sayfaya yönlendir
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Giriş hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Arka plan efektleri */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-black"></div>
          <div className="absolute inset-0 grid grid-cols-12 gap-1 opacity-30">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="relative h-full">
                {Array.from({ length: 12 }).map((_, j) => (
                  <div 
                    key={j} 
                    className="h-8 border-t border-indigo-500/20"
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="max-w-md w-full relative z-10">
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-indigo-500/30 shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-6">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  Rota
                </h1>
              </Link>
              <h2 className="text-2xl font-semibold text-white mb-2">Hoş Geldiniz</h2>
              <p className="text-gray-400">Hesabınıza giriş yapın</p>
            </div>
            
            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  E-posta Adresi
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-white placeholder-gray-500"
                  placeholder="ornek@mail.com"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Şifre
                  </label>
                  <Link href="/sifremi-unuttum" className="text-sm text-indigo-400 hover:text-indigo-300">
                    Şifremi Unuttum
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-white placeholder-gray-500"
                  placeholder="••••••••"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-900 border-indigo-500/50 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Beni hatırla
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Hesabınız yok mu?{' '}
                <Link href="/kayit" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Hemen Kaydolun
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/" className="text-gray-500 hover:text-gray-400 text-sm">
              &larr; Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
