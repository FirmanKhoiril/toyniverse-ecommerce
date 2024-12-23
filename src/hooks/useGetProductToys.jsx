import { getDocs, collection } from "firebase/firestore";
import { db } from "../service/firebase";
import { useQuery } from "@tanstack/react-query";

export default function useGetProductToys() {
  const getProductToyList = async () => {
    const data = await getDocs(productToyCollection);
    const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return filterData;
  };

  const {
    data: productList,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useQuery({ queryKey: ["productToys"], queryFn: getProductToyList, 
    refetchOnWindowFocus: false
   });

  const productToyCollection = collection(db, "products");

  return {
    productList,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  };
}
