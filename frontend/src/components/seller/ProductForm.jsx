import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import ProductImages from "./ProductImages";

import { addProduct, updateProduct } from "../../redux/thunks/productThunk";

import { getAllCategories } from "../../redux/thunks/categoryThunk";

function ProductForm({ product, onCancel, onSuccess }) {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  const { loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: product?.name || "",

      description: product?.description || "",

      category: product?.category?._id || "",

      brand: product?.brand || "",

      price: product?.price || "",

      discountAmount: product?.discountAmount || 0,

      stock: product?.stock || "",

      images: [],
    },

    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("name", values.name);

      formData.append("description", values.description);

      formData.append("category", values.category);

      formData.append("brand", values.brand);

      formData.append("price", values.price);

      formData.append("discountAmount", values.discountAmount);

      formData.append("stock", values.stock);

      values.images.forEach((image) => formData.append("images", image));

      let result;

      if (product) {
        result = await dispatch(
          updateProduct({
            id: product._id,
            formData,
          }),
        );
      } else {
        result = await dispatch(addProduct(formData));
      }

      if (
        addProduct.fulfilled.match(result) ||
        updateProduct.fulfilled.match(result)
      ) {
        toast.success(product ? "Product Updated" : "Product Added");

        onSuccess();
      } else {
        toast.error(result.payload);
      }
    },
  });

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-900/10 transition-colors";

  const labelClass = "block mb-1.5 text-sm font-medium text-gray-700";

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white rounded-xl border border-gray-200 p-6 space-y-5"
    >
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          {product ? "Edit Product" : "Add Product"}
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          {product
            ? "Update the details for this product."
            : "Fill in the details to list a new product."}
        </p>
      </div>

      {/* Name */}
      <div>
        <label className={labelClass}>Product Name</label>

        <input
          placeholder="e.g. Wireless Headphones"
          className={inputClass}
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>

        <textarea
          rows={5}
          placeholder="Describe the product..."
          className={inputClass}
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </div>

      {/* Category */}
      <div>
        <label className={labelClass}>Category</label>

        <select
          className={inputClass}
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
        >
          <option value="">Select Category</option>

          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className={labelClass}>Brand</label>

        <input
          placeholder="e.g. Sony"
          className={inputClass}
          name="brand"
          value={formik.values.brand}
          onChange={formik.handleChange}
        />
      </div>

      {/* Price / Discount / Stock */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Price</label>

          <input
            type="number"
            placeholder="0"
            className={inputClass}
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
        </div>

        <div>
          <label className={labelClass}>Discount</label>

          <input
            type="number"
            placeholder="0"
            className={inputClass}
            name="discountAmount"
            value={formik.values.discountAmount}
            onChange={formik.handleChange}
          />
        </div>

        <div>
          <label className={labelClass}>Stock</label>

          <input
            type="number"
            placeholder="0"
            className={inputClass}
            name="stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
          />
        </div>
      </div>

      {/* Images */}
      <div>
        <label className={labelClass}>Product Images</label>

        <ProductImages
          images={formik.values.images}
          onChange={(files) => formik.setFieldValue("images", files)}
          existingImages={product?.images || []}
          onRemoveNewImage={() => {}}
          onRemoveExistingImage={() => {}}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          Cancel
        </button>

        <button
          disabled={loading}
          className="bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
