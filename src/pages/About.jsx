import React from "react";
import { Users, Star, Shield, Store, ThumbsUp, Target } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 pt-20">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Store Ratings App</h1>
        <p className="text-lg text-gray-600 max-w-5xl mx-auto">
          Empowering people to make better choices. At{" "}
          <span className="font-semibold text-blue-600">Store Ratings App</span>
          , we help users discover trusted stores and give owners the insights
          they need to grow.
        </p>
      </section>

      <section className="bg-gray-50 rounded-xl p-8 shadow-md mb-16">
        <h2 className="text-3xl font-semibold mb-4 text-center">Our Mission</h2>
        <p className="text-gray-700 text-center max-w-5xl mx-auto text-lg">
          We are dedicated to building trust between customers and stores. By
          providing transparent feedback and ratings, we create a fair system
          where quality businesses thrive.
        </p>
      </section>

      <section className="text-center">
        <blockquote className="text-xl italic text-gray-500">
          "Real experiences. Honest ratings. Better choices."
        </blockquote>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <Store size={40} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Store Discovery
            </h3>
            <p className="text-gray-600">
              Find stores near you with details, contact info, and average
              ratings to make confident decisions.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <Star size={40} className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              User Ratings
            </h3>
            <p className="text-gray-600">
              Share your experiences with ratings and feedback. Help others
              choose the best places to shop.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <Users size={40} className="text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Community Driven
            </h3>
            <p className="text-gray-600">
              Our platform is built on user trust and collective feedback that
              shapes a reliable marketplace.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <Shield size={40} className="text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Verified System
            </h3>
            <p className="text-gray-600">
              We ensure users and store owners maintain integrity through secure
              logins and fair usage policies.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <Target size={40} className="text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Growth Insights
            </h3>
            <p className="text-gray-600">
              Owners can track ratings and feedback to continuously improve
              their services and customer satisfaction.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <ThumbsUp size={40} className="text-teal-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Trusted Choices
            </h3>
            <p className="text-gray-600">
              We help customers make informed decisions, ensuring that the best
              stores rise to the top.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 rounded-xl shadow-md mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg">
            <p className="text-2xl font-semibold text-blue-500 mb-4">
              Integrity
            </p>
            <p className="text-gray-600">
              We believe in transparency and fairness, ensuring trust in every
              rating and review.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg">
            <p className="text-2xl font-semibold text-green-500 mb-4">
              Excellence
            </p>
            <p className="text-gray-600">
              We strive to provide an exceptional platform experience for users
              and store owners alike.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg">
            <p className="text-2xl font-semibold text-purple-500 mb-4">
              Community
            </p>
            <p className="text-gray-600">
              We value contributions from our users that create a strong,
              trustworthy community.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Connect With Us
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Want to learn more about our platform or partner with us? Reach out
          today!
        </p>
        <Link
          to={"/contact"}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default About;
