import api from "./api";
import { registerSchema, loginSchema } from "./auth-validator";

export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    document.cookie = `token=${token}; Path=/; SameSite=Strict; Secure; Max-Age=3600`;
  }
};

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || null;
  }
  return null;
};

export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Auth actions
export const register = async (prevState, formData) => {
  try {
    const rawData = {
      first_name: formData.get("first-name"),
      last_name: formData.get("last-name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm-password"),
      age: formData.get("age"),
      gender: formData.get("gender"),
    };

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

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message).join(", ");
      return { error: true, message: errorMessages };
    }

    const age = parseInt(rawData.age);
    if (isNaN(age) || age < 1) {
      return { error: true, message: "Umur harus berupa angka lebih dari 0" };
    }

    const payload = {
      fullname: `${rawData.first_name} ${rawData.last_name}`,
      email: rawData.email,
      password: rawData.password,
      age: age,
      gender: rawData.gender,
    };

    const response = await api.post("/register", payload);
    return {
      error: false,
      message: "Pendaftaran berhasil!",
      data: response.data,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Terjadi kesalahan saat mendaftar";
    return { error: true, message: errorMessage };
  }
};

export const login = async (prevState, formData) => {
  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const { error } = loginSchema.validate(data, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message).join(", ");
      return { error: true, message: errorMessages };
    }

    const response = await api.post("/login", data);

    if (response.data.token) {
      setAuthToken(response.data.token);
    }

    return {
      error: false,
      message: "Login berhasil",
      data: response.data,
    };
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Email atau password salah",
    };
  }
};

export const getProfile = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await api.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw {
      error: true,
      message: error.response?.data?.message || "Gagal mengambil data profil",
    };
  }
};

export const logout = () => {
  removeAuthToken();
  window.location.href = "/login"; 
};