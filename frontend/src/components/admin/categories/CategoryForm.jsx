import { Formik, Form, Field } from "formik";

function CategoryForm({ initialValues, onSubmit, loading }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form className="space-y-5">
        <div>
          <label>Category Name</label>

          <Field
            name="name"
            className="
w-full
border
rounded-lg
p-3
"
          />
        </div>

        <div>
          <label>Description</label>

          <Field
            as="textarea"
            name="description"
            className="
w-full
border
rounded-lg
p-3
"
          />
        </div>

        <div>
          <label>Image</label>

          <input type="file" name="image" />
        </div>

        <button
          disabled={loading}
          className="
bg-black
text-white
px-5
py-3
rounded-lg
"
        >
          {loading ? "Saving..." : "Save Category"}
        </button>
      </Form>
    </Formik>
  );
}

export default CategoryForm;
