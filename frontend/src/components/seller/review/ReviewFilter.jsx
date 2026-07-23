function ReviewFilter({ value, onChange }) {
  const ratings = [
    { label: "All Reviews", value: "ALL" },
    { label: "★★★★★ (5)", value: 5 },
    { label: "★★★★☆ (4)", value: 4 },
    { label: "★★★☆☆ (3)", value: 3 },
    { label: "★★☆☆☆ (2)", value: 2 },
    { label: "★☆☆☆☆ (1)", value: 1 },
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {ratings.map((rating) => (
        <option key={rating.value} value={rating.value}>
          {rating.label}
        </option>
      ))}
    </select>
  );
}

export default ReviewFilter;
