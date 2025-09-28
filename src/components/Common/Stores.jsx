import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { MdStore, MdLocationOn, MdEdit, MdRateReview } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";
import makeRequest from "../../axios";

const Stores = ({ owner_id=null, initialPageSize=2 }) => {
  const [stores, setStores] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editingRatingId, setEditingRatingId] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [filterOwner, setFilterOwner] = useState(!!owner_id);
  const navigate = useNavigate();

  const fetchStores = async () => {
    setLoading(true);
    try {
      const params = {
        q: "",
        name,
        address,
        page,
        limit,
      };

      // Pass owner_id only if filterOwner is true and owner_id exists
      if (filterOwner && owner_id) params.owner_id = owner_id;

      const response = await makeRequest.get("/stores", { params });
      const responseData = response.data;

      setStores(responseData?.data || []);
      setTotalPages(responseData?.meta?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching stores:", error);
      toast.error("Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [page, limit, filterOwner, owner_id]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchStores();
  };

  const handleRatingSubmit = async (storeId) => {
    try {
      await makeRequest.post(`/ratings/${storeId}`, { rating: newRating });

      setStores((prevStores) =>
        prevStores.map((store) =>
          store.id === storeId ? { ...store, userRating: newRating } : store
        )
      );

      toast.success("Rating submitted successfully!");
      setEditingRatingId(null);
      setNewRating(0);
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <MdStore className="text-blue-600" size={36} />
          Stores
        </h1>

        <div className="flex items-center gap-4">
          {/* Toggle owner filter */}
          {owner_id && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filterOwner}
                onChange={() => {
                  setFilterOwner(!filterOwner);
                  setPage(1);
                }}
              />
              My stores
            </label>
          )}

          {/* Page size select */}
          <div className="flex items-center gap-2">
            <label htmlFor="pageSize" className="text-gray-700">
              Show:
            </label>
            <select
              id="pageSize"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          placeholder="Search by address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiSearch size={18} />
          Search
        </button>
      </form>

      {/* Content */}
      {loading ? (
        <div className="text-center text-gray-500">Loading stores...</div>
      ) : stores.length === 0 ? (
        <div className="text-center text-gray-500">No stores found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              onClick={() => {
                const path = owner_id
                  ? "/owner/stores/rating" 
                  : "/user/stores/rating"; 
                navigate(path, { state: { id: store.id } });
              }}
              className="border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition bg-gradient-to-br from-white to-gray-50 cursor-pointer"
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                  <MdStore size={22} />
                  {store.name}
                </h2>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <MdLocationOn size={18} />
                  {store.address}
                </p>
                <p className="text-sm text-gray-700 mt-2 flex gap-2 items-center">
                  <AiFillStar className="text-yellow-500" />
                  <span>
                    Avg Rating:{" "}
                    <strong>
                      {store.averageRating
                        ? store.averageRating
                        : "Not rated yet"}
                    </strong>
                  </span>
                </p>
                <p className="text-sm text-gray-700 flex gap-2 items-center">
                  <MdRateReview className="text-green-600" />
                  <span>
                    Your Rating:{" "}
                    <strong>
                      {store.userRating ? store.userRating : "Not rated"}
                    </strong>
                  </span>
                </p>
              </div>

              <div>
                {editingRatingId === store.id ? (
                  <div className="flex flex-col gap-2">
                    <div
                      className="flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewRating(star)}
                          title={`${star} Star${star > 1 ? "s" : ""}`}
                          className="text-yellow-500"
                        >
                          {newRating >= star ? (
                            <AiFillStar size={24} />
                          ) : (
                            <AiOutlineStar size={24} />
                          )}
                        </button>
                      ))}
                    </div>
                    <div
                      className="flex gap-2 mt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleRatingSubmit(store.id)}
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => {
                          setEditingRatingId(null);
                          setNewRating(0);
                        }}
                        className="text-sm text-gray-600 px-3 py-1 border rounded hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingRatingId(store.id);
                      setNewRating(store.userRating || 0);
                    }}
                    className="mt-2 inline-flex items-center text-sm text-blue-600 hover:underline gap-1"
                  >
                    <MdEdit />
                    {store.userRating ? "Edit Rating" : "Add Rating"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded-md text-sm disabled:opacity-50 bg-gray-50 hover:bg-gray-100"
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded-md text-sm disabled:opacity-50 bg-gray-50 hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stores;
