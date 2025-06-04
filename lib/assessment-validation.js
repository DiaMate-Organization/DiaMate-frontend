import Joi from "joi";

export const assessmentSchema = Joi.object({
  HighBP: Joi.number().integer().min(0).max(1).required().messages({
    "number.base": "Tekanan darah tinggi harus berupa pilihan valid",
    "number.min": "Tekanan darah tinggi harus 'Ya' atau 'Tidak'",
    "number.max": "Tekanan darah tinggi harus 'Ya' atau 'Tidak'",
    "any.required": "Tekanan darah tinggi wajib diisi",
  }),
  HighChol: Joi.number().integer().min(0).max(1).required().messages({
    "number.base": "Kolesterol tinggi harus berupa pilihan valid",
    "number.min": "Kolesterol tinggi harus 'Ya' atau 'Tidak'",
    "number.max": "Kolesterol tinggi harus 'Ya' atau 'Tidak'",
    "any.required": "Kolesterol tinggi wajib diisi",
  }),
  BMI: Joi.number().integer().min(10).max(50).required().messages({
    "number.base": "BMI harus berupa angka",
    "number.min": "BMI harus antara 10 dan 50",
    "number.max": "BMI harus antara 10 dan 50",
    "any.required": "Berat dan tinggi badan wajib diisi",
  }),
  HeartDiseaseorAttack: Joi.number()
    .integer()
    .min(0)
    .max(1)
    .required()
    .messages({
      "number.base": "Penyakit jantung harus berupa pilihan valid",
      "number.min": "Penyakit jantung harus 'Ya' atau 'Tidak'",
      "number.max": "Penyakit jantung harus 'Ya' atau 'Tidak'",
      "any.required": "Penyakit jantung wajib diisi",
    }),
  GenHlth: Joi.number().integer().min(1).max(5).required().messages({
    "number.base": "Kesehatan umum harus berupa pilihan valid",
    "number.min": "Kesehatan umum harus antara Sangat Sehat dan Sakit",
    "number.max": "Kesehatan umum harus antara Sangat Sehat dan Sakit",
    "any.required": "Kesehatan umum wajib diisi",
  }),
  PhysHlth: Joi.number().integer().min(0).max(30).required().messages({
    "number.base": "Kesehatan fisik harus berupa angka",
    "number.min": "Kesehatan fisik harus antara 0-30 hari",
    "number.max": "Kesehatan fisik harus antara 0-30 hari",
    "any.required": "Kesehatan fisik wajib diisi",
  }),
  DiffWalk: Joi.number().integer().min(0).max(1).required().messages({
    "number.base": "Kesulitan berjalan harus berupa pilihan valid",
    "number.min": "Kesulitan berjalan harus 'Ya' atau 'Tidak'",
    "number.max": "Kesulitan berjalan harus 'Ya' atau 'Tidak'",
    "any.required": "Kesulitan berjalan wajib diisi",
  }),
  Age: Joi.number().integer().min(1).max(13).required().messages({
    "number.base": "Usia harus berupa pilihan valid",
    "number.min": "Usia harus antara 18-24 hingga 80 tahun ke atas",
    "number.max": "Usia harus antara 18-24 hingga 80 tahun ke atas",
    "any.required": "Usia wajib diisi",
  }),
  Education: Joi.number().integer().min(1).max(6).required().messages({
    "number.base": "Pendidikan harus berupa pilihan valid",
    "number.min": "Pendidikan harus antara Tidak Sekolah dan Perguruan Tinggi",
    "number.max": "Pendidikan harus antara Tidak Sekolah dan Perguruan Tinggi",
    "any.required": "Pendidikan wajib diisi",
  }),
  Income: Joi.number().integer().min(1).max(3).required().messages({
    "number.base": "Pendapatan harus berupa pilihan valid",
    "number.min": "Pendapatan harus antara Sangat Rendah dan Paling Tinggi",
    "number.max": "Pendapatan harus antara Sangat Rendah dan Paling Tinggi",
    "any.required": "Pendapatan wajib diisi",
  }),
});
