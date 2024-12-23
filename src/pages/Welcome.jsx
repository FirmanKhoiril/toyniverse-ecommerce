import { Bear, KidsPlayingBlocks, KudaKuda, MenaraDonat } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { offerDatas } from "../assets/dummyData";
import useGetProductToys from "../hooks/useGetProductToys";
import { Card, Loading, NotFoundProduct } from "../components";
import Error from "../components/Error";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchDiscover, setSearchDiscover } from "../store/globalSlice";

const Welcome = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { searchDiscover } = useSelector((state) => state.global);

  const handleNavigateProductPage = () => {
    navigate("/products");
  };

  const { productList, isError, isFetching, isLoading, isSuccess } =
    useGetProductToys();

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchDiscover}`);
    dispatch(clearSearchDiscover());
  };

  return (
    <section className="container mx-auto px-4 space-y-10 flex min-h-[80dvh] relative flex-col items-center justify-center sm:px-0">
      {/* Headline */}
      <div className="mx-0 sm:mx-4 h-full pt-16 sm:pt-20 xl:pt-32 pb-4 sm:pb-0 w-full flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 items-center justify-center flex h-full">
          <div className="flex flex-col gap-4 ">
            <h1 className="text-[clamp(3rem,8vw,4rem)] w-[350px] sm:w-[430px] xl:w-full xl:max-w-[430px] relative rounded px-10 border-2 border-dashed border-blue-500 rotate-[350deg] text-blue-500 font-bold">
              Fun to care,
              <span className="absolute -top-14 -right-10">
                <img src={KudaKuda} alt="Horse Toy" />
              </span>
              <span className="absolute top-14 sm:top-20 -left-14 sm:-left-16 rotate-[10deg]">
                <img
                  src={MenaraDonat}
                  alt="Donuts Tower"
                  width={80}
                  height={80}
                />
              </span>
            </h1>
            <h2 className="ml-20 text-[clamp(3rem,8vw,4rem)] text-[#FBA628] font-bold">
              Comfy Feel
            </h2>
            <p className="text-sm leading-8 -mt-2 xl:leading-8 xl:text-base">
              Discover toys that spark creativity and bring joy to every moment.{" "}
              <br className="hidden xl:block" />
              From endless fun to comforting designs, our collection is crafted{" "}
              <br className="hidden xl:block" />
              with care to inspire smiles and laughter for your little ones.
            </p>
            <div>
              <button
                type="button"
                onClick={handleNavigateProductPage}
                className="px-5 rounded font-semibold text-white bg-blue-500 hover:bg-blue-600 py-2"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
        <div>
          <img
            src={KidsPlayingBlocks}
            alt="Two Kids playing blocks"
            className="h-[clamp(400px,513px)] w-[703px] xl:w-[793px]"
          />
        </div>
      </div>
      {/* Search Product */}
      <form
        onSubmit={handleSubmitSearch}
        className="w-full drop-shadow-lg sm:w-auto mx-auto p-2 flex gap-4 items-center rounded-full bg-blue-500"
      >
        <button
          type="submit"
          className="p-2.5 bg-yellow-400 hover:bg-yellow-500 transition duration-200 rounded-full"
        >
          <CiSearch size={24} />
        </button>
        <label
          htmlFor="search"
          className="text-sm sm:text-xl max-w-[120px] sm:max-w-[160px] w-full text-white"
        >
          Find your product
        </label>
        <input
          type="text"
          name="search"
          required
          id="search"
          value={searchDiscover}
          onChange={(e) => dispatch(setSearchDiscover(e.target.value))}
          className="px-4 py-2 w-full sm:w-[356px] sm:text-base text-sm rounded-full focus:outline-none"
          placeholder="Search..."
        />
      </form>
      {/* Populer Product */}
      <div className="w-full flex justify-center flex-col space-y-6 sm:space-y-10 py-8">
        <div className="flex flex-col gap-3">
          <p className="text-blue-500 text-lg font-semibold">
            Trending Products
          </p>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Popular Product</h1>
            <Link to={"/search"} className="sm:hidden block">See All</Link>
          </div>
          <div className="hidden sm:flex items-center justify-between">
            <p className="text-gray-600 sm:text-base text-sm">
              Explore our most loved toys that bring fun, learning, and endless
              smiles to kids of all ages.
            </p>
            <Link to={"/search"}>See All</Link>
          </div>
        </div>
        <div className="flex flex-wrap space-y-3 items-end w-full gap-4 mt-4">
          {isFetching || (isLoading && <Loading />)}
          {isSuccess && productList?.length === 0 && (
            <NotFoundProduct action={false} />
          )}
          {isSuccess &&
            productList &&
            productList
              .slice(0, 8)
              .map((product) => (
                <Card key={product.id} {...product} discover />
              ))}
          {isError && <Error />}
        </div>
      </div>
      {/* Our offer */}
      <div className="flex flex-col w-full space-y-12 py-8">
        <h1 className="text-blue-500 text-3xl text-center font-bold">
          Our Offer
        </h1>
        <div className="w-full flex flex-col sm:flex-row items-center justify-evenly gap-8">
          <img src={Bear} alt="Bear Doll" />
          <div className="flex flex-col space-y-8">
            {offerDatas.map((data) => (
              <div
                key={data.title}
                className={`h-[123px] w-[467px] border-2 border-dashed ${data.colors} rounded-md flex px-4 items-center gap-4`}
              >
                <img src={data.image} alt={data.title} />
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold">{data.title}</h2>
                  <p className="text-sm text-black/60">{data.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
