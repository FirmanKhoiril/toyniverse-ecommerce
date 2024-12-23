import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { auth, db } from "../service/firebase";
import { toast } from "sonner";

export default function useUpdateCartQuantity() {
  const queryClient = useQueryClient();
  const cartProductCollection = collection(db, "cartProduct");

  const { mutate: updateCartQuantity, isLoading } = useMutation({
    mutationFn: async ({ name, quantity }) => {
      const userId = auth?.currentUser?.uid;
      
      const q = query(
        cartProductCollection,
        where("userId", "==", userId),
        where("name", "==", name)
      );

      const querySnapshot = await getDocs(q);

      const cartDoc = querySnapshot.docs[0];
      const cartDocRef = doc(cartProductCollection, cartDoc.id);

      if (quantity === 0) {
        await deleteDoc(cartDocRef);
        toast.success("Product removed from your cart.");
      } else {
        await updateDoc(cartDocRef, { quantity });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("cart");
    },
  });

  return {
    updateCartQuantity,
    isLoading,
  };
}
