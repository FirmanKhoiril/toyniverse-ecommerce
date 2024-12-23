import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../service/firebase";

export default function useGetDetailProduct(id) {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: async () => {
      const productDoc = doc(db, "products", id);
      const productSnapshot = await getDoc(productDoc);
      return { id: productSnapshot.id, ...productSnapshot.data() };
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError, error, isSuccess };
}
