import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Activity, Apple, Heart } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const RecomendationCard = ({ recommendations }) => {
  const defaultRecs = [
    {
      id: "diet",
      title: "Pola Makan",
      description: "Kurangi konsumsi karbohidrat dan gula. Tingkatkan asupan serat dan protein.",
      icon: <Apple className="h-4 w-4 text-primary mr-2" />
    },
    {
      id: "exercise",
      title: "Aktivitas Fisik",
      description: "Tingkatkan frekuensi olahraga menjadi 3-4x seminggu dengan durasi minimal 30 menit.",
      icon: <Activity className="h-4 w-4 text-primary mr-2" />
    },
    {
      id: "checkup",
      title: "Pemeriksaan Kesehatan",
      description: "Lakukan pemeriksaan gula darah setiap 3 bulan dan konsultasi dengan dokter.",
      icon: <Heart className="h-4 w-4 text-primary mr-2" />
    }
  ];

  const recsToShow = defaultRecs;

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-primary">
        Rekomendasi Kesehatan
      </h3>
      <div className="grid gap-4 md:grid-cols-3">
        {recsToShow.map((rec) => (
          <Card key={rec.id} className="border-t-2 border-t-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                {rec.icon}
                {rec.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{rec.description}</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="primary"
                size="sm"
                className="w-full bg-transparent text-primary hover:text-white hover:bg-primary"
                asChild
              >
                <Link href={`/rekomendasi/${rec.id}`}>Lihat Detail</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecomendationCard;