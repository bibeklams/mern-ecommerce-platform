import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../redux/thunks/categoryThunk";

import CategoryTable from "../../components/admin/categories/CategoryTable";
import CategoryForm from "../../components/admin/categories/CategoryForm";

import { FaPlus } from "react-icons/fa6";

function Categories() {
  const dispatch = useDispatch();

  const { categories, loading } = useSelector((state) => state.category);

  const [showForm, setShowForm] = useState(false);

  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append("name", values.name);

    formData.append("description", values.description);

    if (values.image) {
      formData.append("image", values.image);
    }

    if (editing) {
      dispatch(
        updateCategory({
          id: editing._id,
          formData,
        }),
      );
    } else {
      dispatch(addCategory(formData));
    }

    closeForm();
  };

  const closeForm = () => {
    setShowForm(false);

    setEditing(null);
  };

  const handleEdit = (category) => {
    setEditing(category);

    setShowForm(true);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (confirm) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div
      className="
      space-y-6
    "
    >
      {/* Header */}

      <div
        className="
        flex
        items-center
        justify-between
      "
      >
        <div>
          <h1
            className="
            text-3xl
            font-bold
            text-gray-900
          "
          >
            Categories
          </h1>

          <p
            className="
            text-gray-500
            mt-1
          "
          >
            Manage product categories
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => {
              setEditing(null);

              setShowForm(true);
            }}
            className="
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-black
                text-white
                hover:bg-gray-800
                transition
              "
          >
            <FaPlus />
            Add Category
          </button>
        )}
      </div>

      {/* Category Form */}

      {showForm && (
        <div
          className="
            bg-white
            border
            rounded-2xl
            p-6
          "
        >
          <div
            className="
              flex
              justify-between
              items-center
              mb-5
            "
          >
            <h2
              className="
                text-xl
                font-semibold
              "
            >
              {editing ? "Edit Category" : "Add Category"}
            </h2>

            <button
              onClick={closeForm}
              className="
                  px-4
                  py-2
                  rounded-lg
                  border
                  text-sm
                  hover:bg-gray-100
                "
            >
              Cancel
            </button>
          </div>

          <CategoryForm
            loading={loading}
            initialValues={{
              name: editing?.name || "",

              description: editing?.description || "",

              image: null,
            }}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        </div>
      )}

      {/* Category List */}

      <div
        className="
        bg-white
        border
        rounded-2xl
        overflow-hidden
      "
      >
        <CategoryTable
          categories={categories}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default Categories;
