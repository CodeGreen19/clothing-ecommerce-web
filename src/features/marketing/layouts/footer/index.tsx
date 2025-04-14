import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import {} from "react-icons/fi";
import React from "react";

const Footer = () => {
  return (
    <div className="wave-border-top mt-10 h-56 w-full border-t">
      <div className="container m-auto">
        <footer className="px-4 py-10 lg:px-0">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Column 1: Brand & Description */}
            <div>
              <h2 className="text-2xl font-bold">ShopMaster</h2>
              <p className="mt-2 text-gray-400">
                Your one-stop shop for all your needs. Experience seamless
                shopping with us.
              </p>
            </div>

            {/* Column 2: Important Links */}
            <div>
              <h3 className="mb-3 text-xl font-semibold">Important Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/return-policy">Return Policy</a>
                </li>
                <li>
                  <a href="/terms-of-service">Terms of Service</a>
                </li>
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Social Icons */}
            <div>
              <h3 className="mb-3 text-xl font-semibold">Follow Us</h3>
              <ul className="flex space-x-2 *:rounded-full *:bg-pink-600 *:p-2 *:text-white md:*:p-3">
                <li>
                  <FiFacebook />
                </li>
                <li>
                  <FiTwitter />
                </li>
                <li>
                  <FiInstagram />
                </li>
              </ul>
            </div>
          </div>
          {/* Copyright Section */}
          <div className="mt-8 pt-4 text-start text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ShopMaster. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
