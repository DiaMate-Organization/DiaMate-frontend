import api from "./api";

export const getAllArticles = async () => {
  try {
    const response = await api.get("/article");
    return {
      error: false,
      message: "Penilaian berhasil disimpan!",
      data: response.data,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Error mendapatkan data article";
    return { error: true, message: errorMessage };
  }
};
