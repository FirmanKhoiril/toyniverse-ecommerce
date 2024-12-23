import { useParams } from "react-router-dom";
import useGetSearchResult from "../hooks/useGetSearchResult";
import { Card, Error, Loading, NotFoundProduct } from "../components";
import { useEffect } from "react";

const SearchResult = () => {
  const { searchTerm } = useParams();
  const { productList, isLoading, isError, isSuccess, isFetching } =
    useGetSearchResult({ searchTerm });

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [searchTerm]);

  if (isLoading || isFetching) return <Loading />;
  if (isError) return <Error />;

  return (
    <section className="container mx-auto px-4 min-h-screen sm:px-1 flex flex-col gap-4 pt-6 pb-12">
      <h1 className="text-3xl">Search results for '{searchTerm}'</h1>
      <div className="flex flex-wrap space-y-3 items-end w-full gap-4">
        {isSuccess && productList.length > 0 ? (
          productList.map((product) => (
            <Card key={product.id} {...product} discover />
          ))
        ) : (
            <NotFoundProduct action={false} />
        )}
      </div>
    </section>
  );
};

export default SearchResult;
