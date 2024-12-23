import { useDispatch, useSelector } from "react-redux";
import { clearFormContact, setFormContact, setSendingFormContact } from "../store/globalSlice";
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

const Contact = () => {
  const dispatch = useDispatch();
  const { formContact, sendingFormContact } = useSelector((state) => state.global);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      dispatch(setFormContact({ ...formContact, [name]: value }));
    };

  const handleSubmitContact = (e) => {
    e.preventDefault();
    dispatch(setSendingFormContact(true))
    
    const formData = {
      from_name: formContact.firstName,
      from_email: formContact.email,
      message: formContact.message,
      subject: formContact.subject,
      to_name: "Firman Khoiril"
    }

    emailjs
        .send(
          'service_0rggskw',
          'template_pel69iv',
          formData, {
          publicKey: 'xdNBf7o7j_u7BjyjX',
        })
        .then(
          () => {
            toast.success("Successfully Sending a Message!")
            dispatch(clearFormContact())
            dispatch(setSendingFormContact(false))
          },
          () => {
            toast.error("Failed sending a message!")
          }
        );
    }

  return (
    <section className="container mx-auto min-h-[100dvh] px-4 lg:px-0 py-6 ">
      <div className="flex lg:flex-row items-center justify-center h-full flex-col pb-6  gap-8">
        <div className="flex flex-col h=f gap-4 max-w-full lg:max-w-[50%] xl:max-w-[40%] w-full">
          <div className="bg-gray-900/10 p-6 sm:p-12 border-blue-500 border-b-[8px]  h-[412px] rounded-t-md shadow-md">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4">
              Contact Me.
            </h1>
            <p className="sm:text-lg text-base leading-10  lg:text-xl xl:text-xl xl:leading-10 2xl:text-2xl sm:leading-8  mb-6  lg:leading-10 2xl:leading-10">
              I will read all my emails one by one and I'm <br /> not going to
              let them be missed. Send me <br /> any message you want and I will
              reply that.
            </p>
            <div className="flex items-center mb-4 relative">
              <span className="text-red-500 text-2xl mr-4 bg-pastel rounded p-2 absolute top-20 sm:top-0 -left-10 sm:-left-16">
                📞
              </span>
              <p className="text-gray-600 leading-8 sm:leading-8 2xl:leading-10 sm:text-base  xl:text-lg  xl:leading-8 2xl:text-xl">
                I need your <strong className="text-black/80">Name</strong> and{" "}
                <strong className="text-black/80">Email Address</strong> but you
                won’t <br />
                receive anything but your reply only.
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-4 justify-between w-full items-center">
            <p className="text-gray-500 text-lg">
              Social Media Seriously <br />
              <strong className="text-black/80">Harm Your Mental Health</strong>
            </p>
          </div>
        </div>

        <div className="w-full text-black py-6 px-6 sm:px-9 md:px-12 relative">
          <h2 className="text-3xl font-semibold mb-4">Send Me A Message</h2>
          <form onSubmit={handleSubmitContact} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                required
                value={formContact.firstName}
                onChange={handleInputChange}
                id="firstName"
                name="firstName"
                className="w-full p-2 placeholder:text-black/60 bg-gray-800/10 border border-gray-700/20 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formContact.email}
                onChange={handleInputChange}
                id="email"
                name="email"
                className="w-full p-2 placeholder:text-black/60 bg-gray-800/10 border border-gray-700/20 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              required
              value={formContact.subject}
              onChange={handleInputChange}
              id="subject"
              name="subject"
              className="w-full p-2 placeholder:text-black/60 bg-gray-800/10 border border-gray-700/20 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Message"
              required
              value={formContact.message}
              onChange={handleInputChange}
              id="message"
              name="message"
              rows="5"
              className="w-full p-2 placeholder:text-black/60 resize-none bg-gray-800/10 border border-gray-700/20 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div className="flex justify-between w-full items-center">
              <button
                type="submit"
                className="bg-blue-500 max-w-[150px] hover:bg-blue-600 text-white transition w-full px-2 py-3 rounded font-semibold"
              >
                {sendingFormContact ? "Loading..." : "SEND MESSAGE"}
              </button>
              <p className="text-black/50 sm:text-base text-sm">Powered by Email.js</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
