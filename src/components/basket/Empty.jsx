import { ShoppingBasket } from "../../assets";

const Empty = () => {
  return (
    <div className="h-full w-full space-y-4 flex justify-center items-center flex-col">
      <img src={ShoppingBasket} alt="Empty Basket" width={180} height={180} />
      <p className=" text-center text-sm">
        <span className="text-xl">Your basket is empty!</span> <br />
        Add some products to get started.
      </p>
    </div>
  );
};

export default Empty;
