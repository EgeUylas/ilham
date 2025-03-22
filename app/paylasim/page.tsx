'use client'

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { currentUser } from '@/data/mockData';
import { Image as ImageIcon, X, Camera, Tag, MapPin, Smile, Send } from 'lucide-react';

export default function SharePage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Mock kullanıcı
  const user = currentUser;
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };
  
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault();
      // Etiketleri boşluklara göre ayırıp ekleyelim
      const newTags = currentTag
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(tag => !tags.includes(tag) && tag !== '');
      
      if (newTags.length > 0) {
        setTags([...tags, ...newTags]);
        setCurrentTag('');
      }
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.trim() === '') {
      alert('Lütfen bir içerik girin.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simüle edilmiş paylaşım (normalde bir API çağrısı olacak)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Paylaşılan içerik:', {
        content,
        tags,
        image: imagePreview,
        userId: user.id
      });
      
      // Ana sayfaya yönlendir
      router.push('/');
    } catch (error) {
      console.error('Paylaşım hatası:', error);
      alert('Paylaşım yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-indigo-500/30 shadow-2xl backdrop-blur-sm">
            <h1 className="text-2xl font-bold text-white mb-6">Yeni Paylaşım Oluştur</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-600">
                <Image 
                  src={user.avatar} 
                  alt={user.name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <div className="font-medium text-white">{user.name}</div>
                <div className="text-gray-400 text-sm">@{user.username}</div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <textarea
                  placeholder="Bir ilham verici söz veya anı paylaş..."
                  value={content}
                  onChange={handleContentChange}
                  className="w-full h-32 px-4 py-3 bg-gray-900/50 border border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-white placeholder-gray-500 resize-none"
                  maxLength={500}
                />
                <div className="text-right text-gray-500 text-sm">
                  {content.length}/500
                </div>
              </div>
              
              {/* Görsel Yükleme Önizleme */}
              {imagePreview && (
                <div className="mb-6 relative">
                  <div className="relative rounded-lg overflow-hidden aspect-video">
                    <Image 
                      src={imagePreview} 
                      alt="Preview" 
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-black/70 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
              
              {/* Etiketler */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                    <div 
                      key={tag}
                      className="bg-indigo-900/50 text-indigo-400 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      #{tag}
                      <button 
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <div className="w-10 flex items-center justify-center text-gray-400">
                    <Tag size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Etiketler ekle (boşlukla veya enter ile ayır)"
                    value={currentTag}
                    onChange={handleTagInputChange}
                    onKeyDown={handleAddTag}
                    className="flex-1 px-4 py-3 bg-gray-900/50 border border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-white placeholder-gray-500"
                  />
                </div>
              </div>
              
              {/* Gönderi Araçları */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-800">
                <div className="flex space-x-4">
                  <button 
                    type="button"
                    onClick={triggerImageUpload}
                    className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-900/20 rounded-full transition-colors"
                  >
                    <ImageIcon size={20} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <button 
                    type="button"
                    className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-900/20 rounded-full transition-colors"
                  >
                    <Camera size={20} />
                  </button>
                  <button 
                    type="button"
                    className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-900/20 rounded-full transition-colors"
                  >
                    <MapPin size={20} />
                  </button>
                  <button 
                    type="button"
                    className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-900/20 rounded-full transition-colors"
                  >
                    <Smile size={20} />
                  </button>
                </div>
                <div className="text-sm text-gray-400">
                  Herkese Açık
                </div>
              </div>
              
              {/* Paylaş Butonu */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading || content.trim() === ''}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send size={18} />
                  <span className="relative z-10">
                    {loading ? 'Paylaşılıyor...' : 'Paylaş'}
                  </span>
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
