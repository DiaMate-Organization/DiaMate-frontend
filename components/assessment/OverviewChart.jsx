"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  rendah: {
    label: "Rendah",
    color: "var(--chart-1)",
  },
  sedang: {
    label: "Sedang",
    color: "var(--chart-2)",
  },
  tinggi: {
    label: "Tinggi",
    color: "var(--chart-3)",
  },
};

// Loading skeleton component
const ChartSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-10 w-40 bg-muted animate-pulse rounded" />
      </div>
    </CardHeader>
    <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
      <div className="aspect-auto h-[250px] w-full bg-muted animate-pulse rounded" />
    </CardContent>
  </Card>
);

const formatChartData = (chartData) => {
  if (!chartData || typeof chartData !== 'object') {
    return [];
  }
  
  return Object.keys(chartData)
    .map((month) => ({
      month,
      rendah: chartData[month]?.Rendah || 0,
      sedang: chartData[month]?.Sedang || 0,
      tinggi: chartData[month]?.Tinggi || 0,
    }))
    .sort((a, b) => {
      // Sort by month chronologically
      const dateA = new Date(a.month + '-01');
      const dateB = new Date(b.month + '-01');
      return dateA - dateB;
    });
};

const parseMonthYear = (monthString) => {
  // monthString format: "2025-05"
  if (monthString.includes('-')) {
    const [year, month] = monthString.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, 1);
  }
  
  // Fallback
  return new Date(monthString + '-01');
};

const getJakartaDate = () => {
  // Mendapatkan tanggal saat ini dalam zona waktu Jakarta (WIB)
  const now = new Date();
  const jakartaOffset = 7 * 60; // WIB adalah UTC+7
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const jakartaTime = new Date(utc + (jakartaOffset * 60000));
  return jakartaTime;
};

const filterDataByTimeRange = (data, timeRange) => {
  if (timeRange === "all" || data.length === 0) return data;
  
  // Menggunakan zona waktu Jakarta
  const now = getJakartaDate();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); 
  
  let monthsToShow;
  if (timeRange === "1m") {
    monthsToShow = 1;
  } else if (timeRange === "3m") {
    monthsToShow = 3;
  } else if (timeRange === "6m") {
    monthsToShow = 6;
  } else {
    return data;
  }
  
  // Filter data berdasarkan bulan terakhir
  return data.filter((item) => {
    const itemDate = parseMonthYear(item.month);
    const itemYear = itemDate.getFullYear();
    const itemMonth = itemDate.getMonth();
    
    // Hitung selisih bulan dari bulan saat ini
    const monthsDiff = (currentYear - itemYear) * 12 + (currentMonth - itemMonth);
    
    // Tampilkan data dalam rentang monthsToShow bulan terakhir (termasuk bulan sekarang)
    return monthsDiff >= 0 && monthsDiff < monthsToShow;
  });
};

export function OverviewChart({ chartData, loading = false }) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("6m");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("3m");
    }
  }, [isMobile]);

  // Show skeleton while loading
  if (loading || !chartData) {
    return <ChartSkeleton />;
  }

  const formattedData = formatChartData(chartData);
  const filteredData = filterDataByTimeRange(formattedData, timeRange);

  // Debug log
  // console.log('Chart Data:', chartData);
  // console.log('Formatted Data:', formattedData);
  // console.log('Filtered Data:', filteredData);
  // console.log('Time Range:', timeRange);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
          <div>
            <CardTitle className="text-xl sm:text-2xl">Tren Risiko Diabetes</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Jumlah penilaian risiko diabetes per bulan
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="6m">6 Bulan</SelectItem>
              <SelectItem value="3m">3 Bulan</SelectItem>
              <SelectItem value="1m">1 Bulan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        {filteredData.length === 0 ? (
          <div className="h-[250px] w-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-sm sm:text-base">Tidak ada data untuk periode ini</p>
              <p className="text-xs sm:text-sm mt-1">Silakan pilih rentang waktu yang berbeda</p>
              {/* Debug info - remove in production */}
              <p className="text-xs mt-2 text-gray-400">
                Data tersedia: {formattedData.map(d => d.month).join(', ')}
              </p>
            </div>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillRendah" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillSedang" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillTinggi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = parseMonthYear(value);
                  return date.toLocaleDateString("id-ID", {
                    month: "short",
                    year: isMobile ? undefined : "numeric",
                    timeZone: "Asia/Jakarta"
                  });
                }}
                fontSize={isMobile ? 10 : 12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={isMobile ? 10 : 12}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      const date = parseMonthYear(value);
                      return date.toLocaleDateString("id-ID", {
                        month: "long",
                        year: "numeric",
                        timeZone: "Asia/Jakarta"
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="rendah"
                type="monotone"
                fill="url(#fillRendah)"
                stroke="var(--chart-1)"
                stackId="a"
              />
              <Area
                dataKey="sedang"
                type="monotone"
                fill="url(#fillSedang)"
                stroke="var(--chart-2)"
                stackId="a"
              />
              <Area
                dataKey="tinggi"
                type="monotone"
                fill="url(#fillTinggi)"
                stroke="var(--chart-3)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}