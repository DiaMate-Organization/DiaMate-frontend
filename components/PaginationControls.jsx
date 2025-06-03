import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControls({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    totalPages > 1 && (
      <div className="p-4 flex items-center justify-between border-t border-border bg-card">
        <div className="text-sm text-muted-foreground">
          Halaman {currentPage} dari {totalPages}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="flex items-center gap-1 border-border text-foreground hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 border-border text-foreground hover:bg-muted"
          >
            <span className="hidden sm:inline">Selanjutnya</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  );
}