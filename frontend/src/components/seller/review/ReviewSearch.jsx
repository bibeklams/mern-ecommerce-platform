import { Search } from "lucide-react";

function ReviewSearch({ value, onChange }) {
  return (
    <div className="relative w-full md:w-96">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search by product or customer..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

export default ReviewSearch;
