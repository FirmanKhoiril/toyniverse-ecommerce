import { useEffect, useRef } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill, fit } from "@cloudinary/url-gen/actions/resize";
import { BiCloudUpload } from "react-icons/bi";
import { FaTrash } from "react-icons/fa6";

const UploadWidget = ({
  cloudName,
  uploadPreset,
  image = null,
  onImageChange,
  onImageClear,
}) => {
  const widgetRef = useRef();
  const cloudinaryRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName,
        uploadPreset,
      },
      (_, result) => {
        if (result.event === "success") {
          const publicIdImage = result.info.public_id;
          onImageChange(publicIdImage);
        }
      }
    );
  }, [cloudName, uploadPreset, onImageChange]);

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = image
    ? cld.image(image).resize(fit().height(500).width(500))
    : null;

  return (
    <div className="w-full flex flex-col gap-2">
      {myImage ? (
        <div className="relative flex flex-col gap-2">
          <h1 className="font-medium">Product Image</h1>
          <AdvancedImage cldImg={myImage} className="w-full object-fill max-h-[300px] sm:max-h-[250px]" />
          <button
            onClick={onImageClear}
            className="p-2 absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white/80 transition duration-200 shadow-xl rounded-md ml-auto"
          >
            <FaTrash />
          </button>
        </div>
      ) : (
        <button
          onClick={() => widgetRef.current.open()}
          className="bg-blue-500 text-white flex h-[220px] items-center w-full justify-center rounded hover:bg-blue-600 transition"
          type="button"
        >
          <BiCloudUpload className="text-white text-6xl" />
          <h1>Upload an Image</h1>
        </button>
      )}
    </div>
  );
};

export default UploadWidget;
