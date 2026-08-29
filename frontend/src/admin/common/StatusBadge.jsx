const statusStyles = {
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Preparing: "bg-blue-50 text-blue-700 border-blue-200",
  Ready: "bg-purple-50 text-purple-700 border-purple-200",
  Delivered: "bg-green-50 text-green-700 border-green-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-body font-semibold border ${
        statusStyles[status] || "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
