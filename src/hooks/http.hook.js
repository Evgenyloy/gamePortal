import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const request = useCallback(async (url, options) => {
    setError(false);
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(
          `Could not fetch ${url}, status: ${response.status}`,
          options
        );
      }

      const data = await response.json();
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);

      throw error;
    }
  }, []);

  return { loading, request, error };
};
