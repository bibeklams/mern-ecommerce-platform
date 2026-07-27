import CategoryRow from "./CategoryRow";
import CategorySkeleton from "./CategorySkeleton";

function CategoryTable({ categories = [], loading, onEdit, onDelete }) {
  if (loading) {
    return <CategorySkeleton />;
  }

  return (
    <div
      className="
bg-white
border
rounded-xl
overflow-hidden
shadow-sm
"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-500">
              <th className="px-6 py-4">Image</th>

              <th className="px-6 py-4">Name</th>

              <th className="px-6 py-4">Description</th>

              <th className="px-6 py-4">Created</th>

              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="
text-center
py-12
text-gray-500
"
                >
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <CategoryRow
                  key={category._id}
                  category={category}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryTable;
