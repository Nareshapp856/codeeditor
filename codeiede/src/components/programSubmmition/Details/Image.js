import { motion } from "framer-motion";

function Image({ image, setImage }) {
  const handleChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {image ? (
        <img
          className="bg-red-400 aspect-video max-w-[300px] mx-auto"
          width={340}
          height={180}
          src={image}
          alt="not a valid pic"
        />
      ) : (
        <h3 className="text-3xl font-bold text-center mb-4">Upload an Image</h3>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block mx-auto pt-2 text-sm text-gray-500
            file:mr-4 file:ms-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
      />
    </motion.div>
  );
}

export default Image;
