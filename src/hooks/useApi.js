// frontend/src/hooks/useApi.js
import { useState, useCallback } from 'react';
import { apiMethods } from '../services/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET request
  const get = useCallback(async (url, config = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiMethods.get(url, config);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // POST request
  const post = useCallback(async (url, data = {}, config = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiMethods.post(url, data, config);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // PUT request
  const put = useCallback(async (url, data = {}, config = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiMethods.put(url, data, config);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // PATCH request
  const patch = useCallback(async (url, data = {}, config = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiMethods.patch(url, data, config);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // DELETE request
  const del = useCallback(async (url, config = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiMethods.delete(url, config);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Upload file
  const upload = useCallback(async (url, formData, onProgress = null) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiMethods.upload(url, formData, onProgress);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Download file
  const download = useCallback(async (url, filename) => {
    try {
      setLoading(true);
      setError(null);
      await apiMethods.download(url, filename);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    get,
    post,
    put,
    patch,
    delete: del,
    upload,
    download,
    clearError
  };
};