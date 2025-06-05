import api from "./api";

export const fetchOverview = async () => {
  try {
    const response = await api.get("/overview");
    return {
      error: false,
      // Fix: API returns 'chart' inside 'overview', not 'chart_data'
      chart_data: response.data.overview?.chart || {},
      total_assessments: response.data.overview?.total_assessments || 0,
      average_risk: response.data.overview?.average_risk || "Rendah",
      current_assessments: response.data.overview?.current_assessments || [],
      message: "Berhasil mengambil data overview",
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Gagal mengambil data overview";
    return {
      error: true,
      message: errorMessage,
      chart_data: {},
      total_assessments: 0,
      average_risk: "Rendah",
      current_assessments: [],
    };
  }
};

export const fetchReport = async () => {
  try {
    const response = await api.get("/report");
    const chartArray = Object.entries(response.data.report.chart).map(
      ([bulan, nilai]) => ({
        bulan,
        ...nilai,
      })
    );

    const total = response.data.report?.summary.most_common_risk_factors.reduce(
      (sum, item) => sum + item.count,
      0
    );

    const commonRiskFactorWithPercentage =
      response.data.report?.summary.most_common_risk_factors.map((item) => ({
        ...item,
        percentage: ((item.count / total) * 100).toFixed(1),
      }));

    return {
      error: false,
      generated_at: new Date().toISOString(),
      summary: {
        average_risk: response.data.report?.summary.average_risk,
        most_common_risk_factors: commonRiskFactorWithPercentage,
        total_assessments: response.data.report?.summary.total_assessments,
      },
      chart: chartArray,
      current_assessments: response.data.report?.current_assessments,
      notes: response.data.report?.notes,
      message: "Berhasil mengambil data report",
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Gagal mengambil data overview";

    return {
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
      message: errorMessage,
    };
  }
};
