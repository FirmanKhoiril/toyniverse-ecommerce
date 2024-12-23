import { getDocs, collection } from "firebase/firestore";
import { db } from "../service/firebase";
import { useQuery } from "@tanstack/react-query";

export default function useGetSearchResult({ searchTerm }) {
  const productToyCollection = collection(db, "products");

  const getProductToyList = async () => {
    const data = await getDocs(productToyCollection);
    const filterData = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((product) =>
        searchTerm
          ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      );

    return filterData;
  };

  const {
    data: productList,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["productToys", searchTerm],
    queryFn: getProductToyList,
    refetchOnWindowFocus: false,
  });

  return {
    productList,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  };
}
