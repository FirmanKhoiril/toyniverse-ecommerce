import { Empty } from "./basket";
import useGetCartByUserId from "../hooks/useGetCartByUserId";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Loading } from "./";
import { formatPrice } from "../utils";
import { auth } from "../service/firebase";
import { Link } from "react-router-dom";

const CartHover = () => {
    const userId = auth?.currentUser?.uid;
  const { data: cartItems, isLoading, isSuccess, isError } = useGetCartByUserId();

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dbfwc18hi",
    },
  });

  const handleDisplayImage = (imageId) => {
    const myImage = cld.image(imageId).resize(fill().height(50).width(50));
    return myImage;
  };

  if(!userId || isError) {
    return (
      <div className="w-[300px] overflow-hidden h-[400px] bg-white drop-shadow rounded absolute top-full right-0 z-50">
        <Empty />
      </div>
    )
  }
  return (
    <div className="w-[300px] overflow-x-hidden overflow-y-auto h-[400px] bg-white drop-shadow rounded absolute top-full right-0 z-50">
      {isLoading && <Loading />}
      {isSuccess && cartItems?.length === 0 ? (
        <Empty />
      ) : (
        <div className="space-y-3 w-full flex-col  flex items-start justify-between">
          <p className="text-gray-400 px-3 pt-2">Newest product cart</p>
          {cartItems?.map((item) => (
            <Link
            to={`/products/${item.product_id}`}
              key={item.id}
              className="flex items-start px-3 py-1  hover:bg-black/10 justify-between w-full"
            >
              <div className="flex items-start gap-2">
                <div className="border border-black/10 p-1 rounded-md">
                  <AdvancedImage
                    cldImg={handleDisplayImage(item.image)}
                    className="object-fill h-full flex-1 min-h-[50px] min-w-[50px] max-h-[50px] max-w-[50px] w-full"
                  />
                </div>
                <p className="font-medium line-clamp-2">{item.name}</p>
              </div>
              <p className="text-sm text-gray-500">Rp{formatPrice(item.price)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartHover;
