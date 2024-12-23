import useGetProductToys from "../hooks/useGetProductToys";
import { Card, Error, Loading, NotFoundProduct } from "../components";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const Search = () => {
  const { productList, isError, isFetching, isLoading, isSuccess } =
    useGetProductToys();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const paginatedProducts = productList?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className="container mx-auto px-4 space-y-10 flex min-h-[80dvh] relative flex-col items-center justify-center sm:px-0 py-8">
      <div className="flex flex-wrap space-y-3 items-end w-full gap-4 mt-4">
        {isFetching || (isLoading && <Loading />)}
        {isSuccess && paginatedProducts?.length === 0 && (
          <NotFoundProduct action={false} />
        )}
        {isSuccess &&
          paginatedProducts &&
          paginatedProducts.map((product) => (
            <Card key={product.id} {...product} discover />
          ))}
        {isError && <Error />}
      </div>

      <div className="">
      {isSuccess && productList?.length > itemsPerPage && (
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={Math.ceil(productList.length / itemsPerPage)}
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

export default Search;
