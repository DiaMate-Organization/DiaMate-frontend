// for mockup data

import {
  BotIcon,
  ChartBarBig,
  ClipboardCheck,
  CpuIcon,
  Eye,
  HandshakeIcon,
  NotepadText,
  PackageSearch,
  Settings,
  Smartphone,
  TimerIcon,
} from "lucide-react";

export const univ = [
  {
    imageUrl: "/unud.jpg",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "/stmiktd.jpg",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "/umc.jpg",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "/gundar.jpg",
    profileUrl: "https://github.com/safethecode",
  },
];

export const benefits = [
  {
    icon: <TimerIcon className="w-8 h-8" />,
    title: "Cepat dan Praktis",
    content:
      "Prediksi risiko kesehatan Anda dalam hitungan detik tanpa proses yang rumit.",
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Akses Kapan Saja",
    content:
      "Gunakan DiaMate langsung dari device apapun, di mana pun dan kapan pun.",
  },
  {
    icon: <HandshakeIcon className="w-8 h-8" />,
    title: "Panduan Gaya Hidup Sehat",
    content:
      "Dapatkan rekomendasi aktivitas harian yang mendukung kesehatan Anda",
  },
  {
    icon: <BotIcon className="w-8 h-8" />,
    title: "Didukung Teknologi Terkini",
    content: "Menggunakan pendekatan machine learning",
  },
];

export const data = [
  {
    id: 1,
    title: "1. Isi Assessment",
    content:
      "Jawab beberapa pertanyaan sederhana untuk membantu kami memahami kondisi awal Anda.",
    image: "/correct_answer.svg",
    icon: <NotepadText className="size-6 text-primary" />,
  },
  {
    id: 2,
    title: "2.  Lihat Hasil Prediksi",
    content:
      "Dapatkan gambaran awal risiko diabetes berdasarkan hasil assessment Anda.",
    image: "/done_checking.svg",
    icon: <ClipboardCheck className="size-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Pantau Harian Anda",
    content:
      "Gunakan dashboard untuk melacak kondisi dan kebiasaan harian Anda secara berkala.",
    image: "chart.svg",
    icon: <ChartBarBig className="size-6 text-primary" />,
  },
];

export const teams = [
  {
    image: "https://avatars.githubusercontent.com/u/583231?v=4",
    name: "Ridho Bintang Aulia",
    description: "Project Manager",
    link: "https://stripe.com",
  },
  {
    image: "https://avatars.githubusercontent.com/u/583231?v=4",
    name: "Al Farizi Dwi Prasetyo",
    description: "Fullstack Developer",
    link: "https://netflix.com",
  },
  {
    image: "https://avatars.githubusercontent.com/u/583231?v=4",
    name: "Muhammad Faiz",
    description: "Fullstack Developer",
    link: "https://google.com",
  },
  {
    image: "https://avatars.githubusercontent.com/u/583231?v=4",
    name: "Leonard Bodhi Kumaro",
    description: "Machine Learning Engineer",
    link: "https://meta.com",
  },
  {
    image: "https://avatars.githubusercontent.com/u/583231?v=4",
    name: "Riandika Fathur Rochim",
    description: "Machine Learning Engineer",
    link: "https://amazon.com",
  },
  {
    image: "https://avatars.githubusercontent.com/u/583231?v=4",
    name: "Damar Syarafi Ramadhan",
    description: "Machine Learning Engineer",
    link: "https://microsoft.com",
  },
];

export const faqs = [
  {
    question: "Apa itu DiaMate?",
    answer:
      "DiaMate adalah platform berbasis web yang digunakan untuk membantu pengguna melakukan deteksi dini risiko diabetes melalui asesmen sederhana, pemantauan harian, dan saran aktivitas sehat.",
  },
  {
    question: "Apakah hasil dari DiaMate bisa menggantikan diagnosis dokter?",
    answer:
      "Tidak. Hasil dari DiaMate hanya bersifat prediktif awal dan tidak dapat menggantikan diagnosis dari tenaga medis profesional. Konsultasi dengan dokter tetap dianjurkan.",
  },
  {
    question: "Apakah data saya aman di DiaMate?",
    answer:
      "Ya, data Anda disimpan dengan aman dan hanya digunakan untuk keperluan asesmen serta peningkatan layanan. Kami mematuhi kebijakan privasi dan keamanan data pengguna.",
  },
  {
    question: "Siapa saja yang dapat menggunakan DiaMate?",
    answer:
      "DiaMate dapat digunakan oleh siapa saja yang ingin memahami risiko awal diabetes, baik untuk pencegahan maupun pemantauan kesehatan secara mandiri.",
  },
  {
    question: "Apakah penggunaan DiaMate berbayar?",
    answer:
      "Tidak. Saat ini DiaMate dapat digunakan secara gratis sebagai bentuk kontribusi kami dalam meningkatkan kesadaran terhadap pentingnya deteksi dini diabetes.",
  },
];

export const navItemLanding = [
  {
    name: "Introduction",
    link: "#introduction",
  },
  {
    name: "Benefits",
    link: "#benefits",
  },
  {
    name: "How It Works",
    link: "#how-it-works",
  },
  {
    name: "Our Team",
    link: "#our-team",
  },
  {
    name: "Articles",
    link: "#articles",
  },
  {
    name: "FAQ",
    link: "#faq",
  },
];
