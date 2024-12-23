import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetDetailProduct from "../hooks/useGetDetailProduct";
import { Error, Loading } from "../components";
import { IoChevronBack, IoCartOutline } from "react-icons/io5";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { fit } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { formatPrice } from "../utils";
import useTrackUserId from "../hooks/useTrackUserId";
import useAddToCart from "../hooks/useAddToCart";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetDetailProduct(id);
  const { addProductToCart, isLoading: loadingAddCart } = useAddToCart();
  const userId = useTrackUserId();

  const [quantity, setQuantity] = useState(1);

  const cld = new Cloudinary({
    cloud: { cloudName: "dbfwc18hi" },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const handleBack = () => {
    navigate(-1);
  };

  const handleDisplayImage = (imageId) => {
    return cld.image(imageId).resize(fit());
  };

  const handleAddToCart = () => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const product = {
      product_id: data.id,
      name: data.name,
      category: data.category,
      price: data.price,
      image: data.image,
      quantity: quantity,
      description: data.description,
      userId,
    };
    setQuantity(1)
    addProductToCart(product);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <section className="px-4 w-full sm:px-10 pt-6 pb-12 min-h-screen">
      <div className="container mx-auto w-full bg-white rounded-2xl shadow-lg p-6 sm:p-10">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBack}
            type="button"
            className="bg-slate-200 p-2 sm:p-3 rounded-full hover:bg-slate-300 transition duration-200"
          >
            <IoChevronBack size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <div className="flex items-center justify-center bg-gray-100 rounded-lg">
            <AdvancedImage
              cldImg={handleDisplayImage(data.image)}
              className=""
            />
          </div>

          <div className="flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex flex-col gap-2">
                <p className="text-sm">#{data.category}</p>
                <h1 className="text-2xl sm:text-4xl font-bold capitalize">
                  {data.name}
                </h1>
              </div>
              <p className="text-lg text-gray-600">{data.description}</p>
              <p className="text-3xl font-semibold text-blue-500">
                Rp{formatPrice(data.price)}
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={decreaseQuantity}
                  className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-lg transition duration-200"
                >
                  -
                </button>
                <span className="text-2xl font-semibold">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-lg transition duration-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2 transition duration-200"
              >
                {loadingAddCart ? (
                  "Loading..."
                ) : (
                  <>
                    <IoCartOutline className="text-2xl text-white" />
                    <span className="text-sm text-white">Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
