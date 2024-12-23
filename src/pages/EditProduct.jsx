import { useNavigate, useParams } from "react-router-dom";
import { useAuthRedirect } from "../hooks/useAuthRedirec";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFormEditProductImage,
  setFormEditProduct,
} from "../store/globalSlice";
import { UploadWidget } from "../components";
import useEditProduct from "../hooks/useEditProduct";
import { useGetTrackProductById } from "../hooks/useGetTrackProductById";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useAuthRedirect("/login");
  const { formEditProduct } = useSelector((state) => state.global);
  const { isError, product } = useGetTrackProductById(id);
  const { editProduct } = useEditProduct(id);

  if (isError) {
    toast?.error("Product not found");
    return (
      <section className="container mx-auto">Error loading product</section>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setFormEditProduct({
        ...formEditProduct,
        [name]: value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasChanges =
      formEditProduct.name !== product.name ||
      formEditProduct.price !== product.price ||
      formEditProduct.category !== product.category ||
      formEditProduct.description !== product.description ||
      formEditProduct.image !== product.image;

    if (!hasChanges) {
      toast?.info("No changes detected to save.");
      return;
    }
    editProduct(formEditProduct);
  };

  const handleCancelEditProduct = async (e) => {
    e.preventDefault();
    navigate("/products");
  };

  return (
    <section className="mx-auto container flex items-center justify-center bg-white p-4">
      <div className="w-full flex items-start max-w-[500px]  flex-col ">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col w-full gap-4"
        >
          <UploadWidget
            cloudName="dbfwc18hi"
            uploadPreset="preset1"
            image={formEditProduct.image}
            onImageChange={(imageId) =>
              dispatch(
                setFormEditProduct({ ...formEditProduct, image: imageId })
              )
            }
            onImageClear={() => dispatch(clearFormEditProductImage())}
          />
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Enter product name"
              onChange={handleInputChange}
              value={formEditProduct.name || ""}
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Enter product price"
              onChange={handleInputChange}
              value={formEditProduct.price || ""}
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Enter product category"
              onChange={handleInputChange}
              value={formEditProduct.category || ""}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="border border-gray-300 rounded resize-none px-3 py-2 w-full"
              rows={4}
              placeholder="Enter product description"
              value={formEditProduct.description || ""}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="bg-blue-500 text-white max-w-[130px] w-full py-2 rounded hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancelEditProduct}
              className="bg-red-500 text-white max-w-[130px] w-full py-2 rounded hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProduct;
