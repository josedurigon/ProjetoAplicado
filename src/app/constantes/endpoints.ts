export const API_BASE_URL = 'http://localhost:8086/api'; 

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    REFRESH: `${API_BASE_URL}/auth/refresh`
  },
  USER: {
    
    },
    EXPLOIT:{
      EXPLOIT: `${API_BASE_URL}/exploit/exploit`
    }
};
