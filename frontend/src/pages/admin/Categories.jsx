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

function Categories() {
  const dispatch = useDispatch();

  const { categories, loading } = useSelector((state) => state.category);

  const [showForm, setShowForm] = useState(false);

  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const submitHandler = (values) => {
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

    setShowForm(false);

    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>

        <button
          onClick={() => {
            setShowForm(true);
          }}
          className="
bg-black
text-white
px-5
py-3
rounded-lg
"
        >
          Add Category
        </button>
      </div>

      {showForm && (
        <div
          className="
bg-white
border
rounded-xl
p-6
"
        >
          <CategoryForm
            loading={loading}
            initialValues={{
              name: editing?.name || "",

              description: editing?.description || "",

              image: null,
            }}
            onSubmit={submitHandler}
          />
        </div>
      )}

      <CategoryTable
        categories={categories}
        loading={loading}
        onEdit={(cat) => {
          setEditing(cat);

          setShowForm(true);
        }}
        onDelete={(id) => {
          dispatch(deleteCategory(id));
        }}
      />
    </div>
  );
}

export default Categories;
