import { getDocs, collection, query, where } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { db } from "../service/firebase";
import { useSelector } from "react-redux";

export default function useGetProductByUserId() {
  const {userId} = useSelector((state) => state.global)
  const fetchUserProducts = async () => {
    
    const productQuery = query(
      collection(db, "products"),
      where("userId", "==", userId)
    );

    const data = await getDocs(productQuery);
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  };

  const {
    data: userProducts,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["userProducts", userId],
    queryFn: fetchUserProducts,
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

  return {
    userProducts,
    isLoading,
    isError,
    isSuccess,
    error,
  };
}
