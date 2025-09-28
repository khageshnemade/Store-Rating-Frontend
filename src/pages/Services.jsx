import React from "react";
import { Star, Store, Users, BarChart3, Shield, Search } from "lucide-react";

const services = [
  {
    icon: <Star size={32} className="text-yellow-500" />,
    title: "Ratings & Reviews",
    description:
      "Users can rate stores from 1 to 5 and share their experiences to help others make better choices.",
  },
  {
    icon: <Store size={32} className="text-blue-500" />,
    title: "Store Management",
    description:
      "Store owners can view customer ratings, track feedback, and monitor their average performance.",
  },
  {
    icon: <Users size={32} className="text-green-500" />,
    title: "User Management",
    description:
      "Admins can manage users and store owners, assign roles, and ensure fair access to the platform.",
  },
  {
    icon: <BarChart3 size={32} className="text-purple-500" />,
    title: "Dashboards & Insights",
    description:
      "Admins and store owners get detailed dashboards with total users, stores, and submitted ratings.",
  },
  {
    icon: <Search size={32} className="text-orange-500" />,
    title: "Smart Search",
    description:
      "Easily find stores by name or address. Users can filter and sort results to find what they need quickly.",
  },
  {
    icon: <Shield size={32} className="text-red-500" />,
    title: "Secure Access",
    description:
      "All accounts are protected with secure login and role-based access to maintain trust in the system.",
  },
];

const ServicesPage = () => {
  return (
    <div className="bg-gray-50 py-12 pt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
