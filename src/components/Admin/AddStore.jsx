import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import makeRequest from "../../axios";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi"; // 👈 import the icon

const AddStore = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingOwners, setLoadingOwners] = useState(true);
  const navigate = useNavigate();

  // Fetch owners
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const res = await makeRequest.get("admin/users");
        const ownersList = res.data.data.filter(
          (user) => user.role === "OWNER"
        );
        setOwners(ownersList);
      } catch (error) {
        toast.error("Failed to load owners");
        console.error(error);
      } finally {
        setLoadingOwners(false);
      }
    };
    fetchOwners();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await makeRequest.post("admin/stores", formData);
      toast.success("Store added successfully");
      navigate("/admin/stores");
    } catch (err) {
      toast.error("Failed to add store");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 pt-20">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Go back to previous page
        className="flex items-center text-blue-600 mb-4 hover:underline"
      >
        <FiArrowLeft className="mr-2" />
        Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Add New Store</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded shadow-md"
      >
        {/* Form fields (unchanged) */}
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">
            Store Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="address" className="block mb-1 font-semibold">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div>
          <label htmlFor="ownerId" className="block mb-1 font-semibold">
            Owner
          </label>
          {loadingOwners ? (
            <p>Loading owners...</p>
          ) : (
            <select
              id="ownerId"
              name="ownerId"
              value={formData.ownerId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Owner</option>
              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Store"}
        </button>
      </form>
    </div>
  );
};

export default AddStore;
