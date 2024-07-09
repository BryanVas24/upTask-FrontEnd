import { getUser } from "@/api/AuthApi";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    //evita que haga un refetch si te cambias de ventana
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading };
};
