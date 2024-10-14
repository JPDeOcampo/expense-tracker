const API_USER_URL = `/api/users`;
const API_INCOME_URL = `/api/income`;

export const ENDPOINTS = {
    register: `${API_USER_URL}/register`,
    login: `${API_USER_URL}/login`,
    logout: `${API_USER_URL}/logout`,

    add_income: `${API_INCOME_URL}/add-income`,
    fetch_income: `${API_INCOME_URL}/fetch-income`,
    dashboard: `api/dashboard`,
}