"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
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
  <Card className="w-full">
    <CardHeader className="pb-4">
      <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
        <div className="space-y-2 flex-1">
          <div className="h-5 sm:h-6 w-32 sm:w-48 bg-muted animate-pulse rounded" />
          <div className="h-3 sm:h-4 w-48 sm:w-64 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-9 sm:h-10 w-24 sm:w-32 bg-muted animate-pulse rounded shrink-0" />
      </div>
    </CardHeader>
    <CardContent className="px-3 sm:px-6 pt-2 sm:pt-4">
      <div className="aspect-[4/3] sm:aspect-auto sm:h-[280px] w-full bg-muted animate-pulse rounded" />
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

  // Custom tick formatter for mobile
  const formatXAxisTick = (value) => {
    const date = parseMonthYear(value);
    if (isMobile) {
      // Show only month abbreviation on mobile
      return date.toLocaleDateString("id-ID", {
        month: "short",
        timeZone: "Asia/Jakarta"
      });
    } else {
      // Show month and year on desktop
      return date.toLocaleDateString("id-ID", {
        month: "short",
        year: "numeric",
        timeZone: "Asia/Jakarta"
      });
    }
  };

  // Custom tooltip formatter
  const formatTooltipLabel = (value) => {
    const date = parseMonthYear(value);
    return date.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta"
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
          <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl leading-tight">
              Tren Risiko Diabetes
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm lg:text-base text-muted-foreground">
              Jumlah penilaian risiko diabetes per bulan
            </CardDescription>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[120px] shrink-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full h-8 sm:h-9 text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs sm:text-sm">Semua</SelectItem>
                <SelectItem value="6m" className="text-xs sm:text-sm">6 Bulan</SelectItem>
                <SelectItem value="3m" className="text-xs sm:text-sm">3 Bulan</SelectItem>
                <SelectItem value="1m" className="text-xs sm:text-sm">1 Bulan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-3 sm:px-4 lg:px-6 pt-2 sm:pt-4">
        {filteredData.length === 0 ? (
          <div className="aspect-[4/3] sm:aspect-auto sm:h-[280px] w-full flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-2 px-4">
              <p className="text-sm sm:text-base font-medium">Tidak ada data untuk periode ini</p>
              <p className="text-xs sm:text-sm">Silakan pilih rentang waktu yang berbeda</p>
              {formattedData.length > 0 && (
                <p className="text-xs mt-3 text-gray-400 break-all">
                  Data tersedia: {formattedData.map(d => d.month).join(', ')}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full">
            <ChartContainer 
              config={chartConfig} 
              className="aspect-[4/3] sm:aspect-auto sm:h-[280px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={filteredData}
                  margin={{
                    top: 10,
                    right: isMobile ? 10 : 20,
                    left: isMobile ? 10 : 20,
                    bottom: isMobile ? 20 : 10,
                  }}
                >
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
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="hsl(var(--border))"
                    strokeOpacity={0.3}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={formatXAxisTick}
                    fontSize={isMobile ? 10 : 12}
                    interval={isMobile && filteredData.length > 4 ? 1 : 0}
                    angle={isMobile ? -45 : 0}
                    textAnchor={isMobile ? "end" : "middle"}
                    height={isMobile ? 60 : 40}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={isMobile ? 10 : 12}
                    width={isMobile ? 35 : 45}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={formatTooltipLabel}
                        indicator="dot"
                        className="w-auto max-w-[200px] sm:max-w-none"
                      />
                    }
                  />
                  <Area
                    dataKey="rendah"
                    type="monotone"
                    fill="url(#fillRendah)"
                    stroke="var(--chart-1)"
                    strokeWidth={isMobile ? 1.5 : 2}
                    stackId="a"
                  />
                  <Area
                    dataKey="sedang"
                    type="monotone"
                    fill="url(#fillSedang)"
                    stroke="var(--chart-2)"
                    strokeWidth={isMobile ? 1.5 : 2}
                    stackId="a"
                  />
                  <Area
                    dataKey="tinggi"
                    type="monotone"
                    fill="url(#fillTinggi)"
                    stroke="var(--chart-3)"
                    strokeWidth={isMobile ? 1.5 : 2}
                    stackId="a"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}