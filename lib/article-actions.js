import api from "./api";

export const getAllArticles = async () => {
  try {
    const response = await api.get("/article");
    return {
      error: false,
      message: "Artikel berhasil di dapatkan",
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

export const getArticleBySlug = async (slug) => {
  try {
    const response = await api.get(`/article/${slug}`);
    return {
      error: false,
      message: "Artikel berhasil di dapatkan",
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
