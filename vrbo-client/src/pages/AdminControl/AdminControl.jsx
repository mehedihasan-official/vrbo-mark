import { useContext, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const AdminControl = () => {
  const { allUsersData, user } = useContext(AuthContext) || {};
  const [refresh, setRefresh] = useState(false);

  const safeUsers = Array.isArray(allUsersData) ? allUsersData : [];

  const adminUsers = useMemo(() => {
    return safeUsers.filter((u) => u.isAdmin === true);
  }, [safeUsers, refresh]);

  const handleRemoveAdmin = async (email) => {
    if (email === user?.email) {
      Swal.fire("Warning", "You cannot remove yourself!", "warning");
      return;
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove admin privileges.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      confirmButtonText: "Yes, remove",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_Link}/users/remove-admin/${email}`,
        { method: "PATCH" },
      );
      if (res.ok) {
        Swal.fire("Success", "Admin rights removed", "success");
        setRefresh(!refresh);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not remove admin", "error");
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Admin Control
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No Admin Found
                  </td>
                </tr>
              ) : (
                adminUsers.map((admin, index) => (
                  <tr
                    key={admin.email}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="p-4 text-gray-800 dark:text-gray-200">
                      {index + 1}
                    </td>
                    <td className="p-4 font-medium text-gray-800 dark:text-gray-200">
                      {admin.name}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">
                      {admin.email}
                    </td>
                    <td className="p-4">
                      {user?.email !== admin.email ? (
                        <button
                          onClick={() => handleRemoveAdmin(admin.email)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-md text-xs hover:bg-yellow-600"
                        >
                          Remove Admin
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          You
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminControl;
