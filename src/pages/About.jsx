import { aboutCoreValues } from "../assets/dummyData";
import { BlobOne, BlobFour, BlobThree, BlobTwo, KidsPlaying } from "../assets";

const About = () => {
  const blobs = [BlobOne, BlobTwo, BlobThree, BlobFour];

  return (
    <section className="container mx-auto px-4 sm:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-600">
          Welcome to ToyNiverse
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600">
        Discover a magical universe of toys for your little ones! Fun, excitement, and joy await at ToyNiverse.
        </p>
      </div>

      <div className="flex flex-wrap items-center w-full justify-center gap-8 mb-12">
        <div className="w-full sm:w-1/2 text-center">
          <h2 className="text-3xl font-bold text-blue-500 mb-4">Our Story</h2>
          <p className="text-gray-700 text-lg">
            ToyNiverse was founded with a mission to bring smiles to kids' faces
            and foster creativity through play. We believe every toy has a
            story, and we're here to share it with your little ones.
          </p>
        </div>
        <div className="w-full sm:w-1/2 flex items-center justify-center">
          <img
            src={KidsPlaying}
            alt="Happy Kids Playing"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-16 sm:mb-12">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[88px] sm:gap-[80px] md:gap-8">
          {aboutCoreValues.map((value, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center p-6 rounded-lg text-center"
            >
              <img
                className="absolute inset-0 drop-shadow-2xl w-[250px] h-[250px] -z-10"
                src={blobs[index % blobs.length]}
                alt={value.title}
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />

              <div className="relative z-10">
                <div className="text-4xl">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mt-4">
                  {value.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center bg-pastel py-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700">
          To inspire and nurture the joy of play in every child, providing the
          best toys and the happiest experiences.
        </p>
      </div>
    </section>
  );
};

export default About;
