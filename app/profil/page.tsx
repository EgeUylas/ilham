'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { currentUser, posts, users } from '@/data/mockData';
import PostCard from '@/components/PostCard';
import { Edit, Bell, Settings, UserPlus, Calendar, MapPin, Link as LinkIcon } from 'lucide-react';
import Header from '@/components/Header';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts');
  
  // Mock veri kullanıcı profili
  const user = currentUser;
  
  // Kullanıcının gönderilerini filtrele
  const userPosts = posts.filter(post => user.posts.includes(post.id));
  
  // Kullanıcının bilgilerini al
  const getUserInfo = (id: string) => {
    return users.find(user => user.id === id);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 pt-20">
        {/* Profil Başlığı */}
        <div className="w-full bg-gradient-to-b from-indigo-900/30 to-black border border-indigo-500/20 rounded-xl p-6 mb-8 mt-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Profil Fotoğrafı */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-600 ring-4 ring-black">
                <Image 
                  src={user.avatar} 
                  alt={user.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
                <Edit size={16} />
              </button>
            </div>
            
            {/* Profil Bilgileri */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                  <p className="text-gray-400">@{user.username}</p>
                </div>
                
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <Edit size={16} />
                    <span>Profili Düzenle</span>
                  </button>
                  <button className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <Bell size={18} />
                  </button>
                  <button className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <Settings size={18} />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-200 mb-4">{user.bio}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Mart 2023'ten beri üye</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>İstanbul, Türkiye</span>
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon size={14} />
                  <a href="#" className="text-indigo-400 hover:underline">websitem.com</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* İstatistikler */}
          <div className="flex flex-wrap gap-8 mt-6 pt-6 border-t border-gray-800">
            <div className="text-center">
              <div className="text-xl font-bold text-white">{userPosts.length}</div>
              <div className="text-sm text-gray-400">Paylaşım</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{user.followers}</div>
              <div className="text-sm text-gray-400">Takipçi</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{user.following}</div>
              <div className="text-sm text-gray-400">Takip Edilen</div>
            </div>
          </div>
        </div>
        
        {/* Sekmeler ve İçerik */}
        <div className="mb-8">
          <div className="border-b border-gray-800 mb-4">
            <div className="flex space-x-8">
              <button 
                className={`pb-3 px-1 font-medium ${activeTab === 'posts' 
                  ? 'text-indigo-500 border-b-2 border-indigo-500' 
                  : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => setActiveTab('posts')}
              >
                Paylaşımlar
              </button>
              <button 
                className={`pb-3 px-1 font-medium ${activeTab === 'saved' 
                  ? 'text-indigo-500 border-b-2 border-indigo-500' 
                  : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => setActiveTab('saved')}
              >
                Kaydedilenler
              </button>
              <button 
                className={`pb-3 px-1 font-medium ${activeTab === 'likes' 
                  ? 'text-indigo-500 border-b-2 border-indigo-500' 
                  : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => setActiveTab('likes')}
              >
                Beğenilenler
              </button>
            </div>
          </div>
          
          {/* Gönderi İçeriği */}
          <div>
            {activeTab === 'posts' && (
              <div>
                {userPosts.length > 0 ? (
                  <div className="space-y-6">
                    {userPosts.map(post => (
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
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-gray-800">
                    <p className="text-gray-400 mb-4">Henüz bir paylaşımınız bulunmuyor.</p>
                    <Link 
                      href="/paylasim" 
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
                    >
                      İlk Paylaşımını Yap
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'saved' && (
              <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-gray-800">
                <p className="text-gray-400 mb-2">Kaydettiğiniz içerikler burada görünecek.</p>
                <p className="text-gray-500 text-sm mb-4">Beğendiğiniz ve daha sonra görmek istediğiniz içerikleri kaydedin.</p>
                <Link 
                  href="/kesfet" 
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors inline-flex items-center"
                >
                  Keşfetmeye Başla
                </Link>
              </div>
            )}
            
            {activeTab === 'likes' && (
              <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-gray-800">
                <p className="text-gray-400 mb-2">Beğendiğiniz içerikler burada görünecek.</p>
                <p className="text-gray-500 text-sm mb-4">Henüz hiçbir içerik beğenmediniz.</p>
                <Link 
                  href="/kesfet" 
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors inline-flex items-center"
                >
                  Keşfetmeye Başla
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
