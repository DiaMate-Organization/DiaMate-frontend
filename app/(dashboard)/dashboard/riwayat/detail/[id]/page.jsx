"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchAssessments } from "@/lib/assessment-actions";
import AssessmentDetailCard from "@/components/assessment/AssessmentDetailCard";

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAssessment = async () => {
      if (id) {
        setLoading(true);
        const result = await fetchAssessments();
        if (!result.error && result.data) {
          const foundAssessment = result.data.find((a) => a.id === id);
          setAssessment(foundAssessment || null);
        } else {
          setError(result.message || "Gagal memuat detail assessment");
        }
        setLoading(false);
      }
    };
    loadAssessment();
  }, [id]);

  if (error || (!loading && !assessment)) {
    return (
      <div className="p-4 sm:p-6 text-center text-sm text-red-500">
        {error || "Assessment tidak ditemukan"}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">
          Detail Assessment -{" "}
          {loading
            ? "Memuat..."
            : new Date(assessment.created_at).toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
              })}
        </h2>
      </div>
      <AssessmentDetailCard assessment={assessment} loading={loading} />
      <Button
        onClick={() => router.back()}
        className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Kembali
      </Button>
    </div>
  );
}
