import Joi from 'joi';

export const registerSchema = Joi.object({
  fullname: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Nama lengkap harus diisi',
    'string.min': 'Nama lengkap minimal 3 karakter',
    'any.required': 'Nama lengkap harus diisi'
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Email tidak valid',
    'string.empty': 'Email harus diisi',
    'any.required': 'Email harus diisi'
  }),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.min': 'Password minimal 6 karakter',
      'string.pattern.base': 'Password harus mengandung minimal 1 huruf besar, 1 huruf kecil, dan 1 angka',
      'string.empty': 'Password harus diisi',
      'any.required': 'Password harus diisi'
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Konfirmasi password tidak sama dengan password',
      'any.required': 'Konfirmasi password harus diisi'
    }),
  age: Joi.number().integer().min(1).max(120).required().messages({
    'number.base': 'Umur harus berupa angka',
    'number.min': 'Umur minimal 1 tahun',
    'number.max': 'Umur maksimal 120 tahun',
    'any.required': 'Umur harus diisi'
  }),
  gender: Joi.string().valid('Laki Laki', 'Perempuan').required().messages({
    'any.only': 'Pilih jenis kelamin yang valid',
    'any.required': 'Jenis kelamin harus dipilih'
  })
}).with('password', 'confirmPassword');

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Email tidak valid',
    'string.empty': 'Email harus diisi',
    'any.required': 'Email harus diisi'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password harus diisi',
    'any.required': 'Password harus diisi'
  })
});