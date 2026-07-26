import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEsewaPayment } from "../../redux/thunks/paymentThunk";
import { toast } from "react-toastify";

function PaymentSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const transactionUuid =
    searchParams.get("transaction_uuid") || searchParams.get("transactionUuid");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!transactionUuid) {
        toast.error("Transaction not found.");
        navigate("/payment-failed");
        return;
      }

      try {
        await dispatch(verifyEsewaPayment(transactionUuid)).unwrap();

        toast.success("Payment verified successfully.");

        navigate("/orders");
      } catch (error) {
        toast.error(error);

        navigate("/payment-failed");
      }
    };

    verifyPayment();
  }, [dispatch, navigate, transactionUuid]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-5" />

        <h2 className="text-2xl font-bold">Verifying Payment...</h2>

        <p className="text-gray-500 mt-2">
          Please wait while we verify your payment.
        </p>
      </div>
    </div>
  );
}

export default PaymentSuccess;
