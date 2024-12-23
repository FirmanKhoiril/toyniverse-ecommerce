import { Google } from '../../assets';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../service/firebase';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { resetFormData, setFormData, toggleShowPassword } from '../../store/globalSlice';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const { showPassword, formData } = useSelector((state) => state.global);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      localStorage.setItem(
        'user',
        JSON.stringify({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          username: userCredential.user.email,
        })
      );
      navigate("/")
    } catch (error) {
      toast?.error(`Error: ${error.message}`)
    }
  };

  const handleLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          image: result.user.photoURL,
        }
        
        localStorage.setItem(
          'user',
          JSON.stringify(user)
        );
        navigate("/")
      })      
      .catch((error) => {
        toast.error(`Error: ${error.message}`)
      });
  };

  const handleToggleRegister = () => {
    navigate("/register")
    dispatch(toggleShowPassword(false))
   dispatch(resetFormData())
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-xl justify-start sm:justify-center h-full mx-auto p-4 sm:p-4 md:p-6 lg:p-10"
    >
      <div className="text-center">
        <h1 className="text-3xl font-medium">Welcome Back</h1>
      </div>
      <div className="flex flex-col w-full gap-2 relative">
        <label htmlFor="email">Email</label>
        <div className="relative">
          <MdEmail className="absolute left-3 top-3 text-gray-400" />
          <input
            className="w-full p-2 pl-10 border border-gray-300 rounded"
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 relative">
        <label htmlFor="password">Password</label>
        <div className="relative">
          <input
            className="w-full py-2 pr-2 pl-10 border border-gray-300 rounded"
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={() => dispatch(toggleShowPassword(!showPassword))}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sign In
      </button>
      <div className="flex flex-col items-center justify-center my-2">
        <div className="w-full relative flex items-center justify-center">
          <p className="text-center bg-white p-2 z-10 static text-gray-600">
            Or sign in with
          </p>
          <hr className="absolute top-[19px] inset-0 border border-black/10" />
        </div>
        <div className="flex gap-4 mt-2 w-full">
          <button type='button' onClick={handleLoginGoogle} className="py-2 flex items-center gap-4 w-full justify-center px-4 border border-black/10 hover:bg-black/5 rounded-md">
            <img src={Google} alt="Google Logo" />
            <p>Sign in With Google</p>
          </button>
        </div>
      </div>
      <div className="text-center mt-4">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={handleToggleRegister}
          className="text-blue-500 inline hover:underline"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default SignIn;