import React from 'react';
import { Link } from 'react-router-dom';


const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Contact Me</h1>
        <h1>YASH RAJ</h1>
        <div className="flex flex-col items-center space-y-6">
          <h2>
            <a 
              href="https://www.linkedin.com/in/yashra4j/" 
              className="text-blue-600 text-2xl font-bold hover:underline" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>

          </h2>
          <h2>

            <a 
              href="https://www.facebook.com/profile.php?id=100085257384998" 
              className="text-blue-800 text-2xl font-bold hover:underline" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </h2>
          <h2>

            <a 
              href="https://instagram.com/yashra4j" 
              className="text-pink-600 text-2xl font-bold hover:underline" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </h2>
          <h2>

            <a 
              href="mailto:yashra4j@gmail.com" 
              className="text-red-600 text-2xl font-bold hover:underline" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Email: yashra4j@gmail.com
            </a>
          </h2>
          <h2>

            <p className="text-green-600 text-2xl font-bold">
              Phone: +91 7488285891
            </p>
          </h2>
          <h2>

            <a 
              href="https://x.com/YashRa4j" 
              className="text-blue-400 text-2xl font-bold hover:underline" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </h2>
        </div>
        <h1>
        <Link 
            to="/" 
            className="inline-block mt-6 text-blue-500 text-lg font-bold hover:underline"
          >
            Back to Home
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default ContactPage;
