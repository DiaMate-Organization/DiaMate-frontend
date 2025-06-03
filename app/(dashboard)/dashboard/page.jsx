"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Activity } from "lucide-react";
import { fetchOverview } from "@/lib/overview-actions";
import { fetchAssessments } from "@/lib/assessment-actions";
import { toast } from "sonner";
import { OverviewChart } from "@/components/assessment/OverviewChart";
import LatestAssessments from "@/components/assessment/LatestAssessment";

export default function DashboardPage() {
  const [overviewData, setOverviewData] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch overview data and assessments in parallel
        const [overviewResult, assessmentsResult] = await Promise.all([
          fetchOverview(),
          fetchAssessments()
        ]);

        if (overviewResult.error) {
          toast.error(overviewResult.message);
          setOverviewData({});
        } else {
          setOverviewData(overviewResult.chart_data || {});
        }

        if (assessmentsResult.error) {
          toast.error(assessmentsResult.message);
          setAssessments([]);
        } else {
          setAssessments(assessmentsResult.data || []);
        }
      } catch (error) {
        toast.error("Gagal memuat data dashboard");
        console.error("Dashboard error:", error);
        setOverviewData({});
        setAssessments([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Dashboard
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Selamat datang di sistem prediksi risiko diabetes
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto" size="default">
            <Link href="/dashboard/prediksi">
              <Plus className="h-4 w-4 mr-2" />
              <span className="text-sm sm:text-base">Penilaian Baru</span>
            </Link>
          </Button>
        </div>

        {/* Stats Cards - Optional, bisa ditambahkan nanti */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-card text-card-foreground rounded-lg border p-4 sm:p-6">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <h3 className="text-sm sm:text-base font-medium">Total Assessment</h3>
              </div>
              <p className="text-2xl sm:text-3xl font-bold mt-2">{assessments.length}</p>
            </div>
            
            <div className="bg-card text-card-foreground rounded-lg border p-4 sm:p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                <h3 className="text-sm sm:text-base font-medium">Bulan Ini</h3>
              </div>
              <p className="text-2xl sm:text-3xl font-bold mt-2">
                {assessments.filter(a => {
                  const assessmentDate = new Date(a.created_at || a.date);
                  const now = new Date();
                  return assessmentDate.getMonth() === now.getMonth() && 
                         assessmentDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>

            <div className="bg-card text-card-foreground rounded-lg border p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 sm:h-5 sm:w-5 bg-yellow-500 rounded-full"></div>
                <h3 className="text-sm sm:text-base font-medium">Terakhir Dinilai</h3>
              </div>
              <p className="text-sm sm:text-base font-medium mt-2 text-muted-foreground">
                {assessments.length > 0 
                  ? assessments.sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date))[0].date
                  : "Belum ada assessment"
                }
              </p>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:gap-8">
          {/* Overview Chart */}
          <div className="w-full">
            <OverviewChart 
              chartData={overviewData} 
              loading={loading} 
            />
          </div>

          {/* Latest Assessments */}
          <div className="w-full">
            <LatestAssessments 
              assessments={assessments} 
              loading={loading} 
            />
          </div>
        </div>

        {/* Quick Actions - Mobile Friendly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <Button asChild variant="outline" size="lg" className="h-auto p-4">
            <Link href="/dashboard/assessment" className="flex flex-col items-center space-y-2">
              <Plus className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium text-sm sm:text-base">Mulai Assessment</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Lakukan penilaian risiko baru</div>
              </div>
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="h-auto p-4">
            <Link href="/dashboard/riwayat" className="flex flex-col items-center space-y-2">
              <Activity className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium text-sm sm:text-base">Lihat Riwayat</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Semua assessment sebelumnya</div>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}