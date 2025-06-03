"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AssessmentTable from "@/components/assessment/AssessmentTable";
import { fetchAssessments } from "@/lib/assessment-actions";
import { toast } from "sonner";
import { Plus, Activity, ArrowLeft, FileText } from "lucide-react";

export default function RiwayatPage() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAssessments = async () => {
    try {
      setLoading(true);
      const result = await fetchAssessments();
      
      if (result.error) {
        toast.error(result.message);
        setAssessments([]);
      } else {
        setAssessments(result.data || []);
      }
    } catch (error) {
      toast.error("Gagal memuat riwayat assessment");
      console.error("Riwayat error:", error);
      setAssessments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssessments();
  }, []);

  const handleDelete = (deletedId) => {
    setAssessments(prev => prev.filter(assessment => assessment.id !== deletedId));
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-4 sm:p-6 space-y-6">
          {/* Header Skeleton */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
            <div className="space-y-2">
              <div className="h-8 w-48 bg-muted animate-pulse rounded" />
              <div className="h-4 w-64 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-10 w-32 bg-muted animate-pulse rounded" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg border p-4 sm:p-6">
                <div className="h-4 w-24 bg-muted animate-pulse rounded mb-2" />
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <Card>
            <CardHeader>
              <div className="h-6 w-32 bg-muted animate-pulse rounded" />
              <div className="h-4 w-48 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
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
        </div>
      </div>
    );
  }

  // Get statistics
  const totalAssessments = assessments.length;
  const risikoRendah = assessments.filter(a => a.risk_level === "Rendah").length;
  const risikoSedang = assessments.filter(a => a.risk_level === "Sedang").length;
  const risikoTinggi = assessments.filter(a => a.risk_level === "Tinggi").length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
          <div className="space-y-1 sm:space-y-2">
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm" className="p-0 h-auto sm:hidden">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Riwayat Assessment
              </h1>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Semua riwayat penilaian risiko diabetes Anda
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button asChild variant="outline" size="default" className="w-full sm:w-auto">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="text-sm sm:text-base">Kembali</span>
              </Link>
            </Button>
            <Button asChild size="default" className="w-full sm:w-auto">
              <Link href="/dashboard/assessment">
                <Plus className="h-4 w-4 mr-2" />
                <span className="text-sm sm:text-base">Penilaian Baru</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-card text-card-foreground rounded-lg border p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-primary" />
              <h3 className="text-xs sm:text-sm font-medium">Total</h3>
            </div>
            <p className="text-lg sm:text-2xl font-bold mt-1">{totalAssessments}</p>
          </div>
          
          <div className="bg-card text-card-foreground rounded-lg border p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <h3 className="text-xs sm:text-sm font-medium">Rendah</h3>
            </div>
            <p className="text-lg sm:text-2xl font-bold mt-1 text-green-600">{risikoRendah}</p>
          </div>

          <div className="bg-card text-card-foreground rounded-lg border p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
              <h3 className="text-xs sm:text-sm font-medium">Sedang</h3>
            </div>
            <p className="text-lg sm:text-2xl font-bold mt-1 text-yellow-600">{risikoSedang}</p>
          </div>

          <div className="bg-card text-card-foreground rounded-lg border p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              <h3 className="text-xs sm:text-sm font-medium">Tinggi</h3>
            </div>
            <p className="text-lg sm:text-2xl font-bold mt-1 text-red-600">{risikoTinggi}</p>
          </div>
        </div>

        {/* Assessment Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg sm:text-xl">Daftar Assessment</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              {totalAssessments > 0 
                ? `Total ${totalAssessments} assessment yang tersimpan`
                : "Belum ada assessment yang tersimpan"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {totalAssessments === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Belum ada riwayat assessment
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Mulai assessment pertama Anda untuk melihat riwayat di sini
                </p>
                <Button asChild size="default">
                  <Link href="/dashboard/prediksi">
                    <Plus className="h-4 w-4 mr-2" />
                    Mulai Assessment
                  </Link>
                </Button>
              </div>
            ) : (
              <AssessmentTable 
                assessments={assessments} 
                onDelete={handleDelete}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}