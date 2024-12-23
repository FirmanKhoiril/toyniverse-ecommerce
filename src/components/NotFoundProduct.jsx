import { NotFound } from "../assets";

const NotFoundProduct = ({ action }) => {
  return (
    <div className="flex flex-col w-screen items-center justify-center min-h-[80vh] text-center">
      <img src={NotFound} alt="No products found" className="w-56 h-56 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700">
        No Products Found
      </h2>
      {action ? (
        <p className="text-gray-500 mt-2">
          Add your first product by clicking the "+" button!
        </p>
      ) : null}
    </div>
  );
};

export default NotFoundProduct;
