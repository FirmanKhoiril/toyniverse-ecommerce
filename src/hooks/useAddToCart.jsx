import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../service/firebase";
import { toast } from "sonner";

export default function useAddToCart() {
  const cartProductCollection = collection(db, "cartProduct");
  const queryClient = useQueryClient();

  const { mutate: addProductToCart, isLoading } = useMutation({
    mutationFn: async (product) => {
      const userId = auth?.currentUser?.uid;
      const q = query(
        cartProductCollection,
        where("userId", "==", userId),
        where("name", "==", product.name)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0];
        const existingData = existingDoc.data();
        const newQuantity = (existingData.quantity || 1) + 1;

        await updateDoc(doc(cartProductCollection, existingDoc.id), {
          quantity: newQuantity,
        });

        toast.success("Product quantity updated in your cart!");
      } else {
        if (product.quantity > 0) {
          await addDoc(cartProductCollection, {
            name: product.name,
            image: product.image,
            price: product.price,
            description: product.description,
            product_id: product.product_id,
            category: product.category,
            userId: userId,
            quantity: product.quantity,
          });
        } else {
          await addDoc(cartProductCollection, {
            name: product.name,
            image: product.image,
            price: product.price,
            description: product.description,
            product_id: product.product_id,
            category: product.category,
            userId: userId,
            quantity: 1,
          });
        }

        toast.success("Product added to your cart!");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("cart");
    },
  });

  return {
    addProductToCart,
    isLoading,
  };
}
