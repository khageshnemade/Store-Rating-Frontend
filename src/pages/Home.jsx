
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaIndustry,
  FaUserTie,
  FaStar
} from "react-icons/fa";
import { Link } from "react-router-dom";


const Home = () => {

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 via-white to-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-400 text-white py-32 flex items-center justify-center mt-0 h-screen">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center px-4 z-10 flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight">
            Find the Right Store For You
          </h1>
          <p className="text-lg sm:text-2xl text-blue-100 mb-8">
           Browse thousands of stores, read reviews, and find the perfect fit.
            <br />
Discover the perfect store for you.          </p>

        </div>
      </section>

      
    </div>
  );
};

export default Home;


