import { FaTrash, FaCloudUploadAlt } from "react-icons/fa";

function ProductImages({
  images = [],
  existingImages = [],
  onChange,
  onRemoveNewImage,
  onRemoveExistingImage,
}) {
  return (
    <div className="space-y-5">
      {/* Upload */}
      <label
        htmlFor="product-images-upload"
        className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-100/60 transition-colors"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400">
          <FaCloudUploadAlt size={18} />
        </span>
        <p className="text-sm font-medium text-gray-700">
          Click to upload images
        </p>
        <p className="text-xs text-gray-400">PNG, JPG up to a few MB each</p>

        <input
          id="product-images-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => onChange([...e.target.files])}
          className="hidden"
        />
      </label>

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2.5">
            Current images
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {existingImages.map((image, index) => (
              <div
                key={index}
                className="group relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
              >
                <img
                  src={image.secure_url}
                  alt=""
                  className="h-28 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => onRemoveExistingImage(index)}
                  aria-label="Remove image"
                  className="absolute top-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-sm hover:bg-red-50 transition-colors"
                >
                  <FaTrash size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Images */}
      {images.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2.5">
            New images
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="h-28 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => onRemoveNewImage(index)}
                  aria-label="Remove image"
                  className="absolute top-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-sm hover:bg-red-50 transition-colors"
                >
                  <FaTrash size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductImages;
