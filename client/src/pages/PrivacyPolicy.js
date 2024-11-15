import React from "react";

function PrivacyPolicy() {
  return (
    <div className="max-w-screen-lg mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At Carventory, we are committed to protecting your privacy. This
            Privacy Policy outlines the types of personal information we collect
            and how we use, share, and protect that information when you use our
            Car Management application.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We collect personal information when you use our services, register
            on our platform, or interact with our website. This information may
            include:
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Personal details (name, email, phone number, etc.)</li>
            <li>
              Vehicle-related information (car model, registration details,
              etc.)
            </li>
            <li>
              Usage data (your interactions with our website or application)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Provide and maintain our services</li>
            <li>Process transactions and car-related information</li>
            <li>
              Improve user experience and provide personalized recommendations
            </li>
            <li>
              Communicate with you regarding account updates, promotions, or
              customer support
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How We Protect Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We implement a variety of security measures to protect your personal
            information. This includes encryption, secure servers, and access
            controls to ensure the safety and integrity of your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Sharing Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We do not sell or rent your personal information to third parties.
            However, we may share your information with trusted partners for the
            purpose of:
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Providing customer support</li>
            <li>Improving the functionality of our service</li>
            <li>
              Legal requirements (when necessary to comply with applicable laws)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Rights
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You have the right to access, correct, or delete your personal data.
            If you wish to exercise any of these rights, please contact us
            through the contact information provided at the end of this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. When we do, we
            will post the updated policy on this page and revise the "Last
            Updated" date at the bottom of this page. Please check this policy
            periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this Privacy Policy or our
            practices, please contact us at:
          </p>
          <p className="text-gray-700 leading-relaxed">
            Email:{" "}
            <a href="mailto:support@carventory.com" className="text-blue-500">
              support@carventory.com
            </a>
          </p>
          <p className="text-gray-700 leading-relaxed">
            Address: 123 Carventory Lane, Car City, 12345
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
