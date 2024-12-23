import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db } from "../service/firebase";
import { useDispatch } from "react-redux";
import { resetFormCreateProduct } from "../store/globalSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function useCreateNewProduct() {
  const navigate = useNavigate()
  const productToyCollection = collection(db, "products");
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const { mutate: createNewProductToy, isLoading } = useMutation({
    mutationFn: async (formCreateProduct) => {

      const sanitizedPrice = formCreateProduct.price.replace(/\./g, "");

      try {
        await addDoc(productToyCollection, {
          name: formCreateProduct.name,
          image: formCreateProduct.image,
          price: sanitizedPrice,
          category: formCreateProduct.category,
          description: formCreateProduct.description,
          userId: auth?.currentUser?.uid,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });

        toast.success("Product created successfully!");
        dispatch(resetFormCreateProduct());
        navigate("/products")
      } catch (error) {
        toast.error("Failed to create product. Please try again.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("productToys");
    },
  });

  return {
    createNewProductToy,
    isLoading,
  };
}
