import { Project, Skill } from '../types';

export const HERO_DATA = {
  name: 'Aryo Pratama Nugraha',
  role: '12 RPL 2 Specialist | Membangun solusi digital melalui kode bersih & arsitektur sistem yang kuat',
  statusMessage: 'SYSTEM INITIALIZATION COMPLETE...',
  heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7Vmp82QJ2TlhGM6vyAJNSsX9pHpQRIS3JEBsYR6x4Zun2KTqxy9p1EeVnEzgyfBiQEjMjzx_V4gaQ5YF59KnSL-Ul3uP5GK8nCFoAhZ_4L_6SGlToa-QntcXHm5ZXkRk3p5hQdFFtk5J5MvmQoJzpFgYHWSdIE_LNsulqxtA1NUxrGOfprP8CNJIh2cmkE8hHrKAICjT0HUUUGkJTAj8d2ZKG6K1y7B6Xzqv5l3pO8UFZQxqEXEg',
};

export const ABOUT_DATA = {
  paragraph1: 'Sebagai siswa Rekayasa Perangkat Lunak (RPL), saya berdedikasi untuk mengubah masalah kompleks menjadi solusi perangkat lunak yang elegan dan fungsional. Perjalanan saya di dunia pemrograman dimulai dari rasa ingin tahu tentang bagaimana aplikasi bekerja di balik layar.',
  paragraph2: 'Saat ini, saya fokus pada pengembangan web full-stack, menguasai fondasi frontend yang interaktif hingga logika backend yang handal. Saya percaya bahwa kode yang baik tidak hanya berfungsi, tetapi juga mudah dibaca, dirawat, dan diskalakan.',
  school: 'SMK Rekayasa Perangkat Lunak',
  grade: '12 RPL 2',
};

export const SKILLS_DATA: Skill[] = [
  {
    id: 'skill-1',
    name: 'HTML/CSS',
    icon: 'code',
    category: 'Frontend',
    proficiency: 95,
    description: 'Semantik HTML5, CSS Grid, Flexbox, & modern layouts.',
  },
  {
    id: 'skill-2',
    name: 'JavaScript',
    icon: 'javascript',
    category: 'Frontend',
    proficiency: 90,
    description: 'ES6+, Asynchronous JS, DOM manipulation, & modern Web APIs.',
  },
  {
    id: 'skill-3',
    name: 'PHP & MySQL',
    icon: 'database',
    category: 'Database',
    proficiency: 88,
    description: 'Relational database design, query optimization, & OOP PHP.',
  },
  {
    id: 'skill-4',
    name: 'Tailwind CSS',
    icon: 'widgets',
    category: 'Frontend',
    proficiency: 92,
    description: 'Utility-first styling, responsive design system, & component design.',
  },
  {
    id: 'skill-5',
    name: 'REST APIs',
    icon: 'api',
    category: 'Backend',
    proficiency: 85,
    description: 'RESTful endpoint architecture, JSON response formatting, & authentication.',
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-1',
    title: 'Sistem Manajemen Sekolah',
    category: 'FULLSTACK',
    description: 'Aplikasi komprehensif untuk mengelola data siswa, absensi, dan nilai. Dibangun dengan fokus pada keamanan dan kecepatan akses.',
    fullDescription: 'Sistem informasi sekolah terpadu yang memfasilitasi administrasi siswa, guru, wali murid, dan inventaris sekolah. Memiliki kontrol hak akses bertingkat, laporan grafik otomatis, serta ekspor data ke PDF/Excel.',
    techStack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    features: [
      'Autentikasi Multi-Role (Admin, Guru, Siswa)',
      'Manajemen Presensi & Nilai Real-time',
      'Ekspor Laporan PDF Rekapitulasi Nilai',
      'Proteksi XSS & SQL Injection Prepared Statements'
    ],
    highlights: 'Terimplementasi untuk mengelola 500+ data siswa aktif.'
  },
  {
    id: 'proj-2',
    title: 'Absensi QR Code Siswa',
    category: 'FULLSTACK',
    description: 'Sistem absensi otomatis berbasis pemindaian QR Code cepat dengan kalkulasi rekapitulasi kehadiran harian.',
    fullDescription: 'Inovasi presensi digital sekolah yang memungkinkan siswa melakukan scan QR ID Card menggunakan kamera HP atau webcam desktop. Terintegrasi dengan notifikasi rekap harian dan statistik persentase kehadiran.',
    techStack: ['PHP', 'MySQL', 'HTML5 QrScanner', 'Tailwind'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    features: [
      'Pemindai QR Code Kamera Real-time',
      'Pencatatan Jam Masuk & Pulang Otomatis',
      'Dashboard Statistik Kehadiran Harian & Bulanan',
      'Generasi Kartu Pelajar QR Code PDF'
    ],
    highlights: 'Mempercepat proses absensi dari 15 menit menjadi kurang dari 2 detik per siswa.'
  },
  {
    id: 'proj-3',
    title: 'E-Commerce UI Modern',
    category: 'FRONTEND',
    description: 'Antarmuka pengguna modern dan responsif untuk platform e-commerce dengan interaksi yang mulus.',
    fullDescription: 'Desain antarmuka toko online modern dengan tata letak grid produk fluid, filter kategori real-time, modal keranjang belanja interactive, serta sistem checkout langkah demi langkah yang user-friendly.',
    techStack: ['HTML', 'Tailwind', 'JavaScript'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    features: [
      'Filter Produk Dinamis & Pencarian Instant',
      'Desain Responsif Mobile-First',
      'Modal Preview Detail Produk',
      'Keranjang Belanja Interaktif'
    ],
    highlights: 'Skor performa Google Lighthouse 98/100.'
  },
  {
    id: 'proj-4',
    title: 'RESTful API Task Manager',
    category: 'BACKEND',
    description: 'Layanan backend untuk manajemen tugas dengan autentikasi JWT dan dokumentasi lengkap.',
    fullDescription: 'API backend terstruktur tinggi untuk manajemen tugas harian, prioritas deadline, dan sistem tim collaborative. Dilengkapi dengan proteksi token JWT, rate-limiting, dan middleware error handling.',
    techStack: ['Node.js', 'Express', 'JWT', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    features: [
      'Autentikasi Aman Berbasis JSON Web Token (JWT)',
      'Arsitektur MVC (Model-View-Controller) Rapi',
      'Validasi Input Middleware Payload',
      'Sistem CORS & Security Headers Security'
    ],
    highlights: 'Dokumentasi Postman & OpenAPI Swagger lengkap.'
  },
  {
    id: 'proj-5',
    title: 'Perpustakaan Digital RPL',
    category: 'FULLSTACK',
    description: 'Aplikasi katalog & peminjaman buku digital sekolah dengan sistem denda otomatis dan pelacakan stok.',
    fullDescription: 'Platform sistem informasi perpustakaan digital untuk pencarian koleksi buku, reservasi peminjaman online, riwayat pengembalian, serta kalkulasi otomatis denda keterlambatan.',
    techStack: ['PHP', 'MySQL', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    features: [
      'Pencarian Katalog Buku dengan Autocomplete',
      'Peminjaman & Pengembalian Buku Digital',
      'Kalkulator Denda Keterlambatan Otomatis',
      'Laporan Grafik Buku Terpopuler'
    ],
    highlights: 'Digunakan oleh anggota OSIS & Perpustakaan Sekolah.'
  },
  {
    id: 'proj-6',
    title: 'Sistem Kasir (POS) Minimarket',
    category: 'FULLSTACK',
    description: 'Aplikasi Point of Sale desktop-friendly untuk transaksi cepat, pencetakan struk, dan riwayat penjualan.',
    fullDescription: 'Sistem kasir toko dengan pencarian produk cepat berbasis barcode/nama, kalkulasi kembalian instant, serta cetak struk nota belanja langsung ke printer thermal.',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67f572c9f7?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    features: [
      'Pencarian Produk Barcode Scan',
      'Kalkulasi Transaksi & Diskonto Otomatis',
      'Cetak Struk Nota Belanja Printer Thermal',
      'Laporan Omset Penjualan Harian'
    ],
    highlights: 'Mendukung hingga 1,000+ item transaksi barang.'
  }
];
