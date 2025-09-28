import React, { useEffect, useState } from "react";
import { Briefcase, FileText, Users } from "lucide-react";
import makeRequest from "../../axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const response = await makeRequest.get("admin/dashboard");
      setStats(response.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const cards = [
    {
      label: "Total Users",
      value: stats?.totalUsers,
      icon: <Users className="text-blue-600 w-8 h-8" />,
      bg: "bg-gradient-to-br from-blue-100 to-blue-200",
      cardBg: "bg-white",
      link: "/admin/users",
    },
    {
      label: "Total Stores",
      value: stats?.totalStores,
      icon: <Briefcase className="text-green-600 w-8 h-8" />,
      bg: "bg-gradient-to-br from-green-100 to-green-200",
      cardBg: "bg-white",
      link: "/admin/stores",
    },
    {
      label: "Total Ratings",
      value: stats?.totalRatings,
      icon: <FileText className="text-purple-600 w-8 h-8" />,
      bg: "bg-gradient-to-br from-purple-100 to-purple-200",
      cardBg: "bg-white",
      link: "/stores",
    },
  ];

  if (loading)
    return <div className="text-center py-20 text-lg">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <Link
            key={i}
            to={card.link}
            className={`group ${card.cardBg} p-8 rounded-2xl shadow-lg border hover:shadow-xl hover:-translate-y-1 transition-all`}
          >
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-xl ${card.bg} mb-6`}
            >
              {card.icon}
            </div>
            <p className="text-gray-500 text-sm">{card.label}</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {card.value ?? "-"}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
