import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";

import ProductForm from "../../components/seller/ProductForm";
import SellerProductTable from "../../components/seller/SellerProductTable";
import DeleteProductModal from "../../components/seller/DeleteProductModal";

import {
  getSellerProducts,
  deleteProduct,
} from "../../redux/thunks/productThunk";

function Products() {
  const dispatch = useDispatch();

  const { sellerProducts, loading } = useSelector((state) => state.product);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(getSellerProducts());
  }, [dispatch]);

  // ==========================
  // Add Product
  // ==========================

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  // ==========================
  // Edit Product
  // ==========================

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // ==========================
  // Close Form
  // ==========================

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // ==========================
  // Success
  // ==========================

  const handleSuccess = () => {
    dispatch(getSellerProducts());

    setShowForm(false);

    setEditingProduct(null);
  };

  // ==========================
  // Delete
  // ==========================

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteProduct(selectedProduct._id));

    if (deleteProduct.fulfilled.match(result)) {
      toast.success("Product deleted successfully");

      dispatch(getSellerProducts());

      setDeleteOpen(false);

      setSelectedProduct(null);
    } else {
      toast.error(result.payload);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-xl border border-gray-200 p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Products</h1>

          <p className="text-sm text-gray-500 mt-1">Manage all your products</p>
        </div>

        {!showForm && (
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <FaPlus size={12} />
            Add Product
          </button>
        )}
      </div>

      {/* Form */}

      {showForm && (
        <ProductForm
          product={editingProduct}
          onCancel={handleCloseForm}
          onSuccess={handleSuccess}
        />
      )}

      {/* Products */}

      <SellerProductTable
        products={sellerProducts}
        loading={loading}
        onEdit={handleEditProduct}
        onDelete={handleDeleteClick}
      />

      {/* Delete Modal */}

      <DeleteProductModal
        isOpen={deleteOpen}
        product={selectedProduct}
        loading={loading}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default Products;
