"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { fetchAssessments } from "@/lib/assessment-actions";
import AssessmentTable from "@/components/AssessmentTable";
import PaginationControls from "@/components/PaginationControls";
import AssessmentSkeleton from "@/components/AssessmentSkeleton";

export default function DashboardPage() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadAssessments = async () => {
      setLoading(true);
      const result = await fetchAssessments();
      if (!result.error && result.data) {
        setAssessments(result.data);
      } else {
        setError(result.message || "Gagal memuat riwayat assessment");
      }
      setLoading(false);
    };
    loadAssessments();
  }, []);

  const totalPages = Math.ceil(assessments.length / itemsPerPage);
  const paginatedAssessments = assessments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">
          Selamat Datang di DiaMate
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Pantau risiko diabetes Anda dengan mudah dan dapatkan rekomendasi
        kesehatan yang dipersonalisasi.
      </p>
      <div className="rounded-lg border border-border bg-card">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">
            Riwayat Assessment
          </h3>
        </div>
        {loading ? (
          <AssessmentSkeleton />
        ) : error ? (
          <div className="p-4 text-center text-sm text-red-500">
            {error}
          </div>
        ) : (
          <>
            <AssessmentTable assessments={paginatedAssessments} />
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={handlePreviousPage}
              onNext={handleNextPage}
            />
          </>
        )}
      </div>
    </div>
  );
}