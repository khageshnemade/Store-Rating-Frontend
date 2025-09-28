import React, { useEffect, useState } from "react";
import { publicRequest } from "../../axios";
import { toast } from "react-toastify";
import { Star, ArrowLeft } from "lucide-react"; // Back icon
import { useLocation, useNavigate } from "react-router-dom";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        size={18}
        className={
          i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }
      />
    );
  }
  return <div className="flex">{stars}</div>;
};

const StoreRating = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const storeId = location.state?.id || null;

  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStoreRatings = async () => {
    try {
      const res = await publicRequest.get(`/ratings/${storeId}`);
      setStoreData(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load store ratings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreRatings();
  }, [storeId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading ratings...</p>;
  }

  if (!storeData) {
    return <p className="text-center text-red-500">No data available.</p>;
  }

  const { store, averageRating, totalRatings, ratings } = storeData;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold">{store.name}</h2>
        <p className="text-gray-600">{store.address}</p>
        <div className="flex items-center gap-2 mt-2">
          <StarRating rating={Math.round(averageRating)} />
          <span className="text-sm text-gray-700">
            {averageRating} / 5 ({totalRatings} rating
            {totalRatings !== 1 ? "s" : ""})
          </span>
        </div>
      </div>

      <hr className="mb-4" />

      <div>
        <h3 className="text-xl font-semibold mb-3">User Reviews</h3>
        {ratings.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {ratings.map((r) => (
              <div
                key={r.id}
                className="border border-gray-300 rounded-md p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{r.User?.name || "Anonymous"}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(r.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <StarRating rating={r.rating} />
                </div>
                {/* Optional: review text */}
                {r.review && <p className="mt-2 text-gray-700">{r.review}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreRating;
