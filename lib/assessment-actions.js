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
        date: new Date(item.created_at).toLocaleString("id-ID", {
          timeZone: "Asia/Jakarta",
        }),
      })),
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Gagal mengambil riwayat";
    return { error: true, message: errorMessage };
  }
};