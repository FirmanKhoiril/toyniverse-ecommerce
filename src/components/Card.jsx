import { FaTrash, FaEdit } from "react-icons/fa";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { fit } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { formatedTimestamp, formatPrice } from "../utils";
import useDeleteProduct from "../hooks/useDeleteProduct";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import useAddToCart from "../hooks/useAddToCart";
import { auth } from "../service/firebase";
import { toast } from "sonner";

const Card = ({
  image,
  discover,
  id,
  price,
  name,
  createdAt,
  updatedAt,
  description,
  category,
}) => {
  const userId = auth?.currentUser?.uid;
  const navigate = useNavigate();
  const { deleteProduct } = useDeleteProduct();
  const { addProductToCart, isLoading } = useAddToCart();

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dbfwc18hi",
    },
  });

  const myImage = cld.image(image).resize(fit().height(320).width(300));

  const handleDeleteProduct = (e) => {
    e.stopPropagation();
    deleteProduct(id);
  };

  const handleEditProduct = (e) => {
    e.stopPropagation();
    if (userId !== userId)
      return toast?.error("You only can edit product you created.");
    navigate(`/edit/product/${id}`);
  };

  const handleAddCart = (e) => {
    e.stopPropagation();
    if(!userId) {
      return toast.error("You have to login to add this product in your cart")
    }
    const product = {
      product_id: id,
      name,
      image,
      price,
      description,
      category,
    }
    addProductToCart(product);
  };

  const isEdited = createdAt.seconds !== updatedAt.seconds;

  return (
    <div className="w-[calc(100%/1)] sm:w-[calc(100%/2.11)] sm:mx-[4px] md:mx-0 md:w-[calc(100%/3.14)] lg:w-[calc(100%/4.20)] xl:w-[calc(100%/4.16)] 2xl:w-[calc(100%/4.13)] border border-black/20 flex flex-col gap-1.5 bg-white p-3 relative h-auto group transition duration-200 min-h-[380px] hover:-translate-y-[2px] hover:border-blue-500 hover:z-30 py-2">
      <Link
        to={`/products/${id}`}
        className="cursor-pointer w-full flex flex-col gap-2"
      >
        <AdvancedImage
          cldImg={myImage}
          className="w-full object-fill max-h-[300px] sm:max-h-[250px]"
        />
        <div className="flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-medium line-clamp-1">
            {name}
          </h1>
          <div className="flex justify-end w-full rounded-full max-w-[100px] sm:max-w-[120px]">
            <p className="line-clamp-1 bg-slate-300 rounded-full px-1.5 py-[2px] text-base">
              Rp{formatPrice(price)}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500 italic">{category}</p>
        <p className="line-clamp-2 text-sm">{description}</p>
        {!discover && (
          <p className="text-sm text-gray-500">
            {formatedTimestamp(createdAt)}
          </p>
        )}
      </Link>
      <div className={`${isEdited ? "justify-between" : "justify-end"} flex w-full  items-center`}>
        {isEdited && !discover && (
          <p className="text-sm text-gray-500 italic">Edited</p>
        )}

        {!discover && (
          <div className="flex justify-end gap-2">
            <button
              onClick={handleEditProduct}
              className="p-2 bg-blue-500 text-white/90 hover:bg-blue-600 transition duration-200 shadow-xl rounded-md"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDeleteProduct}
              className="p-2 bg-red-500 text-white/90 hover:bg-red-600 transition duration-200 shadow-xl rounded-md"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={handleAddCart}
        className="flex justify-center gap-2 -left-[1px] rounded-b-md border-b  border-white/40 absolute -bottom-0 group-hover:-bottom-10 bg-blue-500 opacity-0 group-hover:opacity-100 w-[100.5%] py-2"
      >
        {isLoading ? (
         <p className="text-white">Loading...</p>
        ) : (
          <>
            <IoCartOutline className="text-2xl text-white" />
            <span className="text-sm text-white">Add to Cart</span>
          </>
        )}
      </button>
    </div>
  );
};

export default Card;
