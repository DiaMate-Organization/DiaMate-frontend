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
    image: "/DiaMateAssets/mas bintang.jpg",
    name: "Ridho Bintang Aulia",
    description: "Project Manager",
    link: "https://stripe.com",
  },
  {
    image: "/DiaMateAssets/mas tyo.jpg",
    name: "Al Farizi Dwi Prasetyo",
    description: "Fullstack Developer",
    link: "https://netflix.com",
  },
  {
    image: "/DiaMateAssets/mas faiz.jpg",
    name: "Muhammad Faiz",
    description: "Fullstack Developer",
    link: "https://google.com",
  },
  {
    image: "/DiaMateAssets/mas leo.jpg",
    name: "Leonard Bodhi Kumaro",
    description: "Machine Learning Engineer",
    link: "https://meta.com",
  },
  {
    image: "/DiaMateAssets/mas rian.jpg",
    name: "Riandika Fathur Rochim",
    description: "Machine Learning Engineer",
    link: "https://amazon.com",
  },
  {
    image: "/DiaMateAssets/mas damar.jpg",
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
    link: "/#introduction",
  },
  {
    name: "Benefits",
    link: "/#benefits",
  },
  {
    name: "How It Works",
    link: "/#how-it-works",
  },
  {
    name: "Our Team",
    link: "/#our-team",
  },
  {
    name: "Articles",
    link: "/#articles",
  },
  {
    name: "FAQ",
    link: "/#faq",
  },
];

export const ArticleList = [
  {
    title: "Pentingnya Gaya Hidup Sehat untuk Mencegah Diabetes",
    slug: "pentingnya-gaya-hidup-sehat-untuk-mencegah-diabetes",
    image: "/article-1.jpg",
    content: `<article>
      <h2>Pentingnya Gaya Hidup Sehat untuk Mencegah Diabetes</h2>
      <p>
        Diabetes tipe 2 dapat dicegah dengan perubahan gaya hidup sederhana namun konsisten. Mengatur pola makan,
        berolahraga rutin, dan menjaga berat badan ideal adalah langkah awal yang efektif.
      </p>
      <p>
        Orang dengan riwayat keluarga diabetes perlu lebih waspada dan proaktif dalam menjaga kesehatan.
        Konsumsi makanan rendah gula dan tinggi serat dapat menurunkan risiko secara signifikan.
      </p>
      <ul>
        <li>Konsumsi sayur dan buah segar setiap hari</li>
        <li>Kurangi asupan makanan olahan dan tinggi gula</li>
        <li>Lakukan aktivitas fisik minimal 30 menit per hari</li>
        <li>Periksa kadar gula darah secara rutin</li>
      </ul>
      <p>
        Dengan komitmen terhadap gaya hidup sehat, risiko terkena diabetes bisa dikurangi secara signifikan.
      </p>
    </article>`,
    creator: "Dewi Persik",
    readMinutes: "6",
  },
  {
    title: "Makanan yang Baik untuk Penderita Diabetes",
    slug: "makanan-yang-baik-untuk-penderita-diabetes",
    image: "/article-1.jpg",
    content: `<article>
      <h2>Makanan yang Baik untuk Penderita Diabetes</h2>
      <p>
        Pemilihan makanan sangat penting bagi penderita diabetes. Makanan dengan indeks glikemik rendah
        membantu menjaga kadar gula darah tetap stabil.
      </p>
      <p>
        Beberapa jenis makanan yang disarankan antara lain sayuran hijau, biji-bijian utuh, ikan berlemak, dan kacang-kacangan.
        Hindari makanan tinggi gula dan karbohidrat olahan seperti roti putih dan soda.
      </p>
      <ul>
        <li>Sayuran hijau (bayam, brokoli)</li>
        <li>Oatmeal dan quinoa</li>
        <li>Salmon, sarden, dan tuna</li>
        <li>Alpukat dan kacang almond</li>
      </ul>
      <p>
        Mengatur pola makan dengan benar dapat membantu pengendalian gula darah dan mencegah komplikasi diabetes.
      </p>
    </article>`,
    creator: "Budi Hartono",
    readMinutes: "5",
  },
  {
    title: "Pentingnya Olahraga bagi Penderita Diabetes",
    slug: "pentingnya-olahraga-bagi-penderita-diabetes",
    image: "/article-1.jpg",
    content: `<article>
      <h2>Pentingnya Olahraga bagi Penderita Diabetes</h2>
      <p>
        Olahraga memiliki peran penting dalam pengelolaan diabetes. Aktivitas fisik membantu tubuh menggunakan insulin lebih efisien
        dan menurunkan kadar gula darah secara alami.
      </p>
      <p>
        Penderita diabetes dianjurkan untuk melakukan olahraga ringan hingga sedang seperti jalan kaki, bersepeda, atau berenang.
        Konsistensi lebih penting daripada intensitas tinggi.
      </p>
      <ul>
        <li>Meningkatkan sensitivitas insulin</li>
        <li>Membantu menjaga berat badan</li>
        <li>Menurunkan tekanan darah</li>
        <li>Meningkatkan energi dan suasana hati</li>
      </ul>
      <p>
        Konsultasikan dengan dokter sebelum memulai program olahraga, terutama bagi yang memiliki komplikasi tertentu.
      </p>
    </article>`,
    creator: "Siti Aminah",
    readMinutes: "4",
  },
  {
    title: "Bahaya Diabetes Jika Tidak Ditangani Sejak Dini",
    slug: "bahaya-diabetes-jika-tidak-ditangani-sejak-dini",
    image: "/article-1.jpg",
    content: `<article>
      <h2>Bahaya Diabetes Jika Tidak Ditangani Sejak Dini</h2>
      <p>
        Diabetes yang tidak ditangani dapat menyebabkan komplikasi serius seperti penyakit jantung, kerusakan ginjal,
        gangguan penglihatan, dan luka yang sulit sembuh.
      </p>
      <p>
        Deteksi dini melalui pemeriksaan rutin sangat penting, terutama bagi mereka dengan faktor risiko seperti obesitas
        dan riwayat keluarga.
      </p>
      <ul>
        <li>Retinopati diabetik (gangguan mata)</li>
        <li>Nefropati (kerusakan ginjal)</li>
        <li>Neuropati (kerusakan saraf)</li>
        <li>Risiko amputasi akibat luka kronis</li>
      </ul>
      <p>
        Penting untuk segera mengambil langkah pengelolaan diabetes dengan pengobatan, pola makan sehat, dan perubahan gaya hidup.
      </p>
    </article>`,
    creator: "Andi Wijaya",
    readMinutes: "5",
  },
  {
    title: "Cara Memantau Gula Darah Sendiri di Rumah",
    slug: "cara-memantau-gula-darah-sendiri-di-rumah",
    image: "/article-1.jpg",
    content: `<article>
      <h2>Cara Memantau Gula Darah Sendiri di Rumah</h2>
      <p>
        Memantau kadar gula darah secara mandiri sangat penting bagi penderita diabetes untuk menjaga kadar gula tetap terkendali.
        Pengukuran rutin membantu pengambilan keputusan terkait makanan, aktivitas, dan pengobatan.
      </p>
      <p>
        Gunakan alat glucometer yang mudah digunakan di rumah. Periksa sebelum makan, 2 jam setelah makan, dan sebelum tidur
        untuk mengetahui pola naik-turunnya gula darah.
      </p>
      <ul>
        <li>Cuci tangan sebelum tes</li>
        <li>Gunakan jarum baru setiap kali</li>
        <li>Catat hasil untuk evaluasi bersama dokter</li>
        <li>Kenali tanda-tanda hipo dan hiperglikemia</li>
      </ul>
      <p>
        Konsistensi dalam pemantauan membantu mencegah komplikasi jangka panjang dan memberi kontrol lebih besar atas kesehatan.
      </p>
    </article>`,
    creator: "Rina Marlina",
    readMinutes: "4",
  },
];

export const reviews = [
  {
    name: "Rina",
    username: "@rina",
    body: "Keren banget! Aku bisa cek risiko diabetes kapan aja tanpa ribet. UI-nya juga nyaman dipakai.",
    img: "https://avatar.vercel.sh/rina",
  },
  {
    name: "Andi",
    username: "@andi",
    body: "Sempet khawatir soal kesehatanku, tapi DiaMate bantu banget buat tahu kondisi awal dan ngasih arahan.",
    img: "https://avatar.vercel.sh/andi",
  },
  {
    name: "Tika",
    username: "@tika",
    body: "Tracking harian di dashboard-nya bikin aku lebih semangat jaga pola hidup sehat. Thanks DiaMate!",
    img: "https://avatar.vercel.sh/tika",
  },
  {
    name: "Bagas",
    username: "@bagas",
    body: "Suka banget sama fitur rekomendasi aktivitasnya. Simple tapi bermanfaat banget buat pemula kayak aku.",
    img: "https://avatar.vercel.sh/bagas",
  },
  {
    name: "Sari",
    username: "@sari",
    body: "Ini web bukan cuma informatif, tapi juga ngebantu aku lebih aware sama risiko diabetes dari sekarang.",
    img: "https://avatar.vercel.sh/sari",
  },
];
