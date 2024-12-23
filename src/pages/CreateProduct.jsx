import { useDispatch, useSelector } from "react-redux";
import { useAuthRedirect } from "../hooks/useAuthRedirec";
import {
  clearFormCreateProductImage,
  setFormCreateProduct,
} from "../store/globalSlice";
import useCreateNewProduct from "../hooks/useCreateNewProduct";
import { UploadWidget } from "../components";
import { toast } from "sonner";

const CreateProduct = () => {
  useAuthRedirect("/login");

  const dispatch = useDispatch();
  const { formCreateProduct } = useSelector((state) => state.global);
  const { createNewProductToy, isLoading } = useCreateNewProduct();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormCreateProduct({ ...formCreateProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formCreateProduct.image === "") {
      toast.error("Please upload an image to create a new product");
      return;
    }

    createNewProductToy(formCreateProduct);
  };

  return (
    <section className="mx-auto container flex items-center justify-center bg-white p-4">
      <div className="w-full flex items-start max-w-[500px]  flex-col ">
        <h1 className="text-xl font-semibold mb-4">Create Product</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-2 sm:gap-4"
        >
          <div className="flex flex-col">
            <UploadWidget
              cloudName="dbfwc18hi"
              uploadPreset="preset1"
              image={formCreateProduct.image}
              onImageChange={(imageId) =>
                dispatch(
                  setFormCreateProduct({ ...formCreateProduct, image: imageId })
                )
              }
              onImageClear={() => dispatch(clearFormCreateProductImage())}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formCreateProduct.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formCreateProduct.price}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product price"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category" className="font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formCreateProduct.category}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formCreateProduct.description}
              onChange={handleInputChange}
              className="border border-gray-300 resize-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              rows={4}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2.5 rounded hover:bg-blue-600 transition"
          >
            {isLoading ? "Loading..." : "Create New"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateProduct;
