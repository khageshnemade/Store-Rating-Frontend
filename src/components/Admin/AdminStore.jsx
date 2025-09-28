import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import makeRequest from "../../axios";
import { toast } from "react-toastify";
import { ArrowLeft, Plus } from "lucide-react";

const AdminStore = () => {
  const [stores, setStores] = useState([]);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch stores
  const fetchStores = async () => {
    try {
      const res = await makeRequest.get("admin/stores");
      setStores(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch stores");
      console.error(err);
    }
  };

  // Fetch owners
  const fetchOwners = async () => {
    try {
      const res = await makeRequest.get("admin/users?role=OWNER");
      setOwners(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch store owners");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchStores(), fetchOwners()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Helper: get owner's name by id
  const getOwnerNameById = (ownerId) => {
    const owner = owners.find((o) => o.id === ownerId);
    return owner ? owner.name : "Unknown Owner";
  };

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
          onClick={() => navigate("/admin/stores/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus size={20} />
          Add New Store
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading stores...</p>
      ) : stores.length === 0 ? (
        <p className="text-center text-gray-600">No stores found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">Name</th>
                <th className="border border-gray-300 p-3 text-left">Email</th>
                <th className="border border-gray-300 p-3 text-left">
                  Address
                </th>
                <th className="border border-gray-300 p-3 text-left">Owner</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{store.name}</td>
                  <td className="border border-gray-300 p-3">{store.email}</td>
                  <td className="border border-gray-300 p-3">
                    {store.address}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {getOwnerNameById(store.ownerId)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminStore;
