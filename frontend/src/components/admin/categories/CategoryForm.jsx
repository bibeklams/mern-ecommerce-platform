import { Formik, Form, Field } from "formik";

function CategoryForm({ initialValues, onSubmit, loading }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-7">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700 tracking-wide">
            Category Name <span className="text-red-500">*</span>
          </label>
          <Field
            name="name"
            placeholder="Enter category name..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20 hover:border-gray-300"
          />
          <p className="text-xs text-gray-400 mt-1">
            Must be unique and descriptive
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700 tracking-wide">
            Description
          </label>
          <Field
            as="textarea"
            name="description"
            rows="4"
            placeholder="Brief description of the category..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20 hover:border-gray-300 resize-y"
          />
          <p className="text-xs text-gray-400 mt-1">
            Max 500 characters recommended
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700 tracking-wide">
            Category Image
          </label>
          <div className="relative">
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:cursor-pointer hover:file:bg-gray-800 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20"
            />
            <div className="absolute inset-0 pointer-events-none rounded-xl border-2 border-dashed border-gray-300/50"></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Recommended: JPG, PNG or WebP (Max 2MB)
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 bg-black text-white text-sm font-medium rounded-xl transition-all duration-200 hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Category"
            )}
          </button>
          <p className="text-xs text-gray-400 mt-3 sm:mt-0 sm:ml-4 sm:inline-block">
            All fields are required unless marked optional
          </p>
        </div>
      </Form>
    </Formik>
  );
}

export default CategoryForm;
