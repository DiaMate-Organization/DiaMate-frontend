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
      message: "Berhasil mengambil data overview"
    };
  } catch (error) {
    const errorMessage = 
      error.response?.data?.message || error.message || "Gagal mengambil data overview";
    return {
      error: true,
      message: errorMessage,
      chart_data: {},
      total_assessments: 0,
      average_risk: "Rendah",
      current_assessments: []
    };
  }
};