import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { db } from "../service/firebase";
import { setFormEditProduct } from "../store/globalSlice";

export const useGetTrackProductById = (id) => {
  const dispatch = useDispatch();
  const {isError, data: product} = useQuery(
    ["product", id],
    async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      const productData = { id: docSnap.id, ...docSnap.data() };
      dispatch(
        setFormEditProduct({
          name: productData.name || "",
          price: productData.price || "",
          description: productData.description || "",
          image: productData.image || "",
          category: productData.category || ""
        })
      );
      return productData;
    },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  );
  return {
    isError, product
  }
};
