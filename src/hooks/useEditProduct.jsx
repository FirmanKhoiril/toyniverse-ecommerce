import { useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../service/firebase';
import { updateDoc, doc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function useEditProduct(id) {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const { mutate: editProduct } = useMutation({
      mutationFn: async (formEditProduct) => {
       const productDoc = doc(db, "products", id)
       
       await updateDoc(productDoc, {
        name: formEditProduct.name,
        image: formEditProduct.image,
        price: formEditProduct.price,
        description: formEditProduct.description,
        category: formEditProduct.category,
        updatedAt: Timestamp.now(),
        })

      },
      onSuccess: () => {
        queryClient.invalidateQueries("productToys");
        navigate("/products")
      },
      onError: () => {
        toast?.error("You only can edit product you created.")
      }
    });

    return {
        editProduct
    };
}
