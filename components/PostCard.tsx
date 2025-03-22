'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';

type PostCardProps = {
  id: string;
  userAvatar: string;
  userName: string;
  userHandle: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  tags: string[];
};

export default function PostCard({
  id,
  userAvatar,
  userName,
  userHandle,
  content,
  image,
  likes,
  comments,
  shares,
  createdAt,
  tags
}: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  
  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  const handleSave = () => {
    setSaved(!saved);
  };
  
  // Tarih formatını düzenle
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} dakika önce`;
      }
      return `${diffHours} saat önce`;
    }
    
    if (diffDays < 7) {
      return `${diffDays} gün önce`;
    }
    
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-6 transition-all hover:border-indigo-900/50 hover:shadow-lg hover:shadow-indigo-900/10">
      <div className="p-4">
        {/* Post Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Link href={`/profil/${userHandle}`}>
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 ring-2 ring-indigo-600">
                <Image 
                  src={userAvatar} 
                  alt={userName} 
                  width={40} 
                  height={40} 
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>
            <div>
              <Link href={`/profil/${userHandle}`} className="font-medium text-white hover:text-indigo-400">
                {userName}
              </Link>
              <div className="text-gray-500 text-sm">@{userHandle}</div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white p-1">
            <MoreHorizontal size={20} />
          </button>
        </div>
        
        {/* Post Content */}
        <div className="mb-3">
          <p className="text-gray-100 mb-2 whitespace-pre-wrap">{content}</p>
          <div className="flex flex-wrap gap-2 my-2">
            {tags.map(tag => (
              <Link 
                key={tag} 
                href={`/kesfet?tag=${tag}`}
                className="text-sm text-indigo-400 hover:text-indigo-300 bg-indigo-900/20 px-2 py-1 rounded-md"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Post Image (if exists) */}
        {image && (
          <div className="relative rounded-lg overflow-hidden mb-3 aspect-[16/9]">
            <Image 
              src={image} 
              alt="Post content" 
              layout="fill"
              className="object-cover"
            />
          </div>
        )}
        
        {/* Post Stats */}
        <div className="border-t border-gray-800 pt-3 mt-3">
          <div className="flex justify-between text-sm text-gray-400">
            <div>{likesCount} beğeni</div>
            <div className="flex space-x-4">
              <span>{comments} yorum</span>
              <span>{shares} paylaşım</span>
            </div>
          </div>
        </div>
        
        {/* Post Actions */}
        <div className="flex justify-between mt-3 pt-3 border-t border-gray-800">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
              liked 
                ? 'text-pink-500 bg-pink-500/10' 
                : 'text-gray-400 hover:text-pink-500 hover:bg-gray-800'
            }`}
          >
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
            <span>Beğen</span>
          </button>
          
          <Link 
            href={`/post/${id}`}
            className="flex items-center space-x-1 px-2 py-1 rounded-md text-gray-400 hover:text-blue-500 hover:bg-gray-800 transition-colors"
          >
            <MessageCircle size={18} />
            <span>Yorum Yap</span>
          </Link>
          
          <button className="flex items-center space-x-1 px-2 py-1 rounded-md text-gray-400 hover:text-green-500 hover:bg-gray-800 transition-colors">
            <Share size={18} />
            <span>Paylaş</span>
          </button>
          
          <button 
            onClick={handleSave}
            className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
              saved 
                ? 'text-yellow-500 bg-yellow-500/10' 
                : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-800'
            }`}
          >
            <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
            <span>Kaydet</span>
          </button>
        </div>
      </div>
      
      {/* Post Footer */}
      <div className="px-4 py-2 bg-gray-900/50 text-gray-500 text-xs">
        {formatDate(createdAt)}
      </div>
    </div>
  );
}
