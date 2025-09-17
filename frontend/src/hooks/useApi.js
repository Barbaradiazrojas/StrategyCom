import { useState } from 'react';
import { toast } from 'react-toastify';

export default function useApi(apiFunc) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (...args) => {
    setLoading(true);
    try {
      const result = await apiFunc(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      toast.error(err.message || "Error en la operación");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request };
}
