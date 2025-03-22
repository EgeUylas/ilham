'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import { posts, users, tags as allTags } from '@/data/mockData';
import { Search, Flame, Clock, Award, TrendingUp, Filter } from 'lucide-react';

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const tagParam = searchParams.get('tag');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('trending');
  const [selectedTags, setSelectedTags] = useState<string[]>(tagParam ? [tagParam] : []);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  
  // Kullanıcı bilgilerini al
  const getUserInfo = (userId: string) => {
    return users.find(user => user.id === userId);
  };
  
  // Arama ve filtreleme işlemi
  useEffect(() => {
    let result = [...posts];
    
    // Etiket filtrelemesi
    if (selectedTags.length > 0) {
      result = result.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }
    
    // Arama filtrelemesi
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(post => {
        const user = getUserInfo(post.userId);
        return (
          post.content.toLowerCase().includes(searchLower) || 
          post.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          user?.name.toLowerCase().includes(searchLower) ||
          user?.username.toLowerCase().includes(searchLower)
        );
      });
    }
    
    // Sekme filtrelemesi
    switch (activeTab) {
      case 'trending':
        result.sort((a, b) => b.likes - a.likes);
        break;
      case 'recent':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        result.sort((a, b) => (b.likes + b.comments * 2) - (a.likes + a.comments * 2));
        break;
    }
    
    setFilteredPosts(result);
  }, [searchTerm, selectedTags, activeTab]);
  
  // URL'den tag parametresi değişirse seçilen etiketleri güncelle
  useEffect(() => {
    if (tagParam) {
      setSelectedTags([tagParam]);
    }
  }, [tagParam]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Arama zaten yapılıyor, burada sadece form gönderimini engelliyoruz
  };
  
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Keşfet</h1>
          
          {/* Arama Kutusu */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="İlham verici içerikler ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-12 py-4 bg-gray-900/70 border border-indigo-500/30 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-white placeholder-gray-500"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </div>
            </form>
          </div>
          
          {/* Popüler Etiketler */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Popüler Etiketler</h2>
            <div className="flex flex-wrap gap-3">
              {allTags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag.name)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  #{tag.name}
                  <span className="ml-2 text-xs opacity-80">{tag.postCount}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Seçilen Etiketler Göstergesi */}
          {selectedTags.length > 0 && (
            <div className="mb-6 flex items-center">
              <span className="text-gray-400 mr-3">Filtreleniyor:</span>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                  <div
                    key={tag}
                    className="bg-indigo-900/50 text-indigo-400 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    #{tag}
                    <button
                      onClick={() => handleTagClick(tag)}
                      className="ml-2 hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {selectedTags.length > 1 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Tümünü Temizle
                  </button>
                )}
              </div>
            </div>
          )}
          
          {/* Sekme Filtreleme */}
          <div className="mb-6 border-b border-gray-800">
            <div className="flex space-x-6">
              <button 
                className={`pb-3 flex items-center gap-2 ${
                  activeTab === 'trending' 
                    ? 'text-indigo-500 border-b-2 border-indigo-500' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('trending')}
              >
                <Flame size={18} />
                <span>Öne Çıkanlar</span>
              </button>
              <button 
                className={`pb-3 flex items-center gap-2 ${
                  activeTab === 'recent' 
                    ? 'text-indigo-500 border-b-2 border-indigo-500' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('recent')}
              >
                <Clock size={18} />
                <span>En Yeniler</span>
              </button>
              <button 
                className={`pb-3 flex items-center gap-2 ${
                  activeTab === 'popular' 
                    ? 'text-indigo-500 border-b-2 border-indigo-500' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('popular')}
              >
                <Award size={18} />
                <span>Popüler</span>
              </button>
            </div>
          </div>
          
          {/* İçerik Listesi */}
          <div className="mt-8">
            {filteredPosts.length > 0 ? (
              <div className="space-y-8">
                {filteredPosts.map(post => {
                  const user = getUserInfo(post.userId);
                  if (!user) return null;
                  
                  return (
                    <PostCard
                      key={post.id}
                      id={post.id}
                      userAvatar={user.avatar}
                      userName={user.name}
                      userHandle={user.username}
                      content={post.content}
                      image={post.image}
                      likes={post.likes}
                      comments={post.comments}
                      shares={post.shares}
                      createdAt={post.createdAt}
                      tags={post.tags}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-900/50 rounded-xl border border-gray-800">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-medium text-white mb-4">Sonuç Bulunamadı</h3>
                  <p className="text-gray-400 mb-6">
                    Arama kriterlerinize uygun içerik bulunamadı. Farklı anahtar kelimeler veya filtreler deneyin.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedTags([]);
                    }}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Tüm İçerikleri Göster
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* İçerik Oluşturma CTA */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-8 rounded-xl border border-indigo-500/20">
              <h2 className="text-2xl font-bold text-white mb-3">İlham Verici Bir Şey Paylaşmak İster misin?</h2>
              <p className="text-gray-300 mb-6">Düşüncelerini, anılarını veya ilham veren sözleri toplulukla paylaş</p>
              <Link
                href="/paylasim"
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                <span>Hemen Paylaş</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
