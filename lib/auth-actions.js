import api from "./api";
import { registerSchema, loginSchema } from "./auth-validator";

export const register = async (prevState, formData) => {
  try {
    // console.log("FormData received:", Object.fromEntries(formData.entries())); // Debugging

    const rawData = {
      first_name: formData.get("first-name"),
      last_name: formData.get("last-name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm-password"),
      age: formData.get("age"),
      gender: formData.get("gender"),
    };

    // console.log("Raw data extracted:", rawData); // Debugging

    // Validasi data
    const { error, value } = registerSchema.validate(
      {
        fullname: `${rawData.first_name} ${rawData.last_name}`,
        email: rawData.email,
        password: rawData.password,
        confirmPassword: rawData.confirm_password,
        age: rawData.age,
        gender: rawData.gender,
      },
      { abortEarly: false }
    );

    // console.log("Validation result:", { error, value }); // Debugging

    if (error) {
      const errorMessages = error.details
        .map((detail) => detail.message)
        .join(", ");
      // console.error("Validation errors:", errorMessages); // Debugging
      return { error: true, message: errorMessages };
    }

    // Konversi age ke number
    const age = parseInt(rawData.age);
    if (isNaN(age) || age < 1) {
      const message = "Umur harus berupa angka lebih dari 0";
      // console.error("Age validation failed:", message); // Debugging
      return { error: true, message };
    }

    const payload = {
      fullname: `${rawData.first_name} ${rawData.last_name}`,
      email: rawData.email,
      password: rawData.password,
      age: age,
      gender: rawData.gender,
    };

    // console.log("Payload to API:", payload); // Debugging

    const response = await api.post("/register", payload);
    // console.log("API Response:", response.data); // Debugging

    return {
      error: false,
      message: "Pendaftaran berhasil!",
      data: response.data,
    };
  } catch (error) {
    // console.error("Registration failed:", {
    //   error: error.response?.data || error.message,
    //   stack: error.stack,
    // }); // Debugging lengkap

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Terjadi kesalahan saat mendaftar";

    return {
      error: true,
      message: errorMessage,
    };
  }
};

import { setAuthToken } from './setAuthToken';

export const login = async (prevState, formData) => {
  try {
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const { error } = loginSchema.validate(data, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message).join(', ');
      return { error: true, message: errorMessages };
    }

    const response = await api.post('/login', data);

    if (response.data.token) {
      setAuthToken(response.data.token);
    }

    return {
      error: false,
      message: 'Login berhasil',
      data: response.data,
    };
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || 'Email atau password salah',
    };
  }
};


export const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Gagal mengambil data profil",
    };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  document.cookie = "token=; Max-Age=0; path=/; SameSite=Strict";
};

