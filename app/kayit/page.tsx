'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Basit doğrulama
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setLoading(false);
      return;
    }
    
    try {
      // Burada normalde API çağrısı yapılacak
      // Şimdilik sadece simülasyon yapıyoruz
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Başarılı kayıt simülasyonu
      console.log('Kayıt tamamlandı:', formData);
      router.push('/giris'); // Giriş sayfasına yönlendir
    } catch (err) {
      setError('Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Kayıt hatası:', err);
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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black"></div>
          <div className="absolute inset-0 grid grid-cols-12 gap-1 opacity-30">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="relative h-full">
                {Array.from({ length: 12 }).map((_, j) => (
                  <div 
                    key={j} 
                    className="h-8 border-t border-purple-500/20"
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="max-w-md w-full relative z-10">
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-purple-500/30 shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-6">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  Rota
                </h1>
              </Link>
              <h2 className="text-2xl font-semibold text-white mb-2">Hesap Oluştur</h2>
              <p className="text-gray-400">Rota'ya katılın ve ilham verici içerikleri keşfedin</p>
            </div>
            
            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Ad Soyad
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white placeholder-gray-500"
                  placeholder="Ad Soyad"
                />
              </div>
              
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
                  className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white placeholder-gray-500"
                  placeholder="ornek@mail.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white placeholder-gray-500"
                  placeholder="En az 8 karakter"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Şifre Tekrar
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white placeholder-gray-500"
                  placeholder="Şifrenizi tekrar girin"
                />
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    required
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="h-4 w-4 bg-gray-900 border-purple-500/50 rounded text-purple-600 focus:ring-purple-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeTerms" className="text-gray-300">
                    <span>
                      <Link href="/kullanim-kosullari" className="text-purple-400 hover:text-purple-300">
                        Kullanım Koşulları
                      </Link>
                      {' '}ve{' '}
                      <Link href="/gizlilik-politikasi" className="text-purple-400 hover:text-purple-300">
                        Gizlilik Politikası
                      </Link>
                      'nı kabul ediyorum
                    </span>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Zaten hesabınız var mı?{' '}
                <Link href="/giris" className="text-purple-400 hover:text-purple-300 font-medium">
                  Giriş Yapın
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
