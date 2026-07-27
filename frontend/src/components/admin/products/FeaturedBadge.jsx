import { FaStar } from "react-icons/fa6";

function FeaturedBadge({ featured }) {
  if (!featured) {
    return (
      <span
        className="
          inline-flex
          items-center
          px-3
          py-1
          rounded-full
          bg-gray-100
          text-gray-500
          text-xs
          font-medium
        "
      >
        Not Featured
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        gap-1
        px-3
        py-1
        rounded-full
        bg-yellow-100
        text-yellow-700
        text-xs
        font-semibold
      "
    >
      <FaStar size={11} />
      Featured
    </span>
  );
}

export default FeaturedBadge;
