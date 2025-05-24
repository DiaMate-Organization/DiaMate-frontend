"use client";

import { useState, useEffect } from "react";
import { AssessmentForm } from "@/components/AssessmentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAssessments } from "@/lib/assessment-actions";
import { Loader2 } from "lucide-react";

export default function PrediksiPage() {
  const [lastPrediction, setLastPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAssessments = async () => {
      try {
        setIsLoading(true);
        const response = await fetchAssessments();

        if (response.error) {
          setError(response.message);
          return;
        }

        const assessments = response.data || [];
        if (assessments.length > 0) {
          const latestAssessment = assessments.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )[0];
          setLastPrediction({
            risk: latestAssessment.risk_level,
            probability:
              latestAssessment.risk_level === "Rendah"
                ? 0.2
                : latestAssessment.risk_level === "Sedang"
                ? 0.5
                : 0.8,
            riskFactors: latestAssessment.risk_factors || [],
            timestamp: latestAssessment.created_at,
          });
        }
      } catch (err) {
        setError("Gagal memuat riwayat penilaian. Silakan coba lagi nanti.");
        console.error("Fetch assessment error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssessments();
  }, []);

  const handlePredictionSuccess = (result) => {
    setLastPrediction({
      risk: result.risk,
      probability: result.probability,
      riskFactors: result.riskFactors || [],
      timestamp: result.timestamp,
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl text-foreground">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Penilaian Risiko Diabetes</h1>
        <p className="text-muted-foreground mb-4">
          Silakan jawab pertanyaan berikut untuk menilai risiko diabetes Anda.
          Pastikan semua informasi yang Anda masukkan akurat untuk hasil yang
          lebih baik.
        </p>

        {isLoading ? (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <p>Memuat riwayat penilaian...</p>
          </div>
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : lastPrediction ? (
          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">
                Hasil Penilaian Terakhir Anda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-lg">
                  Risiko Anda:{" "}
                  <span
                    className={
                      lastPrediction.risk === "Tinggi"
                        ? "font-bold text-destructive"
                        : lastPrediction.risk === "Sedang"
                        ? "font-bold text-yellow-600"
                        : "font-bold text-primary"
                    }
                  >
                    {lastPrediction.risk}
                  </span>
                </p>
                <p className="text-muted-foreground">
                  Probabilitas: {(lastPrediction.probability * 100).toFixed(1)}%
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Diperbarui pada:{" "}
                  {new Date(lastPrediction.timestamp).toLocaleString("id-ID", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              {lastPrediction.riskFactors.length > 0 && (
                <div>
                  <p className="font-semibold">Faktor Risiko Terdeteksi:</p>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {lastPrediction.riskFactors.map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <p className="text-muted-foreground mb-6">
            Belum ada riwayat penilaian. Silakan isi formulir untuk memulai.
          </p>
        )}
      </div>

      <AssessmentForm onSuccess={handlePredictionSuccess} />
    </div>
  );
}
