import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../service/firebase";
import { useSelector } from "react-redux";

export default function useGetCartByUserId() {
  const {userId} = useSelector((state) => state.global)

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {

      const cartProductCollection = collection(db, "cartProduct");
      const q = query(cartProductCollection, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError, error, isSuccess };
}
