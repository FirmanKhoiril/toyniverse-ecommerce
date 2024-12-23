import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../service/firebase';
import { toast } from 'sonner';

export default function useDeleteProduct() {
    const queryClient = useQueryClient();
    const { mutate: deleteProduct } = useMutation({
      mutationFn: async (id) => {
       const productDoc = doc(db, "products", id)
       await deleteDoc(productDoc)
      },
      onSuccess: () => {
        queryClient.invalidateQueries("productToys");
      },
      onError: () => {
        toast.error("You only can delete products you created.")
      }
    });

    return {
        deleteProduct
    };
}
