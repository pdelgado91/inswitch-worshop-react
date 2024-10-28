import { useEffect, useState } from "react";
import { axiosInstance, getAccessToken } from "../utils/genericOps";

export default function useGetBalance(entityId: number) {
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getBalance = async () => {
      setLoading(true);
      try {
        const token = await getAccessToken();
        const entityBalanceRequest = await axiosInstance.get(
          `${import.meta.env.VITE_PUBLIC_API_WALLET}/entityid%40${entityId}/balance`,
          {
            headers: {
              "X-User-Bearer": `Bearer ${token}`,
            },
          }
        );
        setBalance(entityBalanceRequest.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getBalance();
  }, []);

  return {
    balance,
    loading,
    error,
  };
}
