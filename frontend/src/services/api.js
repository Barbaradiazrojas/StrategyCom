// frontend/src/services/api.js
import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage o del contexto de autenticación
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log de desarrollo
    if (import.meta.env.DEV ? "development" : "production" === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor de response para manejar errores globales
api.interceptors.response.use(
  (response) => {
    // Log de desarrollo
    if (import.meta.env.DEV ? "development" : "production" === 'development') {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.status);
    }

    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error);

    // Manejar diferentes tipos de errores
    if (error.response) {
      // El servidor respondió con un código de error
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Token expirado o no válido
          console.warn('🔐 Authentication error - redirecting to login');
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
          
          // Redirigir al login si no estamos ya ahí
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
          break;

        case 403:
          // Sin permisos
          console.warn('🚫 Access forbidden');
          break;

        case 404:
          // Recurso no encontrado
          console.warn('🔍 Resource not found');
          break;

        case 422:
          // Error de validación
          console.warn('📝 Validation error:', data);
          break;

        case 429:
          // Demasiadas requests
          console.warn('🐌 Rate limit exceeded');
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          // Errores del servidor
          console.error('🔥 Server error');
          break;

        default:
          console.error(`❓ Unexpected error: ${status}`);
      }

      // Agregar información del error para mejor debugging
      error.userMessage = data?.message || data?.error || getDefaultErrorMessage(status);
    } else if (error.request) {
      // La request se hizo pero no hubo respuesta
      console.error('🌐 Network error - no response received');
      error.userMessage = 'Error de conexión. Verifica tu conexión a internet.';
    } else {
      // Error en la configuración de la request
      console.error('⚙️ Request configuration error');
      error.userMessage = 'Error interno. Por favor intenta nuevamente.';
    }

    return Promise.reject(error);
  }
);

// Función helper para mensajes de error por defecto
function getDefaultErrorMessage(status) {
  const errorMessages = {
    400: 'Solicitud inválida',
    401: 'No autorizado - inicia sesión nuevamente',
    403: 'No tienes permisos para realizar esta acción',
    404: 'Recurso no encontrado',
    422: 'Los datos enviados no son válidos',
    429: 'Demasiadas solicitudes - intenta más tarde',
    500: 'Error interno del servidor',
    502: 'Error del servidor - intenta más tarde',
    503: 'Servicio no disponible',
    504: 'Tiempo de espera agotado'
  };

  return errorMessages[status] || 'Error desconocido';
}

// Funciones helper para requests comunes
export const apiHelpers = {
  // GET con manejo de caché
  async get(url, config = {}) {
    return api.get(url, config);
  },

  // POST con retry automático en caso de fallo
  async post(url, data, config = {}) {
    return api.post(url, data, config);
  },

  // PUT para actualizaciones
  async put(url, data, config = {}) {
    return api.put(url, data, config);
  },

  // PATCH para actualizaciones parciales
  async patch(url, data, config = {}) {
    return api.patch(url, data, config);
  },

  // DELETE con confirmación
  async delete(url, config = {}) {
    return api.delete(url, config);
  },

  // Upload de archivos
  async upload(url, file, onProgress = null) {
    const formData = new FormData();
    formData.append('file', file);

    return api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  },

  // Download de archivos
  async download(url, filename) {
    const response = await api.get(url, {
      responseType: 'blob',
    });

    // Crear enlace temporal para descargar
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

    return response;
  }
};

// Configuración para diferentes entornos
export const apiConfig = {
  development: {
    baseURL: 'http://localhost:5000/api',
    timeout: 30000,
  },
  production: {
    baseURL: 'https://your-production-api.com/api',
    timeout: 15000,
  },
  staging: {
    baseURL: 'https://staging-api.strategycom.com/api',
    timeout: 20000,
  }
};

// Función para actualizar configuración según el entorno
export const setApiConfig = (environment) => {
  const config = apiConfig[environment];
  if (config) {
    api.defaults.baseURL = config.baseURL;
    api.defaults.timeout = config.timeout;
  }
};

export default api;
