import ResetPassword from "@/components/layout/reset-password";

const API_USER_URL = `/api/users`;
const API_INCOME_URL = `/api/income`;
const API_EXPENSE_URL = `/api/expense`;

export const ENDPOINTS = {
  register: `${API_USER_URL}/register`,
  login: `${API_USER_URL}/login`,
  forgotPassword: `${API_USER_URL}/forgot-password`,
  resetToken: `${API_USER_URL}/verify-reset-token`,
  resetPassword: `${API_USER_URL}/reset-password`,
  updateProfile: `${API_USER_URL}/updateProfile`,
  updatePassword: `${API_USER_URL}/updatePassword`,
  deleteAccount: `${API_USER_URL}/deleteAccount`,
  logout: `${API_USER_URL}/logout`,

  add_income: `${API_INCOME_URL}/add-income`,
  fetch_income: `${API_INCOME_URL}/fetch-income`,
  update_income: `${API_INCOME_URL}/update-income`,
  delete_income: `${API_INCOME_URL}/delete-income`,

  add_expense: `${API_EXPENSE_URL}/add-expense`,
  fetch_expense: `${API_EXPENSE_URL}/fetch-expense`,
  update_expense: `${API_EXPENSE_URL}/update-expense`,
  delete_expense: `${API_EXPENSE_URL}/delete-expense`,
  dashboard: `api/dashboard`,
};
