import { motion, AnimatePresence } from "motion/react";
import { FaExclamationTriangle } from "react-icons/fa";

function DeleteProductModal({ isOpen, product, loading, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-[2px] z-40"
            onClick={onClose}
          />

          {/* Modal */}

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl border border-gray-100">
              {/* Body */}

              <div className="p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 mb-4">
                  <FaExclamationTriangle size={18} />
                </div>

                <h2 className="text-base font-semibold text-gray-900">
                  Delete product?
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Are you sure you want to delete
                </p>

                <p className="mt-1 font-semibold text-gray-900 truncate">
                  {product?.name}
                </p>

                <p className="mt-3 text-xs text-gray-400">
                  This action cannot be undone.
                </p>
              </div>

              {/* Footer */}

              <div className="flex gap-3 border-t border-gray-100 px-6 py-4">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  onClick={onConfirm}
                  className="flex-1 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-sm font-semibold text-white transition-colors"
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default DeleteProductModal;
