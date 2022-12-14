import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}
type UseMutationResult = [(data: any) => void, UseMutationState];

export default function useMutation(url: string): UseMutationResult {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | object>(undefined);
  const [error, setError] = useState<undefined | object>(undefined);
  function mutation(data: any) {}
  return [mutation, { loading, data, error }];
}
