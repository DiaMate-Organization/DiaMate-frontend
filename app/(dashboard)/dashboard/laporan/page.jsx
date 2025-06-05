"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Users,
  AlertTriangle,
  Activity,
  Shield,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";

import { Progress } from "@/components/ui/progress";
import { fetchReport } from "@/lib/overview-actions";

const riskColors = {
  Rendah: "#10b981", // green
  Sedang: "#f59e0b", // amber
  Tinggi: "#ef4444", // red
};

const getRiskBadgeVariant = (risk) => {
  switch (risk) {
    case "Tinggi":
      return "destructive";
    case "Sedang":
      return "default";
    case "Rendah":
      return "secondary";
    default:
      return "outline";
  }
};

export default function AssessmentReportsPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [reportData, setReportData] = useState({
    error: true,
    generated_at: new Date().toISOString(),
    summary: {
      average_risk: "Rendah",
      most_common_risk_factors: [],
      total_assessments: 0,
    },
    chart: [],
    current_assessments: [],
    notes: [],
    message: "loading..",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReportData = async () => {
      try {
        const data = await fetchReport();
        console.log(data);
        setReportData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getReportData();
  }, []);

  const riskDistribution = reportData.chart.reduce(
    (acc, month) => {
      acc.Rendah += month.Rendah;
      acc.Sedang += month.Sedang;
      acc.Tinggi += month.Tinggi;
      return acc;
    },
    { Rendah: 0, Sedang: 0, Tinggi: 0 }
  );

  const pieData = Object.entries(riskDistribution).map(([key, value]) => ({
    name: key,
    value,
    color: riskColors[key],
  }));

  const totalAssessments = Object.values(riskDistribution).reduce(
    (a, b) => a + b,
    0
  );

  const exportToPDF = async () => {
    try {
      setIsExporting(true);

      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;

      const addText = (text, x, y, maxWidth) => {
        if (maxWidth) {
          const lines = pdf.splitTextToSize(text, maxWidth);
          pdf.text(lines, x, y);
          return lines.length * 5;
        } else {
          pdf.text(text, x, y);
          return 5;
        }
      };

      pdf.setFontSize(24);
      pdf.text("Assessment Report", margin, 30);

      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      const currentDate = new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      pdf.text(`Generated on: ${currentDate}`, margin, 40);

      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, 45, pageWidth - margin, 45);

      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text("Executive Summary", margin, 60);

      pdf.setFontSize(12);
      pdf.setTextColor(60, 60, 60);
      let yPos = 75;

      const summaryData = [
        `Total Assessments: ${totalAssessments}`,
        `Average Risk Level: ${reportData.summary.average_risk}`,
        `High Risk Cases: ${riskDistribution.Tinggi}`,
        `Medium Risk Cases: ${riskDistribution.Sedang}`,
        `Low Risk Cases: ${riskDistribution.Rendah}`,
        `Risk-Free Rate: ${Math.round(
          (riskDistribution.Rendah / totalAssessments) * 100
        )}%`,
      ];

      summaryData.forEach((item) => {
        pdf.text(item, margin, yPos);
        yPos += 8;
      });

      yPos += 10;
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text("Risk Level Distribution", margin, yPos);
      yPos += 10;

      pdf.setFontSize(12);
      pdf.setTextColor(60, 60, 60);
      pieData.forEach((item) => {
        const percentage = ((item.value / totalAssessments) * 100).toFixed(1);
        pdf.text(
          `${item.name}: ${item.value} cases (${percentage}%)`,
          margin,
          yPos
        );
        yPos += 8;
      });

      pdf.addPage();
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text("Recent Assessments", margin, 30);

      yPos = 45;
      pdf.setFontSize(12);

      reportData.current_assessments.forEach((assessment, index) => {
        if (yPos > pageHeight - 40) {
          pdf.addPage();
          yPos = 30;
        }

        pdf.setTextColor(0, 0, 0);
        pdf.text(`Assessment ${index + 1}`, margin, yPos);
        yPos += 8;

        pdf.setTextColor(60, 60, 60);
        const assessmentDate = new Date(assessment.date).toLocaleDateString(
          "id-ID"
        );
        pdf.text(`Date: ${assessmentDate}`, margin + 5, yPos);
        yPos += 6;

        if (assessment.risk_level === "Tinggi") {
          pdf.setTextColor(239, 68, 68);
        } else if (assessment.risk_level === "Sedang") {
          pdf.setTextColor(245, 158, 11);
        } else {
          pdf.setTextColor(16, 185, 129);
        }
        pdf.text(`Risk Level: ${assessment.risk_level}`, margin + 5, yPos);
        yPos += 6;

        pdf.setTextColor(60, 60, 60);
        const factorsText = `Risk Factors: ${
          assessment.risk_factors.length > 0
            ? assessment.risk_factors.join(", ")
            : "Tidak ada faktor Risiko yang membahayakan"
        }`;
        const factorsHeight = addText(
          factorsText,
          margin + 5,
          yPos,
          pageWidth - margin * 2 - 5
        );
        yPos += factorsHeight + 5;
      });

      pdf.addPage();
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text("Key Insights & Recommendations", margin, 30);

      yPos = 45;
      pdf.setFontSize(12);
      pdf.setTextColor(60, 60, 60);

      reportData.notes.forEach((note, index) => {
        if (yPos > pageHeight - 30) {
          pdf.addPage();
          yPos = 30;
        }

        const noteText = `${index + 1}. ${note}`;
        const noteHeight = addText(
          noteText,
          margin,
          yPos,
          pageWidth - margin * 2
        );
        yPos += noteHeight + 8;
      });

      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 40, pageHeight - 10);
        pdf.text("Health Assessment Report", margin, pageHeight - 10);
      }

      const fileName = `Assessment_Report_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      pdf.save(fileName);

      //   toast({
      //     title: "Export successful",
      //     description: "Your assessment report has been downloaded as a PDF.",
      //   });
    } catch (error) {
      console.error("PDF export failed:", error);
      //   toast({
      //     title: "Export failed",
      //     description:
      //       "There was an error generating your PDF. Please try again.",
      //     variant: "destructive",
      //   });
    } finally {
      setIsExporting(false);
    }
  };

  return loading ? (
    <p>Loading....</p>
  ) : (
    <div id="assessment-dashboard" className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Laporan Penilaian
          </h1>
          <p className="text-muted-foreground">
            Analisis komprehensif tentang penilaian risiko kesehatan
          </p>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button size="sm" onClick={exportToPDF} disabled={isExporting}>
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export PDF"}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Penilaian
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalAssessments.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tingkat risiko rata-rata
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportData.summary.average_risk}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Kasus Berisiko Tinggi
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {riskDistribution.Tinggi}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tingkat bebas risiko
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((riskDistribution.Rendah / totalAssessments) * 100)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-6">
        {/* Monthly Trends Chart */}
        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Tren Penilaian Risiko Bulanan</CardTitle>
            <CardDescription>Distribusi tingkat risiko</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                Rendah: { label: "Low Risk", color: riskColors.Rendah },
                Sedang: { label: "Medium Risk", color: riskColors.Sedang },
                Tinggi: { label: "High Risk", color: riskColors.Tinggi },
              }}
              className="h-[300px] w-full trends-chart"
            >
              <BarChart data={reportData.chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickFormatter={(value) => {
                    const date = new Date(value + "-01");
                    return date.toLocaleDateString("id-ID", { month: "short" });
                  }}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="Rendah"
                  stackId="a"
                  fill={riskColors.Rendah}
                  radius={[0, 0, 4, 4]}
                />
                <Bar dataKey="Sedang" stackId="a" fill={riskColors.Sedang} />
                <Bar
                  dataKey="Tinggi"
                  stackId="a"
                  fill={riskColors.Tinggi}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution Pie Chart */}
        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Distribusi Tingkat Risiko</CardTitle>
            <CardDescription>
              Distribusi keseluruhan dari semua penilaian
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                Rendah: { label: "Low Risk", color: riskColors.Rendah },
                Sedang: { label: "Medium Risk", color: riskColors.Sedang },
                Tinggi: { label: "High Risk", color: riskColors.Tinggi },
              }}
              className="h-[300px] w-full distribution-chart"
            >
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0];
                      const percentage = (
                        (data.value / totalAssessments) *
                        100
                      ).toFixed(1);
                      return (
                        <div className="bg-background border rounded-lg shadow-lg p-3">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {data.value} assessments ({percentage}%)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ChartContainer>
            <div className="flex justify-center gap-4 mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Assessments */}
        <Card>
          <CardHeader>
            <CardTitle>Penilaian Terbaru</CardTitle>
            <CardDescription>Penilaian terbaru dan detailnya</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.current_assessments.length > 0 ? (
                reportData.current_assessments
                  .slice(0, 5)
                  .map((assessment, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(assessment.date).toLocaleDateString(
                              "id-ID"
                            )}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {assessment.risk_factors.length > 0 ? (
                            assessment.risk_factors.map((factor, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {factor}
                              </Badge>
                            ))
                          ) : (
                            <p className="text-muted-foreground text-sm">
                              Tidak ada faktor Risiko yang membahayakan
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant={getRiskBadgeVariant(assessment.risk_level)}
                      >
                        {assessment.risk_level}
                      </Badge>
                    </div>
                  ))
              ) : (
                <p className="mt-5 font-bold text-center text-sm text-muted-foreground">
                  Belum ada penilaian yang tersimpan{" "}
                </p>
              )}
              {}
            </div>
          </CardContent>
        </Card>

        {/* Risk Factors Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Faktor Risiko Teratas</CardTitle>
            <CardDescription>
              Faktor risiko yang paling umum di seluruh penilaian
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.summary.most_common_risk_factors.length > 0 ? (
                reportData.summary.most_common_risk_factors.map(
                  (factor, index) => {
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{factor.name}</span>
                          <span className="text-muted-foreground">
                            {factor.percentage} %
                          </span>
                        </div>
                        <Progress value={factor.percentage} className="h-2" />
                      </div>
                    );
                  }
                )
              ) : (
                <p className="mt-5 font-bold text-center text-sm text-muted-foreground">
                  Belum ada penilaian yang tersimpan{" "}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights and Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Rekomendasi dan Insight
          </CardTitle>
          <CardDescription>
            Insights berdasarkan dari penilaian dan data analisis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Observasi Kritikal
              </h4>
              {reportData.notes.slice(0, 3).map((note, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <p className="text-sm">{note}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Rekomendasi Aksi
              </h4>
              {reportData.notes.slice(3).map((note, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p className="text-sm">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          Report generated on{" "}
          {new Date(reportData.generated_at).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
