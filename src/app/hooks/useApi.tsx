import { useState, useEffect, useCallback } from "react";
import { useModal } from "@contexts/modal-context";

interface UseApiProps {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: HeadersInit;
}

interface UseApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetchData: () => void;
}

export function useApi<T>({
  url,
  method = "GET",
  body = null,
  headers = {},
}: UseApiProps): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showModal } = useModal();

  const fetchData = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      const message = result.message ?? "Request successful";
      showModal("Success", message, "success");
    } catch (err: any) {
      const message = err.message ?? "An error occurred";
      setError(message);
      showModal("Error", message, "error");
    } finally {
      setLoading(false);
    }
  }, [url, method, body, headers, showModal]);

  return { data, error, loading, fetchData };
}
