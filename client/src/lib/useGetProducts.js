import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import { useGet } from "./useGet";

export const useGetProducts = () => {
  const fetchProducts = useStore((state) => state.fetchProducts);
  const { data, isLoading, refetch } = useGet("/products", ["products"])

  useEffect(() => {
    if (data) {
      fetchProducts(data.products);
    }
  }, [fetchProducts, data]);

  return {
    loading: isLoading,
    refetch
  };
}