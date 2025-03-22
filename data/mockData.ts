// Mock kullanıcı verileri
export const users = [
  {
    id: '1',
    name: 'Ayşe Yılmaz',
    username: 'ayse_yilmaz',
    email: 'ayse@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Hayat kısa, kuşlar uçuyor. İlham verici sözler ve hayat üzerine düşüncelerimi paylaşıyorum.',
    followers: 345,
    following: 124,
    posts: ['1', '4', '7']
  },
  {
    id: '2',
    name: 'Mehmet Demir',
    username: 'mehmet_demir',
    email: 'mehmet@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Yazılım geliştirici ve fotoğraf tutkunu. Teknolojiyi ve sanatı birleştirmeyi seviyorum.',
    followers: 523,
    following: 235,
    posts: ['2', '5', '8']
  },
  {
    id: '3',
    name: 'Zeynep Kaya',
    username: 'zeynep_kaya',
    email: 'zeynep@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    bio: 'Gezgin, yazar, düşünür. Hayatın her anından ilham alıyorum.',
    followers: 789,
    following: 312,
    posts: ['3', '6', '9']
  }
];

// Mock post verileri
export const posts = [
  {
    id: '1',
    userId: '1',
    content: 'Hayat, düşündüğün kadar uzun değil. O yüzden anı yaşa ve her fırsatta gülümse!',
    image: 'https://source.unsplash.com/random/600x400?nature',
    likes: 245,
    comments: 34,
    shares: 12,
    createdAt: '2025-03-20T10:30:00Z',
    tags: ['hayat', 'mutluluk', 'anıyaşa']
  },
  {
    id: '2',
    userId: '2',
    content: 'Başarının sırrı, düştüğünde her seferinde bir kez daha ayağa kalkmaktır. Hiçbir şey imkansız değildir.',
    image: 'https://source.unsplash.com/random/600x400?success',
    likes: 185,
    comments: 21,
    shares: 8,
    createdAt: '2025-03-21T14:45:00Z',
    tags: ['başarı', 'motivasyon', 'azim']
  },
  {
    id: '3',
    userId: '3',
    content: 'Bazen yolunu kaybetmen gerekir, kendini bulabilmen için.',
    image: 'https://source.unsplash.com/random/600x400?journey',
    likes: 321,
    comments: 43,
    shares: 16,
    createdAt: '2025-03-21T19:15:00Z',
    tags: ['yolculuk', 'keşif', 'kendinikeşfet']
  },
  {
    id: '4',
    userId: '1',
    content: 'Umut, karanlıkta parlayan tek yıldızdır.',
    image: 'https://source.unsplash.com/random/600x400?hope',
    likes: 156,
    comments: 18,
    shares: 5,
    createdAt: '2025-03-22T08:20:00Z',
    tags: ['umut', 'iyimserlik', 'hayat']
  },
  {
    id: '5',
    userId: '2',
    content: 'Bilgi güçtür, ancak onu paylaştığınızda daha da güçlü olursunuz.',
    image: 'https://source.unsplash.com/random/600x400?knowledge',
    likes: 210,
    comments: 27,
    shares: 14,
    createdAt: '2025-03-22T11:10:00Z',
    tags: ['bilgi', 'paylaşım', 'öğrenme']
  },
  {
    id: '6',
    userId: '3',
    content: 'En büyük risk, hiç risk almamaktır.',
    image: 'https://source.unsplash.com/random/600x400?risk',
    likes: 275,
    comments: 31,
    shares: 10,
    createdAt: '2025-03-22T15:30:00Z',
    tags: ['risk', 'cesaret', 'başarı']
  },
  {
    id: '7',
    userId: '1',
    content: 'Sevgiyle başlayan her şey, güzellikle devam eder.',
    image: 'https://source.unsplash.com/random/600x400?love',
    likes: 312,
    comments: 42,
    shares: 18,
    createdAt: '2025-03-20T16:40:00Z',
    tags: ['sevgi', 'mutluluk', 'ilişkiler']
  },
  {
    id: '8',
    userId: '2',
    content: 'Düşünceleriniz hayatınızı şekillendirir, bu yüzden olumlu düşünmeyi seçin.',
    image: 'https://source.unsplash.com/random/600x400?thoughts',
    likes: 198,
    comments: 23,
    shares: 9,
    createdAt: '2025-03-21T09:25:00Z',
    tags: ['düşünce', 'pozitiflik', 'zihin']
  },
  {
    id: '9',
    userId: '3',
    content: 'Anılar biriktirebileceğin en değerli hazinelerdir.',
    image: 'https://source.unsplash.com/random/600x400?memories',
    likes: 287,
    comments: 36,
    shares: 15,
    createdAt: '2025-03-21T20:50:00Z',
    tags: ['anılar', 'değer', 'yaşam']
  }
];

// Mock yorum verileri
export const comments = [
  {
    id: '1',
    postId: '1',
    userId: '2',
    content: 'Çok haklısın, her anı değerlendirmek gerekiyor!',
    createdAt: '2025-03-20T11:15:00Z',
    likes: 23
  },
  {
    id: '2',
    postId: '1',
    userId: '3',
    content: 'Bu cümle hayata bakış açımı değiştirdi, teşekkürler.',
    createdAt: '2025-03-20T12:30:00Z',
    likes: 18
  },
  {
    id: '3',
    postId: '2',
    userId: '1',
    content: 'Bu motivasyona ihtiyacım vardı, çok teşekkürler!',
    createdAt: '2025-03-21T15:20:00Z',
    likes: 15
  },
  {
    id: '4',
    postId: '3',
    userId: '2',
    content: 'Ne kadar derin bir söz, beni düşündürdü gerçekten.',
    createdAt: '2025-03-21T20:05:00Z',
    likes: 21
  }
];

// Mock bildirim verileri
export const notifications = [
  {
    id: '1',
    userId: '1',
    type: 'like',
    actorId: '2',
    contentId: '1',
    read: false,
    createdAt: '2025-03-22T10:15:00Z'
  },
  {
    id: '2',
    userId: '1',
    type: 'comment',
    actorId: '3',
    contentId: '1',
    read: true,
    createdAt: '2025-03-22T09:30:00Z'
  },
  {
    id: '3',
    userId: '1',
    type: 'follow',
    actorId: '2',
    contentId: null,
    read: false,
    createdAt: '2025-03-21T14:45:00Z'
  }
];

// Mock etiket verileri
export const tags = [
  {
    id: '1',
    name: 'motivasyon',
    postCount: 1243
  },
  {
    id: '2',
    name: 'başarı',
    postCount: 985
  },
  {
    id: '3',
    name: 'hayat',
    postCount: 2134
  },
  {
    id: '4',
    name: 'mutluluk',
    postCount: 1876
  },
  {
    id: '5',
    name: 'sevgi',
    postCount: 1654
  }
];

// Giriş yapmış kullanıcıyı simüle et
export const currentUser = users[0];
