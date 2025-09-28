import React from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "How Ratings Help Customers Choose Better",
    excerpt:
      "Learn how store ratings guide customers to make smarter shopping decisions.",
    image: "images/ratings_help.jpg",
    slug: "ratings-help-customers",
  },
  {
    id: 2,
    title: "Why Store Owners Should Track Feedback",
    excerpt:
      "Discover why analyzing customer ratings can help owners grow their business.",
    image: "images/store_feedback.jpg",
    slug: "store-owners-feedback",
  },
  {
    id: 3,
    title: "Building Trust Through Transparency",
    excerpt:
      "Find out how verified ratings build a trustworthy community for shoppers and stores.",
    image: "images/trust_transparency.jpg",
    slug: "building-trust",
  },
];

const Blog = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 pt-20">
      <h1 className="text-3xl font-bold text-center mb-12">
        Store Ratings Blog & Insights
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.excerpt}
              </p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-blue-600 hover:underline font-medium"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
