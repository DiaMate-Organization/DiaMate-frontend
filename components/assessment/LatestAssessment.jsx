import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";

const LatestAssessments = ({ assessments, loading = false }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Penilaian Terbaru</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            5 penilaian risiko diabetes terbaru
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border rounded-lg space-y-2 sm:space-y-0">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-16 bg-muted animate-pulse rounded" />
                </div>
                <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Mengurutkan assessment berdasarkan created_at terbaru dan mengambil 5 teratas
  const sortedAssessments = assessments ? [...assessments].sort((a, b) => {
    const dateA = new Date(a.created_at || a.date);
    const dateB = new Date(b.created_at || b.date);
    return dateB - dateA; // Descending order (terbaru dulu)
  }) : [];

  const latestAssessments = sortedAssessments.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
          <div>
            <CardTitle className="text-xl sm:text-2xl">Penilaian Terbaru</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              5 penilaian risiko diabetes terbaru
            </CardDescription>
          </div>
          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
            <Link href="/dashboard/riwayat">
              Lihat Semua
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {latestAssessments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm sm:text-base">Belum ada penilaian yang tersimpan</p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/dashboard/assessment">
                Mulai Penilaian
              </Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Tanggal</TableHead>
                  <TableHead className="text-xs sm:text-sm">Tingkat Risiko</TableHead>
                  <TableHead className="text-right text-xs sm:text-sm">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestAssessments.map((assessment) => (
                  <TableRow key={assessment.id}>
                    <TableCell className="font-medium text-xs sm:text-sm">
                      <div className="min-w-0">
                        <div className="truncate">
                          {assessment.date}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                          assessment.risk_level === "Rendah"
                            ? "bg-green-100 text-green-800"
                            : assessment.risk_level === "Sedang"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {assessment.risk_level}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" size="sm" className="text-xs sm:text-sm">
                        <Link href={`/dashboard/riwayat/detail/${assessment.id}`}>
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          <span className="hidden sm:inline">Detail</span>
                          <span className="sm:hidden">Info</span>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LatestAssessments;