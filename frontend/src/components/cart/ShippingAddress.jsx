import { useForm } from "react-hook-form";

function ShippingAddress({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-900/10 transition-colors";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Shipping Address
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            {...register("fullName", {
              required: "Full name is required",
            })}
            className={inputClass}
          />

          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            Phone Number
          </label>

          <input
            type="text"
            placeholder="98XXXXXXXX"
            {...register("phone", {
              required: "Phone number is required",
            })}
            className={inputClass}
          />

          {errors.phone && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            Address
          </label>

          <textarea
            rows={3}
            placeholder="Street, ward, landmark..."
            {...register("address", {
              required: "Address is required",
            })}
            className={inputClass}
          />

          {errors.address && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            City
          </label>

          <input
            type="text"
            placeholder="Kathmandu"
            {...register("city", {
              required: "City is required",
            })}
            className={inputClass}
          />

          {errors.city && (
            <p className="text-red-500 text-xs mt-1.5">{errors.city.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          Save Address
        </button>
      </form>
    </div>
  );
}

export default ShippingAddress;
