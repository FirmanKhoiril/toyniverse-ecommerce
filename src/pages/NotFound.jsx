import { NotFoundPage } from "../assets";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <section className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4 sm:px-2 text-center">
      <img
        src={NotFoundPage}
        alt="Not Found Image"
        className="max-w-xs sm:max-w-sm md:max-w-md mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, an error has occurred. Please log in and try again or return to
        the Home Page.
      </p>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleGoHome}
          className=" px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Log in
        </button>
        <button
          onClick={handleGoHome}
          className="px-6 py-3 border border-blue-500 text-black rounded-lg shadow-md hover:border-sky-300 transition duration-200"
        >
          Go Back to Home
        </button>
      </div>
    </section>
  );
};

export default NotFound;
