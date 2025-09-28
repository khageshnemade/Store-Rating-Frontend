import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const userFAQs = [
    {
      question: "How can I create an account?",
      answer:
        "Normal users can sign up by providing their name, email, address, and password. After registration, you can log in to start exploring stores.",
    },
    {
      question: "How do I submit a rating for a store?",
      answer:
        "After logging in, go to the list of stores, select a store, and choose a rating between 1 to 5. You can also update your rating later.",
    },
    {
      question: "Can I update my password?",
      answer:
        "Yes. Once logged in, you can go to your profile settings and update your password securely.",
    },
    {
      question: "How do I search for stores?",
      answer:
        "You can search stores by name or address using the search bar on the stores page.",
    },
  ];

  const ownerFAQs = [
    {
      question: "How do I become a store owner?",
      answer:
        "Store owners are created by the system administrator. If you own a store, contact the admin to get your account set up.",
    },
    {
      question: "How can I see who rated my store?",
      answer:
        "Log in as a store owner and open your dashboard. You’ll find a list of users who submitted ratings for your store.",
    },
    {
      question: "Can I check the average rating of my store?",
      answer:
        "Yes. Your dashboard shows the overall average rating of your store based on user feedback.",
    },
    {
      question: "Can I update my password?",
      answer:
        "Yes. Store owners can also change their password from their profile settings after logging in.",
    },
  ];

  const renderFAQs = (faqs, offset) =>
    faqs.map((faq, index) => {
      const currentIndex = index + offset;
      const isOpen = openIndex === currentIndex;

      return (
        <div key={currentIndex} className="border-b pb-4 cursor-pointer">
          <div
            className="flex justify-between items-center"
            onClick={() => toggle(currentIndex)}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {faq.question}
            </h3>
            <FaChevronDown
              className={`transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              } text-gray-500`}
            />
          </div>
          {isOpen && <p className="mt-2 text-gray-600">{faq.answer}</p>}
        </div>
      );
    });

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 pt-20">
      <h1 className="text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h1>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          For Normal Users
        </h2>
        <div className="space-y-4">{renderFAQs(userFAQs, 0)}</div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          For Store Owners
        </h2>
        <div className="space-y-4">
          {renderFAQs(ownerFAQs, userFAQs.length)}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
