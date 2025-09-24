// frontend/src/services/authService.js
import api from './api';

export const authService = {
  // Login de usuario
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Registro de usuario
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Verificar token
  verifyToken: async (token) => {
    try {
      const response = await api.get('/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar perfil
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Cambiar contraseña
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Solicitar restablecimiento de contraseña
  requestPasswordReset: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', {
        email
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Restablecer contraseña
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        newPassword
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Logout (invalidar token en el servidor)
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response;
    } catch (error) {
      throw error;
    }
  }
};