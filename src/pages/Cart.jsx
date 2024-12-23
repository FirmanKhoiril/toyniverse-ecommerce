import { Cloudinary } from "@cloudinary/url-gen";
import { useAuthRedirect } from "../hooks/useAuthRedirec";
import useGetCartByUserId from "../hooks/useGetCartByUserId";
import useUpdateCartQuantity from "../hooks/useUpdateCartQuantity";
import { fill, fit } from "@cloudinary/url-gen/actions/resize";
import { Empty } from "../components/basket";
import { Loading } from "../components";
import { AdvancedImage } from "@cloudinary/react";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { formatPrice } from "../utils";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Cart = () => {
  useAuthRedirect("/login");

  const {
    data: cartItems,
    isLoading: loadingCart,
    isError,
    isSuccess,
  } = useGetCartByUserId();
  const { updateCartQuantity, isLoading: updatingCart } =
    useUpdateCartQuantity();

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dbfwc18hi",
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDisplayImage = (imageId) => {
    return cld.image(imageId).resize(fit().height(50).width(50));
  };

  const handleIncreaseQuantity = (item) => {
    updateCartQuantity({ name: item.name, quantity: item.quantity + 1 });
  };

  const handleDecreaseQuantity = (item) => {
    updateCartQuantity({ name: item.name, quantity: item.quantity - 1 });
  };

  const handleRemoveItem = (item) => {
    updateCartQuantity({ name: item.name, quantity: 0 });
  };

  if (isError) {
    return <Empty />;
  }

  const allTotalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="container mx-auto px-2 min-h-screen sm:px-0 py-6">
      {loadingCart && <Loading />}
      {isSuccess && cartItems?.length === 0 && (
        <div className="h-[80dvh]">
          <Empty />
        </div>
      )}
      {isSuccess && cartItems?.length > 0 && (
        <div className="space-y-3 w-full flex flex-col">
          <div className="grid grid-cols-6 gap-1 sm:gap-4 font-bold border-b border-gray-200 pb-2">
            <p className="col-span-2 pl-1">Item</p>
            <p className="text-center">Unit Price</p>
            <p className="text-center">Quantity</p>
            <p className="text-center">Total Price</p>
            <p className="text-center">Actions</p>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-6 pb-3 hover:bg-black/10 gap-1 sm:gap-4 items-center py-2 border-b border-gray-200"
            >
              <div className="flex items-center w-full gap-2 col-span-2 pl-1">
                <Link
                  to={`/products/${item.product_id}`}
                  className="w-full h-full max-h-[40px] sm:max-h-[50px] max-w-[40px] sm:max-w-[50px]"
                >
                  <AdvancedImage
                    cldImg={handleDisplayImage(item.image)}
                    className="object-fill h-full flex-1 rounded-md w-full"
                  />
                </Link>
                <Link
                  to={`/products/${item.product_id}`}
                  className="font-medium text-sm sm:text-base"
                >
                  {item.name}
                </Link>
              </div>
              <p className="text-center text-sm sm:text-base">
                Rp{formatPrice(item.price)}
              </p>
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => handleDecreaseQuantity(item)}
                  className="text-gray-500 hover:text-black"
                  disabled={updatingCart}
                >
                  <AiOutlineMinus />
                </button>
                <span className="text-sm sm:text-base">{item.quantity}</span>
                <button
                  onClick={() => handleIncreaseQuantity(item)}
                  className="text-gray-500 hover:text-black"
                  disabled={updatingCart}
                >
                  <AiOutlinePlus />
                </button>
              </div>
              <p className="text-center text-sm sm:text-base">
                Rp{formatPrice(item.price * item.quantity)}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="text-red-500 hover:text-red-700"
                  disabled={updatingCart}
                >
                  <AiOutlineDelete size={20} />
                </button>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-6 gap-1 sm:gap-4 pb-2">
            <p className="col-span-2 pl-1"></p>
            <p className="text-center"></p>
            <p className="text-center"></p>
            <p className="text-center font-semibold">Rp{formatPrice(allTotalPrice)}</p>
            <p className="text-center"></p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;