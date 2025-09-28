import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 mt-28 m-20 bg-white shadow-lg rounded-md overflow-y-auto pt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-gray-700">
          At Store Ratings App, we value and respect your privacy. This Privacy
          Policy explains how we collect, use, and protect your personal
          information when you interact with our platform. By using our
          services, you agree to the terms outlined here.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          2. Information We Collect
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>
            Personal details such as your name, email, and address when you
            register.
          </li>
          <li>Login credentials such as password (securely stored).</li>
          <li>Ratings and reviews you submit for stores.</li>
          <li>
            Usage information such as search activity, clicks, and preferences.
          </li>
          <li>
            Technical data like browser type, device details, and IP address.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          3. How We Use Your Information
        </h2>
        <p className="text-gray-700">
          We use your data to provide and improve our services, personalize your
          experience, manage user accounts, display store ratings, detect fraud,
          and comply with legal requirements.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Cookies and Tracking</h2>
        <p className="text-gray-700">
          We use cookies and similar technologies to enhance your browsing
          experience, remember your preferences, and analyze traffic. You can
          disable cookies in your browser settings, but some features may not
          function properly.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          5. Legal Basis for Processing
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Your consent, when required.</li>
          <li>Performance of our service obligations.</li>
          <li>Compliance with legal requirements.</li>
          <li>
            Legitimate business interests, such as improving services and
            preventing misuse.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Information Sharing</h2>
        <p className="text-gray-700">
          We do not sell your personal information. Data may be shared with
          trusted service providers, system administrators, or as required by
          law. Store owners can view ratings submitted for their stores, but
          your identity will not be disclosed without your consent.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Data Security</h2>
        <p className="text-gray-700">
          We implement appropriate security measures to protect your data
          against unauthorized access, alteration, or disclosure. However, no
          system can guarantee absolute security.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Your Rights</h2>
        <p className="text-gray-700">
          You have the right to access, update, or delete your personal
          information. You may also request to restrict processing or object to
          the use of your data as permitted under applicable laws.
        </p>
      </section>

      <footer className="mt-10 text-center text-sm text-gray-500">
        Last updated: September 26, 2025
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
