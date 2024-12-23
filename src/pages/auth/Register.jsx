import SignUp from "../../components/auth/SignUp";
import { ToysOne, ToysTwo, ToysThree } from "../../assets";
import { useAuthRedirect } from "../../hooks/useAuthRedirec";

const Register = () => {
  useAuthRedirect("/register");

  return (
    <section className="w-screen min-h-screen flex items-center sm:flex-row flex-col bg-pastel overflow-hidden justify-between relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-20 h-20 opacity-50 drop-shadow-lg absolute top-10 -left-8 sm:left-5">
          <img src={ToysOne} alt="Toys One" />
        </div>
        <div className="w-28 h-28 opacity-50 drop-shadow-lg absolute bottom-20 left-16">
          <img src={ToysThree} alt="Toys Two" />
        </div>
        <div className="w-72 h-72 opacity-50 drop-shadow-lg absolute top-8 sm:top-32 left-1/4 sm:left-[340px]">
          <img src={ToysTwo} alt="Toys Two" />
        </div>
      </div>

      <div className="w-full sm:w-1/3 md:w-1/2 h-[30%] sm:h-full flex items-center justify-center relative">
        <div className="sm:block hidden">
          <h1 className="drop-shadow-md font-semibold leading-[100px] text-[clamp(4rem,8vw,6rem)]">
            Welcome to <br />
            <span>ToyNiverse</span>
          </h1>
          <p className="mt-4 text-[clamp(1.5rem,2.5vw,2.5rem)]">
            Create an account to explore
            <br />
            our universe of toys
          </p>
        </div>
      </div>

      <div className="w-full sm:w-2/3 md:w-1/2 flex items-center bg-white p-2 h-auto sm:h-screen rounded-t-3xl sm:rounded-tr-none sm:rounded-l-3xl drop-shadow-md">
        <SignUp />
      </div>
    </section>
  );
};

export default Register;
