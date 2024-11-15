import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FeaturedCar from "../components/FeaturedCar";

function Home() {
  return (
    <div>
      <Navbar />

      <main className="flex-grow">
        <section className="relative bg-blue-900 text-white py-40 px-6 text-center">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://plus.unsplash.com/premium_photo-1689962253303-df6f8fd16069?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGJlYXV0aWZ1bCUyMGJhY2tncm91bmQlMjBmb3IlMjBjYXIlMjB3ZWJzaXRlfGVufDB8fDB8fHww')",
              opacity: "0.5",
            }}
          ></div>
          {/* Text Overlay */}
          <div className="relative z-10 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Welcome to Carventory
            </h1>
            <p className="text-lg sm:text-xl mb-8">
              Your one-stop solution for managing and buying cars online.
            </p>
          </div>
        </section>
        <FeaturedCar />
        <section className="py-10 px-6 text-center bg-blue-100">
          <h2 className="text-4xl font-semibold mb-4 text-gray-800">
            Create a New Product
          </h2>
          <p className="text-gray-900 mb-6 w-90 text-xl">
            List your car for sale by uploading high-quality photos, providing
            an attention-grabbing title, and sharing detailed descriptions.
            Highlight the car’s key features, such as mileage, condition,
            special upgrades, and recent maintenance, to help potential buyers
            see its value. Make your listing stand out and attract serious
            buyers by showcasing what makes your car unique. Start creating a
            listing that drives interest and helps you sell faster!
          </p>
          <Link
            to="/create-product"
            className="bg-blue-900 text-white p-4 mx-8 my-8 rounded-full font-semibold shadow-md hover:bg-blue-300 hover:text-black transition-colors duration-200 transform hover:scale-105"
          >
            Go to Product Creation Page
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
