import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-6xl font-semibold text-center mb-20 text-gray-900 ">
            About Us
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="sm:w-1/2 mb-8 sm:mb-0">
              <img
                src="https://plus.unsplash.com/premium_photo-1682089485470-4d575051f326?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2FyJTIwc2hvd3Jvb218ZW58MHx8MHx8fDA%3D" // Replace with your desired image URL
                alt="Car management"
                className="w-100 h-100 rounded-full shadow-lg"
              />
            </div>
            <div className="sm:w-1/2">
              <p className="text-2xl text-gray-700 mb-10">
                Welcome to Carventory, the ultimate car management platform! Our
                mission is to make managing your car collection easy and
                efficient. Whether you're a car enthusiast, collector, or
                dealer, we provide the tools you need to manage your cars with
                ease.
              </p>
              <p className="text-xl text-gray-700 mb-4">
                At Carventory, we believe in seamless integration between the
                digital and physical worlds. From adding new cars to managing
                prices, descriptions, and images, our platform provides a
                hassle-free experience for every user.
              </p>
              <p className="text-lg text-gray-700">
                Join us today and experience the future of car management!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
