import { useNavigate } from "react-router-dom";

function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow border p-10 text-center max-w-md">
        <div className="text-red-500 text-6xl mb-5">✖</div>

        <h1 className="text-3xl font-bold">Payment Failed</h1>

        <p className="text-gray-500 mt-3">
          Your payment could not be completed.
        </p>

        <button
          onClick={() => navigate("/cart")}
          className="mt-8 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Back To Cart
        </button>
      </div>
    </div>
  );
}

export default PaymentFailed;
