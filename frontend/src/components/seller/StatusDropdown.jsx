import { useState } from "react";

function StatusDropdown({ currentStatus, onChange }) {
  const [status, setStatus] = useState(currentStatus);

  const statusFlow = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: [],
  };

  const availableStatus = statusFlow[status] || [];

  const handleChange = (e) => {
    const newStatus = e.target.value;

    if (!newStatus) return;

    setStatus(newStatus);

    onChange(newStatus);
  };

  return (
    <select
      value=""
      disabled={availableStatus.length === 0}
      onChange={handleChange}
      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    >
      <option value="">Update</option>

      {availableStatus.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default StatusDropdown;
