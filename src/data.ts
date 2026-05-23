import { Property, Review } from './types';

// Let's use the precise generated asset paths
export const HERO_SLIDES = [
  {
    id: 'amarta-villa',
    title: 'Elevating the Experience of Your Dream Property',
    subTitle: 'Amarta Stone Reserve',
    location: 'Uluwatu, Bali',
    description: 'Delivering exclusive residences with superior quality, refined design, and comfort tailored for a premium lifestyle with timeless elegance.',
    image: '/src/assets/images/proptera_hero_villas_1779525426492.png',
    price: 24500000000, // Rp 24.5 M
    bed: 5,
    bath: 6,
    areaSqft: 680,
    tag: 'Exclusive Release'
  },
  {
    id: 'komorebi-lodge',
    title: 'Immersive Sanctuary Surrounded by Whispering Woods',
    subTitle: 'Komorebi Japandi Lodge',
    location: 'Dago Atas, Bandung',
    description: 'A meticulous integration of raw dry-stone masonry and warmth-retaining dark pine timber, offering cozy alpine living with curated modern comforts.',
    image: '/src/assets/images/proptera_japandi_lodge_1779525457262.png',
    price: 12800000000, // Rp 12.8 M
    bed: 3,
    bath: 3,
    areaSqft: 320,
    tag: 'Nature Sanctuary'
  },
  {
    id: 'nirvana-mansion',
    title: 'Architectural Modern Luxury at the Ocean Edge',
    subTitle: 'Nirvana Waterfront Pavilion',
    location: 'Canggu Beach, Bali',
    description: 'Framed with architectural concrete and seamless double-height glass panels overlooking a saltwater infinity pool and the roaring Indian Ocean.',
    image: '/src/assets/images/proptera_glass_mansion_1779525479541.png',
    price: 42000000000, // Rp 42 M
    bed: 6,
    bath: 7,
    areaSqft: 950,
    tag: 'Signature Residence'
  }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Amarta Stone Reserve',
    price: 24500000000,
    location: 'Uluwatu, Bali',
    type: 'Villa',
    description: 'Sebuah mahakarya arsitektur modern yang memadukan batu alam eksklusif dengan papan kayu kelapa gelap. Menyuguhkan panorama tebing Uluwatu yang spektakuler serta privasi tanpa batas bagi gaya hidup mewah Anda.',
    areaSqft: 680,
    bed: 5,
    bath: 6,
    image: '/src/assets/images/proptera_hero_villas_1779525426492.png',
    tag: 'Terpopuler',
    rating: 4.9,
    features: ['Infinite Ocean View', 'Batu Alam Uluwatu', 'Kolam Air Asin', 'Cinema Room', 'Smart Home System'],
    isExclusive: true,
    agent: {
      name: 'Ananda Putri',
      role: 'Uluwatu Senior Advisor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      phone: '+62 812-3456-7890'
    }
  },
  {
    id: 'prop-2',
    title: 'Komorebi Japandi Lodge',
    price: 12800000000,
    location: 'Dago Atas, Bandung',
    type: 'Lodge',
    description: 'Resor kabin bernuansa pegunungan dengan estetika Jepang-Skandinavia (Japandi) yang menawan. Berlokasi di antara rimbunan pinus Dago yang sejuk, dilengkapi ruang perapian modern dan dinding kaca ganda.',
    areaSqft: 320,
    bed: 3,
    bath: 3,
    image: '/src/assets/images/proptera_japandi_lodge_1779525457262.png',
    tag: 'Sanctuary Alam',
    rating: 4.8,
    features: ['Perapian Gantung', 'Pine Forest View', 'Dek Kayu Ulin', 'High Ceiling Outdoor Deck', 'Custom Onsen Tub'],
    isExclusive: true,
    agent: {
      name: 'Rian Dewanto',
      role: 'Highland Property Specialist',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
      phone: '+62 812-9876-5432'
    }
  },
  {
    id: 'prop-3',
    title: 'Nirvana Waterfront Pavilion',
    price: 42000000000,
    location: 'Canggu, Bali',
    type: 'Mansion',
    description: 'Paviliun kaca futuristis yang berdiri anggun di bibir pantai Canggu. Mengutamakan ruang terbuka tanpa tiang pengganggu, menghidupkan harmoni penuh antara interior mewah dengan ombak laut biru.',
    areaSqft: 950,
    bed: 6,
    bath: 7,
    image: '/src/assets/images/proptera_glass_mansion_1779525479541.png',
    tag: 'Karya Bintang 5',
    rating: 5.0,
    features: ['Direct Beach Access', 'Double-Height Custom Glass', 'Infinity Lap Pool (25m)', 'Helipad Akses', '24h Private Guard'],
    isExclusive: true,
    agent: {
      name: 'Ananda Putri',
      role: 'Uluwatu Senior Advisor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      phone: '+62 812-3456-7890'
    }
  },
  {
    id: 'prop-4',
    title: 'The Albatross Peak Mansion',
    price: 65000000000,
    location: 'Menteng, Jakarta Pusat',
    type: 'Mansion',
    description: 'Kemewahan kolonial dengan sentuhan arsitektur ultra-minimalis modern di jantung kawasan elit Jakarta. Menghadirkan pilar-pilar batu marmer Carrara berukuran raksasa dan taman indoor tropis yang asri.',
    areaSqft: 1200,
    bed: 7,
    bath: 9,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    tag: 'Istana Kota',
    rating: 4.95,
    features: ['Carrara Marble Panels', 'Premium Gym & Wellness Center', 'Private Vault', 'Ample 8-Car Garage', 'Rooftop Lounge Area'],
    isExclusive: false,
    agent: {
      name: 'Siti Rahma',
      role: 'Metropolitan Vice President',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200',
      phone: '+62 811-5555-8888'
    }
  },
  {
    id: 'prop-5',
    title: 'Samudra Vista Sky Apartment',
    price: 8900000000,
    location: 'Sudirman, Jakarta',
    type: 'Apartment',
    description: 'Penthouse vertikal eksklusif dengan jendela memutar 360 derajat menyajikan langit kota metropolitan Jakarta. Dilengkapi lift pribadi super cepat masuk langsung ke dalam foyer hunian.',
    areaSqft: 240,
    bed: 2,
    bath: 3,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    tag: 'Gaya Hidup Vertikal',
    rating: 4.7,
    features: ['360 Skylight View', 'Private Elevator Link', 'Sub-Zero & Wolf Kitchen', 'Sky Pools Access', 'Concierge 24/7'],
    isExclusive: false,
    agent: {
      name: 'Siti Rahma',
      role: 'Metropolitan Vice President',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200',
      phone: '+62 811-5555-8888'
    }
  },
  {
    id: 'prop-6',
    title: 'Ubud Hanging Zen Villa',
    price: 16200000000,
    location: 'Ubud, Bali',
    type: 'Villa',
    description: 'Vila ramah lingkungan yang menggantung di tepi lembah hijau subur Ubud. Sensasi bangun pagi bersama kabut pagi dan orkestra tenang serangga hutan tropis, dengan atap bambu lengkung berdesain modern.',
    areaSqft: 450,
    bed: 4,
    bath: 4,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
    tag: 'Eco-Living Premium',
    rating: 4.9,
    features: ['Jungle River View', 'Eco-Luxury Bamboo Roof', 'Private Suspension Bridge', 'Organic Culinary Chef', 'Yoga Shala Deck'],
    isExclusive: false,
    agent: {
      name: 'Ananda Putri',
      role: 'Uluwatu Senior Advisor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      phone: '+62 812-3456-7890'
    }
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Bambang Soetjipto',
    role: 'Co-Founder & Investor Mandiri',
    rating: 5,
    comment: 'Proptera mendefinisikan ulang cara kami mencari real estate bernilai tinggi. Keputusan membeli Amarta Stone Reserve terbantu berkat visualisasi yang realistis dan tanggapan agen yang luar biasa santun. Sangat direkomendasikan!',
    date: '12 April 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-2',
    userName: 'Clara Michelle',
    role: 'Art Director & Designer',
    rating: 5,
    comment: 'Kabin Komorebi adalah impian akhir pekan saya! Detail arsitektur Japandi dipresentasikan secara jujur di aplikasi ini. Dan fitur dark modenya elegan sekali di malam hari saat santai mencari unit.',
    date: '28 Maret 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-3',
    userName: 'Wijaya Hadi',
    role: 'Serial Tech Entrepreneur',
    rating: 4.8,
    comment: 'Layanan bintang lima dari awal negosiasi hingga tanda tangan selesai. Keinginan mencari waterfront pavilion terwujud rapi. AI personal asistennya ramah dan kalkulator KPR-nya sangat presisi dalam rupiah!',
    date: '03 Februari 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
];

export const SERVICES_LIST = [
  {
    icon: 'Shield',
    title: 'Legalitas Terjamin Mutu',
    description: 'Seluruh silsilah sertifikat properti (SHM), perizinan PBG, dan amdal diverifikasi menyeluruh oleh tim legal internal kami untuk kelancaran transaksi.'
  },
  {
    icon: 'Compass',
    title: 'Arsitektur Terpilih Karakter',
    description: 'Kami tidak menawarkan properti massal umum. Hanya properti dengan identitas arsitektur yang kuat, berkelas, dan bergengsi tinggi yang masuk katalog.'
  },
  {
    icon: 'Key',
    title: 'Layanan Serah Terima Private',
    description: 'Mulailah hidup baru Anda dengan sambutan karpet merah dan upacara serah terima kunci privat yang disesuaikan dengan privasi mutlak Anda.'
  },
  {
    icon: 'TrendingUp',
    title: 'Potensi Apresiasi Tinggi',
    description: 'Setiap kawasan properti yang kami jaring dianalisis pertumbuhan nilai investasinya untuk menjamin kapital gain optimal jangka menengah.'
  }
];
