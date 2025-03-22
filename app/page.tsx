'use client'
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dinamik olarak bileşenleri import ediyoruz
const Header = dynamic(() => import('../components/Header'), { ssr: true });
const Footer = dynamic(() => import('../components/Footer'), { ssr: true });

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-40">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-indigo-900/30 via-black to-black z-0"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 grid grid-cols-12 gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="relative h-full">
                {Array.from({ length: 12 }).map((_, j) => (
                  <div 
                    key={j} 
                    className="h-8 border-t border-indigo-500/20"
                    style={{ animationDelay: `${(i + j) * 0.1}s` }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-indigo-600/20 blur-xl"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 20}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block mb-4 px-4 py-1 border border-indigo-500/30 rounded-full bg-indigo-500/10 text-indigo-300 text-sm">
                İlham Veren Sözler ve Anılar Platformu
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  Düşüncelerinize Ses Verin
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Fikirlerinizi, ilham veren sözlerinizi ve unutulmaz anılarınızı paylaşın.
                Benzer düşüncelere sahip insanlarla bağlantı kurun ve birlikte büyüyen bir topluluk oluşturun.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="/kayit" 
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:opacity-90 transition-opacity text-lg font-medium group relative overflow-hidden"
                >
                  <span className="relative z-10">Hemen Başla</span>
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </a>
                <a 
                  href="/kesfet" 
                  className="px-8 py-3 border border-indigo-500/50 rounded-full hover:bg-indigo-500/10 transition-colors text-lg font-medium"
                >
                  Keşfet
                </a>
              </div>
              
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br from-indigo-400 to-purple-400"></div>
                  ))}
                </div>
                <div className="text-gray-400 text-sm">
                  <span className="text-white font-semibold">1,000+</span> kişi şimdiden katıldı
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* 3D card effect */}
                <div className="absolute inset-0 grid grid-cols-2 gap-4 transform perspective-1000 rotate-6">
                  {[1, 2, 3, 4].map((index) => (
                    <div 
                      key={index} 
                      className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-indigo-500/30 shadow-xl backdrop-blur-sm transform transition-transform hover:scale-105 hover:rotate-3"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="mb-4 h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                      <p className="text-gray-200 italic">
                        "Hayatta en hakiki mürşit ilimdir."
                      </p>
                      <p className="text-right text-sm text-indigo-400 mt-2">
                        - Mustafa Kemal Atatürk
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full blur-3xl opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/20 to-black"></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-6 z-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-l border-indigo-500/10 h-full"></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 border border-indigo-500/30 rounded-full bg-indigo-500/10 text-indigo-300 text-sm">
              ÖZELLİKLER
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Platformumuzun Özellikleri
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Rota, ilham verici sözleri ve anıları paylaşmanın ötesinde bir deneyim sunar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📚",
                title: "İlham Verici İçerikler",
                description: "Hayatınıza anlam katacak, motivasyonunuzu artıracak ve size ilham verecek içerikleri keşfedin."
              },
              {
                icon: "👥",
                title: "Topluluk Bağlantısı",
                description: "Benzer düşüncelere sahip insanlarla tanışın, fikir alışverişinde bulunun ve birlikte büyüyün."
              },
              {
                icon: "❤️",
                title: "Kişisel Koleksiyonlar",
                description: "En sevdiğiniz sözleri ve anıları kaydedin, kişisel koleksiyonlar oluşturun ve istediğiniz zaman erişin."
              },
              {
                icon: "🔄",
                title: "Kolay Paylaşım",
                description: "Beğendiğiniz içerikleri sosyal medyada paylaşın ve başkalarına da ilham verin."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-indigo-500/30 backdrop-blur-sm transform transition-all hover:scale-105 hover:border-indigo-500/50 group"
              >
                <div className="text-4xl mb-6 p-4 bg-indigo-500/10 rounded-lg inline-block group-hover:bg-indigo-500/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-purple-900/30 to-black"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full bg-indigo-500/50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black p-12 rounded-2xl border border-indigo-500/30 shadow-2xl backdrop-blur-sm">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Kendi Hikayenizi Paylaşmaya Hazır Mısınız?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Siz de ilham verici sözlerinizi ve unutulmaz anılarınızı paylaşarak topluluğumuza katılın. 
                Binlerce kişiye ilham verin ve yeni bağlantılar kurun.
              </p>
              <a 
                href="/kayit" 
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:opacity-90 transition-opacity text-lg font-medium inline-block group relative overflow-hidden"
              >
                <span className="relative z-10">Hemen Ücretsiz Kaydol</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Global styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
}
