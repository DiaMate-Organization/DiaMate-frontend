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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreVertical, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { deleteAssessment } from "@/lib/assessment-actions";
import { toast } from "sonner";

export default function AssessmentTable({ assessments, onDelete }) {
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      const result = await deleteAssessment(id);
      
      if (result.error) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        onDelete(id);
        
        // Adjust current page if necessary after deletion
        const totalPages = Math.ceil((assessments.length - 1) / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages);
        }
      }
    } catch (error) {
      toast.error("Gagal menghapus assessment");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  // Sort assessments by date (newest first) and paginate
  const { paginatedAssessments, totalPages, totalItems } = useMemo(() => {
    const sortedAssessments = [...assessments].sort((a, b) => {
      const dateA = new Date(a.created_at || a.date);
      const dateB = new Date(b.created_at || b.date);
      return dateB - dateA; // Descending order (terbaru dulu)
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = sortedAssessments.slice(startIndex, endIndex);
    const pages = Math.ceil(sortedAssessments.length / itemsPerPage);

    return {
      paginatedAssessments: paginated,
      totalPages: pages,
      totalItems: sortedAssessments.length
    };
  }, [assessments, currentPage, itemsPerPage]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination
      if (currentPage <= 3) {
        // Show first pages
        for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last pages
        for (let i = Math.max(1, totalPages - maxVisiblePages + 1); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show pages around current page
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-card hover:bg-card">
              <TableHead className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-foreground">
                Tanggal
              </TableHead>
              <TableHead className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-foreground">
                Tingkat Risiko
              </TableHead>
              <TableHead className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-foreground">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAssessments.length > 0 ? (
              paginatedAssessments.map((assessment) => (
                <TableRow
                  key={assessment.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-foreground">
                    <div className="min-w-0">
                      <div className="truncate">
                        {assessment.date}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-2 sm:px-4 py-3">
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
                  <TableCell className="px-2 sm:px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4 text-foreground" />
                          <span className="sr-only">Buka menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/riwayat/detail/${assessment.id}`} className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat Detail
                          </Link>
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="max-w-md">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Assessment</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus assessment ini? 
                                Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex-col sm:flex-row space-y-2 sm:space-y-0">
                              <AlertDialogCancel className="w-full sm:w-auto">Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(assessment.id)}
                                disabled={isDeleting}
                                className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                              >
                                {isDeleting ? "Menghapus..." : "Hapus"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="px-2 sm:px-4 py-6 text-center text-xs sm:text-sm text-muted-foreground"
                >
                  Tidak ada riwayat assessment.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          {/* Info */}
          <div className="text-xs sm:text-sm text-muted-foreground">
            Menampilkan {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} - {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} data
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Halaman sebelumnya</span>
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {getPageNumbers().map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(pageNum)}
                  className="h-8 w-8 p-0 text-xs"
                >
                  {pageNum}
                </Button>
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Halaman selanjutnya</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}