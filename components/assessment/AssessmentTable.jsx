import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

export default function AssessmentTable({ assessments }) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="bg-card hover:bg-card">
            <TableHead className="px-4 py-3 text-left text-sm font-medium text-foreground">
              Tanggal
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-sm font-medium text-foreground">
              Tingkat Risiko
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-sm font-medium text-foreground">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessments.length > 0 ? (
            assessments.map((assessment) => (
              <TableRow
                key={assessment.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <TableCell className="px-4 py-3 text-sm text-foreground">
                  {assessment.date}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium text-white rounded-md ${
                      assessment.risk_level === "Rendah"
                        ? "bg-green-500"
                        : assessment.risk_level === "Sedang"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {assessment.risk_level}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4 text-foreground" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/riwayat/detail/${assessment.id}`}>
                          Lihat Detail
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="px-4 py-6 text-center text-sm text-muted-foreground"
              >
                Tidak ada riwayat assessment.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}