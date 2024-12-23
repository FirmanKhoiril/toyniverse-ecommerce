import { useAuthRedirect } from "../hooks/useAuthRedirec";
import { Loading, Card, NotFoundProduct } from "../components";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useGetProductByUserId from "../hooks/useGetProductByUserId";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const Products = () => {
  useAuthRedirect("/login");
  const navigate = useNavigate();

  const { userProducts, isFetching, isLoading, isSuccess } =
    useGetProductByUserId();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const handleNavigateCreateProductPage = () => {
    navigate("/create/product");
  };

  const startIndex = currentPage * itemsPerPage;
  const paginatedProducts = userProducts?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <section className="container mx-auto px-4 space-y-4 min-h-screen sm:px-1 pt-6 pb-12">
      <div className="w-full flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg">Manage your product</p>
        </div>
        <div>
          <button
            type="button"
            className="bg-blue-500 p-2 hover:bg-blue-600 transition duration-200 sm:p-2.5 rounded-md text-white"
            onClick={handleNavigateCreateProductPage}
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap space-y-3 items-end sm:mt-0 mt-4 gap-4">
        {isSuccess && paginatedProducts?.length === 0 && (
          <NotFoundProduct action />
        )}

        {isSuccess &&
          paginatedProducts &&
          paginatedProducts.map((product) => (
            <Card key={product.id} {...product} />
          ))}
      </div>

      <div className="w-full flex items-center justify-center">
        {isSuccess && userProducts?.length > itemsPerPage && (
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            pageCount={Math.ceil(userProducts.length / itemsPerPage)}
            onPageChange={handlePageChange}
            containerClassName="pagination flex space-x-2 mt-10"
            activeClassName="bg-blue-500 text-white px-3 py-1 rounded"
            pageClassName="px-3 py-1 border rounded cursor-pointer"
            previousClassName="px-3 py-1 border rounded cursor-pointer"
            nextClassName="px-3 py-1 border rounded cursor-pointer"
          />
        )}
      </div>
    </section>
  );
};

export default Products;
