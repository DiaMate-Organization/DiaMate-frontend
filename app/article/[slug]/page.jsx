import Image from "next/image";
import React from "react";

function DynamicArticlePage({ params }) {
  const content = `<article>
  <h2>Manfaat Berolahraga di Pagi Hari</h2>
  <p>
    Berolahraga di pagi hari dapat memberikan berbagai manfaat bagi tubuh dan
    pikiran. Selain membantu membakar kalori lebih efektif, aktivitas fisik di
    pagi hari juga meningkatkan fokus dan energi sepanjang hari.
  </p>
  <p>
    Penelitian menunjukkan bahwa orang yang rutin berolahraga di pagi hari
    memiliki kualitas tidur yang lebih baik dan suasana hati yang lebih stabil.
    Aktivitas ini juga bisa menjadi kebiasaan sehat yang memotivasi pola hidup
    lainnya seperti makan teratur dan minum air yang cukup.
  </p>
  <ul>
    <li>Meningkatkan metabolisme tubuh</li>
    <li>Membantu menjaga berat badan ideal</li>
    <li>Menurunkan risiko penyakit kronis</li>
    <li>Meningkatkan mood dan produktivitas</li>
  </ul>
  <p>
    Mulailah dengan aktivitas ringan seperti jalan cepat atau peregangan. Dengan
    konsistensi, olahraga pagi bisa menjadi bagian menyenangkan dari rutinitas
    harian Anda.
  </p>
</article>
`;
  return (
    <div className="mx-12 md:mx-20 mt-14 lg:pl-18 overflow-hidden">
      <div className="flex flex-col items-center gap-5 justify-center md:mt-32">
        <div className="mt-32 flex flex-col items-center justify-center">
          <h2 className="text-3xl max-w-2xl md:text-6xl font-medium text-center">
            Rekomendasi makanan sehat untuk penderita diabetes
          </h2>
          <div className="text-center mt-5 text-muted-foreground">
            Dewi Persik
          </div>
        </div>
        <div className="relative md:mt-20 w-full md:w-1/2 aspect-[16/9]">
          <Image
            src="/article-1.jpg"
            alt="article thumbnail"
            fill
            className="object-cover rounded-md"
          />
        </div>

        {/* content */}
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="prose dark:prose-invert"
        ></div>
      </div>
    </div>
  );
}

export default DynamicArticlePage;
