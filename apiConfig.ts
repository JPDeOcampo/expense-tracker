const API_USER_URL = `/api/users`;
const API_INCOME_URL = `/api/income`;
const API_EXPENSE_URL = `/api/expense`;

export const ENDPOINTS = {
  register: `${API_USER_URL}/register`,
  login: `${API_USER_URL}/login`,
  updateProfile: `${API_USER_URL}/updateProfile`,
  updatePassword: `${API_USER_URL}/updatePassword`,
  deleteAccount: `${API_USER_URL}/deleteAccount`,
  logout: `${API_USER_URL}/logout`,

  add_income: `${API_INCOME_URL}/add-income`,
  fetch_income: `${API_INCOME_URL}/fetch-income`,

  add_expense: `${API_EXPENSE_URL}/add-expense`,
  fetch_expense: `${API_EXPENSE_URL}/fetch-expense`,
  dashboard: `api/dashboard`,
};
