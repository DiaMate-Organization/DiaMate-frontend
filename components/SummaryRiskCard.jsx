import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AlertCircle, History } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const SummaryRiskCard = ({ userData }) => {
  const getRiskColor = (risk) => {
    switch (risk) {
      case "Rendah":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100";
      case "Sedang":
        return "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100";
      case "Tinggi":
        return "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100";
    }
  };

  const getRiskProgress = (risk) => {
    switch (risk) {
      case "Rendah":
        return 25;
      case "Sedang":
        return 60;
      case "Tinggi":
        return 90;
      default:
        return 0;
    }
  };

  return (
    <Card className="border-t-4 border-t-primary">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Ringkasan Risiko Diabetes</CardTitle>
          <Badge className={getRiskColor(userData?.riskLevel)}>
            Risiko {userData?.riskLevel || 'Tidak Diketahui'}
          </Badge>
        </div>
        <CardDescription>
          Berdasarkan data terakhir: {userData?.lastCheckup || 'Belum ada data'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Tingkat Risiko</span>
            <span className="font-medium">{userData?.riskLevel || '-'}</span>
          </div>
          <Progress
            value={getRiskProgress(userData?.riskLevel)}
            className="h-2"
            indicatorClassName={
              userData?.riskLevel === "Sedang"
                ? "bg-yellow-500"
                : userData?.riskLevel === "Rendah"
                ? "bg-green-500"
                : "bg-red-500"
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="space-y-1 p-3 rounded-lg bg-muted">
            <span className="text-xs text-muted-foreground">BMI</span>
            <p className="font-medium">{userData?.bmi || '-'}</p>
          </div>
          <div className="space-y-1 p-3 rounded-lg bg-muted">
            <span className="text-xs text-muted-foreground">Tekanan Darah</span>
            <p className="font-medium">{userData?.bloodPressure || '-'}</p>
          </div>
          <div className="space-y-1 p-3 rounded-lg bg-muted">
            <span className="text-xs text-muted-foreground">Gula Darah</span>
            <p className="font-medium">{userData?.bloodSugar || '-'}</p>
          </div>
          <div className="space-y-1 p-3 rounded-lg bg-muted">
            <span className="text-xs text-muted-foreground">Aktivitas Fisik</span>
            <p className="font-medium">{userData?.physicalActivity || '-'}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="primary" asChild className="border-2 hover:bg-muted">
          <Link href="/riwayat">
            <History className="mr-2 h-4 w-4" />
            Riwayat Prediksi
          </Link>
        </Button>
        <Button asChild
          variant="primary"
          className="text-foreground bg-primary"
        >
          <Link href="/prediksi">
            <AlertCircle className="mr-2 h-4 w-4" />
            Prediksi Ulang
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SummaryRiskCard;