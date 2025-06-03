import api from "./api";
import { assessmentSchema } from "./assessment-validation";

export const createAssessment = async (payload) => {
  try {
    const validationResult = assessmentSchema.validate(payload.input_features, { abortEarly: false });
    if (validationResult.error) {
      const errorMessages = validationResult.error.details
        .map((detail) => detail.message)
        .join(", ");
      return { error: true, message: errorMessages };
    }

    const response = await api.post("/assessment", payload);
    return {
      error: false,
      message: "Penilaian berhasil disimpan!",
      data: response.data,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Gagal menyimpan penilaian";
    return { error: true, message: errorMessage };
  }
};

export const fetchAssessments = async () => {
  try {
    const response = await api.get("/assessment");
    return {
      error: false,
      data: response.data.data.map((item) => ({
        ...item,
        date: new Date(item.created_at).toLocaleDateString("id-ID", {
          timeZone: "Asia/Jakarta",
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }),
      })),
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Gagal mengambil riwayat";
    return { error: true, message: errorMessage };
  }
};

export const fetchAssessmentById = async (id) => {
  try {
    const response = await api.get(`/assessment/${id}`);
    return {
      error: false,
      data: {
        ...response.data.data,
        date: new Date(response.data.data.created_at).toLocaleDateString("id-ID", {
          timeZone: "Asia/Jakarta",
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }),
      },
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Gagal mengambil detail assessment";
    return { error: true, message: errorMessage };
  }
};

export const deleteAssessment = async (id) => {
  try {
    await api.delete(`/assessment/${id}`);
    return {
      error: false,
      message: "Assessment berhasil dihapus!",
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Gagal menghapus assessment";
    return { error: true, message: errorMessage };
  }
};