import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import makeRequest from "../../axios";
import { toast } from "react-toastify";
import { ArrowLeft, Plus } from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("role");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const fetchUsers = async (resetPage = false) => {
    setLoading(true);
    try {
      const res = await makeRequest.get("admin/users", {
        params: {
          q: query || undefined,
          role: roleFilter || undefined,
          page,
          limit,
          sortBy,
          sortOrder,
        },
      });

      setUsers(res.data.data || []);
      const total = res.data.meta?.total || 0;
      setTotalPages(Math.ceil(total / limit));

      // Reset page if requested
      if (resetPage) setPage(1);
    } catch (err) {
      toast.error("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users whenever filters, sorting, page, or limit changes
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortBy, sortOrder, limit]);

  // Reset page when search or role filter changes
  useEffect(() => {
    setPage(1);
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, roleFilter]);

  const roles = ["", "ADMIN", "OWNER", "USER"]; // "" = All

  return (
    <div className="max-w-7xl mx-auto p-6 pt-20">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <button
          onClick={() => navigate("/admin/users/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus size={20} />
          Add New User
        </button>
      </div>

      {/* Search, Filter, Page Size */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-wrap items-center gap-4"
        >
          <input
            type="text"
            placeholder="Search by name/email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded w-64"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r === "" ? "All Roles" : r}
              </option>
            ))}
          </select>
        </form>

        {/* Page Size */}
        <div className="flex items-center gap-2">
          <label>Page Size:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-gray-600">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                {[
                  { label: "Name", key: "name" },
                  { label: "Email", key: "email" },
                  { label: "Address", key: "address" },
                  { label: "Role", key: "role" },
                  { label: "Store Rating", key: "averageStoreRating" },
                ].map(({ label, key }) => (
                  <th
                    key={key}
                    className="border border-gray-300 p-3 text-left cursor-pointer select-none"
                    onClick={() => {
                      if (sortBy === key) {
                        setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
                      } else {
                        setSortBy(key);
                        setSortOrder("ASC");
                      }
                    }}
                  >
                    <div className="flex items-center gap-1">
                      {label}
                      {sortBy === key && (
                        <span>{sortOrder === "ASC" ? "▲" : "▼"}</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{user.name}</td>
                  <td className="border border-gray-300 p-3">{user.email}</td>
                  <td className="border border-gray-300 p-3">{user.address}</td>
                  <td className="border border-gray-300 p-3">{user.role}</td>
                  <td className="border border-gray-300 p-3">
                    {user.role === "OWNER"
                      ? user.averageStoreRating || "Not Rated"
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
